'use server';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email(),
    full_name: z.string().min(2),
    course: z.enum(["BCA", "BBA", "MBA", "LLB", "BBA LLB"]),
    erp: z.string().trim().min(3).max(40).regex(/^[A-Za-z0-9/_-]+$/, { message: "Invalid ERP format." }),
    sem_and_year: z.string().min(1, { message: "Semester and Year are required." }),
    contact_number: z.string().regex(/^\+?[0-9]{10,15}$/),
    reason_to_join: z.string().min(10).max(1000, { message: "Must be 200 words or less." }), // Approx 200 words
    top_skills: z.string().min(2).max(250, { message: "Must be 50 words or less." }), // Approx 50 words
    hackathon_participation: z.enum(["Yes", "No"]),
    role_preference: z.enum(["Builder", "Thinker", "Designer", "Hacker"]),
});

export async function submitApplication(values: z.infer<typeof formSchema>, idToken: string) {
    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
        console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
        return { success: false, message: 'Invalid form data.' };
    }
    
    let user;
    try {
        user = await adminAuth.verifyIdToken(idToken, true);
    } catch {
        return { success: false, message: 'Please sign in with Google again.' };
    }

    if (!user.email || !user.email_verified) {
        return { success: false, message: 'A verified Google email is required.' };
    }

    const dataToInsert = {
        ...validatedFields.data,
        erp: validatedFields.data.erp.toUpperCase(),
        hackathon_participation: validatedFields.data.hackathon_participation === "Yes",
        account_email: user.email,
        account_uid: user.uid,
        created_at: FieldValue.serverTimestamp(),
    };

    try {
        await adminDb.runTransaction(async (transaction) => {
            const accountRef = adminDb.collection('registration_limits').doc(user.uid);
            const erpRef = adminDb.collection('registered_erps').doc(dataToInsert.erp);
            const applicationRef = adminDb.collection('applications').doc();
            const [accountSnapshot, erpSnapshot] = await Promise.all([
                transaction.get(accountRef),
                transaction.get(erpRef),
            ]);
            const count = accountSnapshot.data()?.count ?? 0;

            if (count >= 2) throw new Error('REGISTRATION_LIMIT');
            if (erpSnapshot.exists) throw new Error('ERP_EXISTS');

            transaction.set(applicationRef, dataToInsert);
            transaction.set(erpRef, { application_id: applicationRef.id, uid: user.uid });
            transaction.set(accountRef, {
                count: count + 1,
                email: user.email,
                updated_at: FieldValue.serverTimestamp(),
            });
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'REGISTRATION_LIMIT') {
            return { success: false, message: 'This Google account has already used its 2 registrations.' };
        }
        if (error instanceof Error && error.message === 'ERP_EXISTS') {
            return { success: false, message: 'This ERP ID is already registered.' };
        }
        console.error('Firestore application error:', error);
        return { success: false, message: 'Database error. Could not submit application.' };
    }

    return { success: true };
}
