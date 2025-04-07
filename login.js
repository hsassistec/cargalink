import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.login = function() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("msg");

  signInWithEmailAndPassword(auth, email, senha)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const docSnap = await getDoc(doc(db, "usuarios", user.uid));
      if (docSnap.exists()) {
        const tipo = docSnap.data().tipo;
        window.location.href = tipo + ".html";
      } else {
        msg.textContent = "Tipo de usuário não encontrado.";
      }
    })
    .catch((error) => {
      msg.textContent = "Erro no login: " + error.message;
    });
}