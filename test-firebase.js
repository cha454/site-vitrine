
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

async function testFirebase() {
  console.log("🚀 Testing Firebase connection...");
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Essayer de lire la collection 'interventions'
    const q = query(collection(db, 'interventions'), limit(1));
    const querySnapshot = await getDocs(q);
    
    console.log("✅ Firebase connection successful!");
    console.log(`📊 Found ${querySnapshot.size} intervention(s) in the database.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Firebase test failed:", error);
    process.exit(1);
  }
}

testFirebase();
