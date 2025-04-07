import { db } from './firebase-init.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const painel = document.getElementById("painel");

async function mostrarFretes() {
  const querySnapshot = await getDocs(collection(db, "fretes"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    painel.innerHTML += `<p><strong>${data.tipo}</strong>: ${data.origem} -> ${data.destino}, R$${data.valor}, Status: ${data.status}</p>`;
  });
}
mostrarFretes();