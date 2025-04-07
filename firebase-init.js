import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5TPl_lhe8faUptth5RsuBn037NPXpfHs",
  authDomain: "cargalink-35124.firebaseapp.com",
  projectId: "cargalink-35124",
  storageBucket: "cargalink-35124.firebasestorage.app",
  messagingSenderId: "97928029256",
  appId: "1:97928029256:web:92c5d113e87f56bbbf247d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);