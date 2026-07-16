import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getCredential() {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccount) {
    return cert(JSON.parse(serviceAccount));
  }

  // Firebase App Hosting supplies Application Default Credentials automatically.
  return applicationDefault();
}

const adminApp =
  getApps()[0] ??
  initializeApp({
    credential: getCredential(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
