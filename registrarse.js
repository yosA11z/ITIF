
// Selecciona el botón de registro
const registrarseButton = document.querySelector("#login-button");

// Añade el evento 'click' al botón para realizar la función de registro
registrarseButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtiene los valores de los campos del formulario
    const name = document.querySelector("#nombre").value;
    const email = document.querySelector("#correo").value;
    const apellido = document.querySelector("#apellido").value;
    const rol = document.querySelector("#rol").value;
    const password = document.querySelector("#contraseña").value;
    
    // Obtiene el array de usuarios desde el localStorage o lo inicializa vacío si no existe
    const Users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Verifica si el usuario ya está registrado
    const isUserRegistered = Users.find(user => user.email === email);
    if (isUserRegistered) {
        return alert("El usuario ya se encuentra registrado.");
    }

    // Añade el nuevo usuario al array y guarda en localStorage
    Users.push({ name, email, apellido, rol, password });
    localStorage.setItem("users", JSON.stringify(Users));
    
    // Muestra mensaje de registro exitoso y redirige a la página de inicio de sesión
    alert("¡Registro exitoso!");
    window.location.href = "iniciarSesion.html";
});
