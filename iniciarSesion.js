const loginButton = document.querySelector("#login-button");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("#correo").value.trim().toLowerCase();
  const password = document.querySelector("#contraseña").value;

  // Obtener usuarios guardados en localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Buscar usuario válido por email y contraseña
  const validUser = users.find(
    (user) => user.email.toLowerCase() === email && user.password === password
  );

  if (!validUser) {
    alert("¡Usuario o contraseña incorrectos!");
    return;
  }

  // Guardar usuario actual en localStorage
  localStorage.setItem("currentUser", JSON.stringify(validUser));
  localStorage.setItem("userName", validUser.name || validUser.email);

  alert(`Bienvenido ${validUser.name || validUser.email}`);

  // Redirigir según el rol del usuario
  if (validUser.rol === "Profesor") {
    window.location.href = "profesor.html";
  } else if (validUser.rol === "Estudiante") {
    window.location.href = "estudiante.html";
  } else {
    alert("Rol no reconocido. Contacta con soporte.");
  }
});
