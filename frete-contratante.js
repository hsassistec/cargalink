import { db, auth } from './firebase-init.js';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.getElementById("freteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;
  const tipo = document.getElementById("tipo").value;
  const valor = document.getElementById("valor").value;
  const msg = document.getElementById("msg");

  const user = auth.currentUser;
  if (!user) {
    msg.textContent = "Você precisa estar logado.";
    return;
  }

  try {
    await addDoc(collection(db, "fretes"), {
      origem,
      destino,
      tipo,
      valor,
      status: "disponível",
      contratante: user.uid
    });
    msg.textContent = "Frete cadastrado com sucesso!";
    carregarHistorico(user.uid);
  } catch (e) {
    msg.textContent = "Erro ao cadastrar frete.";
  }
});

function carregarHistorico(uid) {
  const lista = document.getElementById("historico");
  lista.innerHTML = "<h3>Meus Fretes</h3>";

  const q = query(collection(db, "fretes"), where("contratante", "==", uid));
  getDocs(q).then(snapshot => {
    if (snapshot.empty) {
      lista.innerHTML += "<p>Nenhum frete encontrado.</p>";
      return;
    }

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      let html = `
        <p><strong>${data.tipo}</strong> - ${data.origem} até ${data.destino} - R$${data.valor}</p>
        <p>Status: ${data.status}</p>
        ${data.motorista ? `<p>Motorista ID: ${data.motorista}</p>` : ""}
      `;

      if (data.status === "disponível") {
        html += `<button onclick="cancelarFrete('${docSnap.id}')">Cancelar Frete</button>`;
      }

      html += "<hr/>";
      lista.innerHTML += html;
    });
  });
}

window.cancelarFrete = async function(freteId) {
  if (confirm("Tem certeza que deseja cancelar este frete?")) {
    await deleteDoc(doc(db, "fretes", freteId));
    alert("Frete cancelado com sucesso!");
    carregarHistorico(auth.currentUser.uid);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    carregarHistorico(user.uid);
  }
});