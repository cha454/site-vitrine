import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug check pour Vercel/Local
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "votre_api_key") {
  console.error("❌ Erreur de configuration : Les clés Firebase sont manquantes ou non configurées dans le fichier .env ou sur Vercel.");
  if (typeof window !== 'undefined') {
    alert("⚠️ Attention : La configuration Firebase est manquante. Vérifiez vos variables d'environnement sur Vercel ou votre fichier .env local.");
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
