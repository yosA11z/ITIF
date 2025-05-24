// recordatoriosProfesor.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recordatorio");
  const listaRecordatorios = document.getElementById("lista-recordatorios");

  // Función para obtener recordatorios del localStorage
  function obtenerRecordatorios() {
    const recordatoriosJSON = localStorage.getItem("recordatoriosProfesor");
    return recordatoriosJSON ? JSON.parse(recordatoriosJSON) : [];
  }

  // Función para guardar recordatorios en localStorage
  function guardarRecordatorios(recordatorios) {
    localStorage.setItem("recordatoriosProfesor", JSON.stringify(recordatorios));
  }

  // Función para mostrar recordatorios en la página
  function mostrarRecordatorios() {
    const recordatorios = obtenerRecordatorios();
    if (recordatorios.length === 0) {
      listaRecordatorios.innerHTML = "<p>No hay recordatorios guardados.</p>";
      return;
    }
    listaRecordatorios.innerHTML = "";
    recordatorios.forEach((r, index) => {
      const div = document.createElement("div");
      div.className = "recordatorio-item";
      div.innerHTML = `
        <strong>Materia:</strong> ${r.materia} <br>
        <strong>Fecha:</strong> ${r.fecha} <br>
        <strong>Descripción:</strong> ${r.descripcion}
        <button data-index="${index}" style="float:right;">Eliminar</button>
      `;
      listaRecordatorios.appendChild(div);
    });

    // Agregar evento a los botones eliminar
    listaRecordatorios.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");
        eliminarRecordatorio(idx);
      });
    });
  }

  // Función para eliminar un recordatorio por índice
  function eliminarRecordatorio(indice) {
    const recordatorios = obtenerRecordatorios();
    recordatorios.splice(indice, 1);
    guardarRecordatorios(recordatorios);
    mostrarRecordatorios();
  }

  // Manejar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const materia = form.materia.value.trim();
    const fecha = form.fecha.value;
    const descripcion = form.descripcion.value.trim();

    if (!materia || !fecha || !descripcion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevoRecordatorio = { materia, fecha, descripcion };
    const recordatorios = obtenerRecordatorios();
    recordatorios.push(nuevoRecordatorio);
    guardarRecordatorios(recordatorios);

    form.reset();
    mostrarRecordatorios();
  });

  // Mostrar recordatorios al cargar la página
  mostrarRecordatorios();

document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "iniciarSesion.html";
    });

   document.getElementById("notas-btn").addEventListener("click", () => {
    window.location.href = "editarNotas.html";
    });

});
