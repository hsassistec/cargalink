import { db } from './firebase-init.js';
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const fretesDiv = document.getElementById("fretes");
const auth = getAuth();

async function carregarFretes() {
  const querySnapshot = await getDocs(collection(db, "fretes"));
  fretesDiv.innerHTML = ""; // Limpar antes
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.status === "disponível") {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${data.tipo}</strong> - ${data.origem} até ${data.destino} - R$${data.valor}</p>
        <button onclick="aceitarFrete('${docSnap.id}')">Aceitar Frete</button>
        <hr/>
      `;
      fretesDiv.appendChild(div);
    }
  });
}

window.aceitarFrete = async function(freteId) {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para aceitar fretes.");
    return;
  }

  const freteRef = doc(db, "fretes", freteId);
  await updateDoc(freteRef, {
    status: "em andamento",
    motorista: user.uid
  });
  alert("Frete aceito com sucesso!");
  carregarFretes();
};

carregarFretes();