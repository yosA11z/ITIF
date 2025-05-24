document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  const supabaseUrl = "https://aamvnpvfzmnrrfurovuv.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbXZucHZmem1ucnJmdXJvdnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNjI2NDUsImV4cCI6MjA2MzYzODY0NX0._OigReH-zPR9AfGE5L9Rw9H71AnxQzH7T5k93mjPj5E";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("No has iniciado sesión.");
    window.location.href = "iniciarSesion.html";
    return;
  }

  const codigoEstudiante = currentUser.codigo_estudiante;
  const nombreUsuarioSpan = document.getElementById("nombre-usuario");
  nombreUsuarioSpan.textContent = currentUser.nombre || "";

  try {
    const { data: estudiante, error: errEst } = await supabase
      .from("estudiantes")
      .select("id, nombre, codigo_estudiante")
      .eq("codigo_estudiante", codigoEstudiante)
      .single();

    if (errEst || !estudiante) throw new Error("Estudiante no encontrado");

    const { data: notas, error: errNotas } = await supabase
      .from("notas")
      .select("nota, materia: materia_id (nombre)")
      .eq("estudiante_id", estudiante.id);

    if (errNotas) throw errNotas;

    const thead = document.querySelector("#tabla-notas thead tr");
    const tbody = document.querySelector("#tabla-notas tbody");

    thead.innerHTML = "<th>Nombre</th>";
    tbody.innerHTML = "";

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${estudiante.nombre}</td>`;

    notas.forEach(notaObj => {
      const materia = notaObj.materia?.nombre || "Materia";
      const notaStr = notaObj.nota;
      let colorClass = "";

      switch (notaStr) {
        case "DJ":
          colorClass = "nota-roja";
          break;
        case "DB":
        case "DA":
          colorClass = "nota-amarilla";
          break;
        case "DS":
          colorClass = "nota-verde";
          break;
      }

      let contenidoCelda = notaStr || "-";
      if (notaStr === "DB" || notaStr === "DBJ") {
        const materiaKey = materia.toLowerCase();
        let urlSugerencia = "sugerencias.html";
        if (materiaKey.includes("física") || materiaKey.includes("fisica"))
          urlSugerencia = "sugerenciasFisica.html";
        else if (materiaKey.includes("química") || materiaKey.includes("quimica"))
          urlSugerencia = "sugerenciasQuimica.html";

        contenidoCelda = `
          ${notaStr}<br>
          <a href="${urlSugerencia}" class="sugerencia-btn">Sugerencias</a>
        `;
      }

      thead.innerHTML += `<th>${materia}</th>`;
      tr.innerHTML += `<td class="${colorClass}">${contenidoCelda}</td>`;
    });

    tbody.appendChild(tr);

  } catch (err) {
    console.error("Error al cargar las notas:", err);
    alert("Error al cargar tus notas.");
  }

  const botonModo = document.getElementById("modo-toggle");
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "oscuro") {
    document.body.classList.add("modo-oscuro");
    botonModo.innerText = "☀️ Modo Claro";
  }

  botonModo.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    const modoActual = document.body.classList.contains("modo-oscuro") ? "oscuro" : "claro";
    localStorage.setItem("modo", modoActual);
    botonModo.innerText = modoActual === "oscuro" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "iniciarSesion.html";
  });

  document.getElementById("btn-ver-calendario").addEventListener("click", () => {
    window.location.href = "calendario.html";
  });
});
