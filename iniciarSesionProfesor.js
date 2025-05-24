console.log("loginProfesor.js cargado");

// Configuración Supabase
const supabaseUrl = "https://aamvnpvfzmnrrfurovuv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbXZucHZmem1ucnJmdXJvdnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNjI2NDUsImV4cCI6MjA2MzYzODY0NX0._OigReH-zPR9AfGE5L9Rw9H71AnxQzH7T5k93mjPj5E";

// Aquí usamos la función global "createClient" que la librería define en window.supabase
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

document.querySelector("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const codigo = document.querySelector("#codigo").value.trim();
  const password = document.querySelector("#contraseña").value;

  if (!codigo || !password) {
    alert("Por favor ingresa código y contraseña.");
    return;
  }

  console.log("Intentando iniciar sesión profesor con:", { codigo, password });

  try {
    // Consultar en la tabla 'profesores' en Supabase (ajusta el nombre de la tabla)
    const { data, error } = await supabase
      .from("profesores")
      .select("*")
      .eq("codigo_profesor", codigo)
      .limit(1)
      .single();

    if (error) {
      console.error("Error al consultar la base de datos:", error);
      alert("Error al iniciar sesión. Inténtalo más tarde.");
      return;
    }

    if (!data) {
      alert("Código o contraseña incorrectos.");
      return;
    }

    // Suponemos que la contraseña está guardada en texto plano (mejor usar hash en producción)
    if (data.contrasena === password) {
      alert(`Bienvenido ${data.nombre}`);

      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("userRole", "profesor");
      localStorage.setItem("userName", data.nombre);

      window.location.href = "profesor.html";
    } else {
      alert("Código o contraseña incorrectos.");
    }
  } catch (err) {
    console.error("Error al iniciar sesión profesor:", err);
    alert("Ocurrió un error al iniciar sesión.");
  }
});
