import { db } from './firebase-init.js';
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const fretesDiv = document.getElementById("fretes");
const auth = getAuth();

async function carregarFretes() {
  const user = auth.currentUser;
  if (!user) {
    fretesDiv.innerHTML = "<p>Você precisa estar logado.</p>";
    return;
  }

  const querySnapshot = await getDocs(collection(db, "fretes"));

  let htmlDisponiveis = "<h3>Fretes Disponíveis</h3>";
  let htmlMeusFretes = "<h3>Meu Histórico</h3>";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    if (data.status === "disponível") {
      htmlDisponiveis += `
        <p><strong>${data.tipo}</strong> - ${data.origem} até ${data.destino} - R$${data.valor}</p>
        <button onclick="aceitarFrete('${id}')">Aceitar Frete</button>
        <hr/>
      `;
    } else if (data.motorista === user.uid) {
      htmlMeusFretes += `
        <p><strong>${data.tipo}</strong> - ${data.origem} até ${data.destino} - R$${data.valor}</p>
        <p>Status: ${data.status}</p>
        ${data.status === "em andamento" ? `<button onclick="finalizarFrete('${id}')">Finalizar Frete</button>` : ""}
        <hr/>
      `;
    }
  });

  fretesDiv.innerHTML = htmlMeusFretes + "<br/>" + htmlDisponiveis;
}

window.aceitarFrete = async function(freteId) {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado.");
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

window.finalizarFrete = async function(freteId) {
  const freteRef = doc(db, "fretes", freteId);
  await updateDoc(freteRef, {
    status: "concluído"
  });
  alert("Frete finalizado!");
  carregarFretes();
};

carregarFretes();