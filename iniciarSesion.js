console.log("iniciarSesion.js cargado");

const loginButton = document.querySelector("#login-button");

if (!loginButton) {
  console.error("No se encontró el botón de login.");
} else {
  console.log("Botón de login encontrado");

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if (typeof supabase === "undefined") {
      console.error("❌ Supabase no está definido");
      return;
    }

    const codigo = document.querySelector("#codigo").value.trim();
    const password = document.querySelector("#contraseña").value;

    if (!codigo || !password) {
      alert("Por favor ingresa código y contraseña.");
      return;
    }

    console.log("Intentando iniciar sesión con:", { codigo, password });

    try {
      const { data, error } = await supabase
        .from("estudiantes")
        .select("*")
        .eq("codigo_estudiante", codigo)
        .eq("contrasena", password)
        .single();

      console.log("Resultado:", { data, error });

      if (error || !data) {
        alert("Código o contraseña incorrectos.");
        return;
      }

      alert(`Bienvenido ${data.nombre}`);

      // ✅ Guardamos el usuario por su código
      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("userName", data.nombre);

      window.location.href = "estudiante.html";
    } catch (err) {
      console.error("Error inesperado al iniciar sesión:", err);
      alert("Ocurrió un error al iniciar sesión.");
    }
  });
}
