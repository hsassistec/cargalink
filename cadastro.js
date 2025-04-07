import { auth, db } from './firebase-init.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.cadastrar = async function() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipo").value;
  const msg = document.getElementById("msg");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    await setDoc(doc(db, "usuarios", user.uid), {
      email,
      tipo
    });
    msg.textContent = "Usuário cadastrado com sucesso!";
  } catch (error) {
    msg.textContent = "Erro: " + error.message;
  }
}