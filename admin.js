import { db } from './firebase-init.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const painel = document.getElementById("painel");

async function carregarPainel() {
  let totalFretes = 0;
  let emAndamento = 0;
  let concluidos = 0;
  let disponiveis = 0;
  let usuarios = [];

  const fretesSnapshot = await getDocs(collection(db, "fretes"));
  fretesSnapshot.forEach((doc) => {
    totalFretes++;
    const status = doc.data().status;
    if (status === "em andamento") emAndamento++;
    else if (status === "concluído") concluidos++;
    else if (status === "disponível") disponiveis++;
  });

  const usuariosSnapshot = await getDocs(collection(db, "usuarios"));
  usuariosSnapshot.forEach((doc) => {
    usuarios.push(doc.data());
  });

  painel.innerHTML = `
    <h2>Resumo do Sistema</h2>
    <p><strong>Total de Fretes:</strong> ${totalFretes}</p>
    <p><strong>Disponíveis:</strong> ${disponiveis}</p>
    <p><strong>Em Andamento:</strong> ${emAndamento}</p>
    <p><strong>Concluídos:</strong> ${concluidos}</p>

    <h3>Últimos Usuários Cadastrados</h3>
    ${usuarios.map(u => `<p>${u.email} - Tipo: ${u.tipo}</p>`).join('')}
  `;
}

carregarPainel();