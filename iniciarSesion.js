const iniciarsesionform = document.querySelector("#iniciarsesionform");
const loginButton = document.querySelector("#login-button");

// Evento para manejar el clic en el botón de Login
loginButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evita cualquier envío automático del formulario

    // Obtener los valores de los campos de texto
    const email = document.querySelector("#correo").value;
    const password = document.querySelector("#contraseña").value;

    // Obtener usuarios del localStorage
    const Users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario válido
    const validUser = Users.find(user => user.email === email && user.password === password);
    
    if (!validUser) {
        alert("¡Usuario o contraseña incorrectos!");
        return;
    }

    // Guardar nombre y datos del usuario actual
    localStorage.setItem("userName", validUser.name);
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    alert(`Bienvenido ${validUser.name}`);

    // Redirigir según el rol
    if (validUser.rol === "Profesor") {
        window.location.href = "profesor.html";
    } else if (validUser.rol === "Estudiante") {
        window.location.href = "estudiante.html";
    } else {
        alert("Rol no reconocido. Contacta con soporte.");
    }
});
