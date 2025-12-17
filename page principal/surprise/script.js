  const form = document.querySelector("form");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.querySelector('input[type="text"]').value;
    const pass = document.querySelector('input[type="password"]').value;
    const remember = document.querySelector('.remember-forgot input[type="checkbox"]').checked;

    // Exemple d'identifiants
    if (user === "sendfeet" && pass === "12-04-2009") {

      if (remember) {
        localStorage.setItem("connected", "yes"); // garde la connexion
      }

      window.location.href = "principal.html"; // redirection
    } else {
      alert("Identifiants incorrects !");
    }
  });

  // Si déjà connecté, redirige automatiquement
  if (localStorage.getItem("connected") === "yes") {
    window.location.href = "principal.html";
  }

