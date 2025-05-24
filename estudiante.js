document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("No has iniciado sesión. Por favor inicia sesión primero.");
    window.location.href = "iniciarSesion.html";
    return;
  }

  const userEmail = currentUser.email.trim().toLowerCase();
  console.log("Usuario actual:", userEmail);

  const url = `https://script.google.com/macros/s/AKfycbxPUWzzB1P8wNWJX2kB1SN2wVyiIj3jm_-Ck4KpaZw858PkGrMnaUmMrmI1CKlzR0R5/exec`; // tu API correcta

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log("Datos recibidos:", data);

      const usuariosValidos = data.filter(item =>
        item.hasOwnProperty("correo") && typeof item.correo === "string"
      );

      if (usuariosValidos.length === 0) {
        console.warn("No se encontraron usuarios válidos con propiedad 'correo'.");
        return;
      }

      const usuario = usuariosValidos.find(item =>
        item.correo.trim().toLowerCase() === userEmail
      );

      if (!usuario) {
        alert("Usuario no encontrado en los registros. Verifica que tu correo sea correcto.");
        return;
      }

      const thead = document.querySelector("#tabla-notas thead tr");
      thead.innerHTML = "<th>Nombre</th>";

      Object.keys(usuario).forEach(key => {
        if (key !== "nombre" && key !== "correo") {
          thead.innerHTML += `<th>${key}</th>`;
        }
      });

      const tbody = document.querySelector("#tabla-notas tbody");
      tbody.innerHTML = "";

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${usuario.nombre}</td>`;

      Object.keys(usuario).forEach(key => {
        if (key !== "nombre" && key !== "correo") {
          const notaStr = usuario[key];
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
            default:
              colorClass = "";
          }

          let contenidoCelda = notaStr || "-";

          // Mostrar sugerencias si nota es DB o DBJ
          if (notaStr === "DBJ" || notaStr === "DB") {
            colorClass = "nota-roja"; // o "nota-amarilla" si prefieres para DB
            let urlSugerencia = "sugerencias.html";
            if (key.toLowerCase() === "fisica" || key.toLowerCase() === "física") {
              urlSugerencia = "sugerenciasFisica.html";
            } else if (key.toLowerCase() === "quimica" || key.toLowerCase() === "química") {
              urlSugerencia = "sugerenciasQuimica.html";
            }

            contenidoCelda = `
              ${notaStr}<br>
              <a href="${urlSugerencia}" class="sugerencia-btn">Sugerencias</a>
            `;
          }

          tr.innerHTML += `<td class="${colorClass}">${contenidoCelda}</td>`;
        }
      });

      tbody.appendChild(tr);
    })
    .catch(err => {
      console.error("Error al cargar las notas:", err);
      alert("Hubo un problema al cargar las notas. Intenta más tarde.");
    });

  const nombreUsuarioSpan = document.getElementById("nombre-usuario");
  if (currentUser && currentUser.name) {
    nombreUsuarioSpan.textContent = currentUser.name;
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "iniciarSesion.html";
  });

    // Modo oscuro/claro
  const botonModo = document.createElement("button");
  botonModo.id = "modo-toggle";
  botonModo.innerText = "🌙 Modo Oscuro";
  document.body.appendChild(botonModo);

  // Aplicar modo guardado
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


});
