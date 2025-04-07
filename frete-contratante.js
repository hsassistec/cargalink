import { db } from './firebase-init.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.getElementById("freteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;
  const tipo = document.getElementById("tipo").value;
  const valor = document.getElementById("valor").value;

  try {
    await addDoc(collection(db, "fretes"), {
      origem, destino, tipo, valor, status: "disponível"
    });
    document.getElementById("msg").textContent = "Frete cadastrado com sucesso!";
  } catch (e) {
    document.getElementById("msg").textContent = "Erro ao cadastrar frete.";
  }
});