'use server';

import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email(),
    full_name: z.string().min(2),
    course: z.enum(["BCA", "BBA", "MBA", "LLB", "BBA LLB"]),
    erp: z.string().min(1, { message: "ERP is required." }),
    sem_and_year: z.string().min(1, { message: "Semester and Year are required." }),
    contact_number: z.string().min(10),
    reason_to_join: z.string().min(10).max(1000, { message: "Must be 200 words or less." }), // Approx 200 words
    top_skills: z.string().min(2).max(250, { message: "Must be 50 words or less." }), // Approx 50 words
    hackathon_participation: z.enum(["Yes", "No"]),
    role_preference: z.enum(["Builder", "Thinker", "Designer", "Hacker"]),
});

export async function submitApplication(values: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
        console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
        return { success: false, message: 'Invalid form data.' };
    }
    
    // Convert "Yes"/"No" to a boolean and ERP to uppercase
    const dataToInsert = {
        ...validatedFields.data,
        erp: validatedFields.data.erp.toUpperCase(),
        hackathon_participation: validatedFields.data.hackathon_participation === "Yes",
    };

    const { data, error } = await supabase
        .from('applications')
        .insert([dataToInsert]);

    if (error) {
        console.error('Error inserting data into Supabase:', error);
        
        // Handle unique constraint violation for 'erp'
        if (error.code === '23505') { // PostgreSQL unique violation error code
            return { success: false, message: 'You have already submitted an application with this ERP ID.' };
        }
        
        return { success: false, message: 'Database error. Could not submit application.' };
    }

    return { success: true };
}
