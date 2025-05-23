const API_URL = 'https://script.google.com/macros/s/AKfycbwqjmsgX5v1kvx94Q913Yym1MkbwxqAyKURxASeBzZfSK9MHUUQFc6Konvjwb2Q58pQ/exec';

document.addEventListener('DOMContentLoaded', () => {
  const selectEstudiante = document.getElementById('estudiante');
  const selectAsignatura = document.getElementById('asignatura');
  const btnActualizar = document.getElementById('btnActualizar');
  const mensaje = document.getElementById('mensaje');

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      if (!data.length) return;

      // Cargar estudiantes
      data.forEach(est => {
        const option = document.createElement('option');
        option.value = est.correo;
        option.textContent = est.nombre;
        selectEstudiante.appendChild(option);
      });

      // Cargar asignaturas (claves de propiedades menos nombre y correo)
      const keys = Object.keys(data[0]);
      keys.forEach(key => {
        if (key !== 'nombre' && key !== 'correo') {
          const option = document.createElement('option');
          option.value = key;
          option.textContent = key.toUpperCase();
          selectAsignatura.appendChild(option);
        }
      });
    })
    .catch(err => {
      mensaje.textContent = 'Error al cargar estudiantes y asignaturas: ' + err;
    });

  btnActualizar.addEventListener('click', () => {
    const estudiante = selectEstudiante.value;
    const asignatura = selectAsignatura.value.trim();
    const nuevaNota = document.getElementById('nuevaNota').value.trim().toUpperCase();

    if (!estudiante || !asignatura || !nuevaNota) {
      mensaje.textContent = 'Por favor, complete todos los campos.';
      return;
    }

    const notasValidas = ['DBJ', 'DB', 'DA', 'DS'];
    if (!notasValidas.includes(nuevaNota)) {
      mensaje.textContent = 'La nota debe ser DBJ, DB, DA o DS.';
      return;
    }

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ estudiante, asignatura, nuevaNota }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.text())
      .then(data => {
        mensaje.textContent = data;
        setTimeout(() => (mensaje.textContent = ''), 4000); // Limpia el mensaje después de 4 segundos
      })
      .catch(err => {
        mensaje.textContent = 'Error: ' + err;
      });
  });
});
