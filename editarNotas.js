import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://aamvnpvfzmnrrfurovuv.supabase.co';  // pon tu URL Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbXZucHZmem1ucnJmdXJvdnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNjI2NDUsImV4cCI6MjA2MzYzODY0NX0._OigReH-zPR9AfGE5L9Rw9H71AnxQzH7T5k93mjPj5E';  // pon tu anon/public key
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
  const selectEstudiante = document.getElementById('estudiante');
  const selectAsignatura = document.getElementById('asignatura');
  const btnActualizar = document.getElementById('btnActualizar');
  const mensaje = document.getElementById('mensaje');

  try {
    // Cargar estudiantes
    const { data: estudiantes, error: errEst } = await supabase
      .from('estudiantes')
      .select('id, nombre, correo');
    if (errEst) throw errEst;

    estudiantes.forEach(est => {
      const option = document.createElement('option');
      option.value = est.id;       // guardamos id
      option.textContent = est.nombre;
      selectEstudiante.appendChild(option);
    });

    // Cargar materias
    const { data: materias, error: errMat } = await supabase
      .from('materias')
      .select('id, nombre');
    if (errMat) throw errMat;

    materias.forEach(mat => {
      const option = document.createElement('option');
      option.value = mat.id;       // guardamos id
      option.textContent = mat.nombre;
      selectAsignatura.appendChild(option);
    });

  } catch (error) {
    mensaje.textContent = 'Error al cargar estudiantes o materias: ' + error.message;
  }

  btnActualizar.addEventListener('click', async () => {
    const estudianteId = selectEstudiante.value;
    const materiaId = selectAsignatura.value;
    const nuevaNota = document.getElementById('nuevaNota').value.trim().toUpperCase();

    if (!estudianteId || !materiaId || !nuevaNota) {
      mensaje.textContent = 'Por favor, complete todos los campos.';
      return;
    }

    const notasValidas = ['DBJ', 'DB', 'DA', 'DS'];
    if (!notasValidas.includes(nuevaNota)) {
      mensaje.textContent = 'La nota debe ser DBJ, DB, DA o DS.';
      return;
    }

    try {
      // Buscar si ya existe nota para ese estudiante y materia
      const { data: notaExistente, error: errBuscar } = await supabase
        .from('notas')
        .select('id')
        .eq('estudiante_id', estudianteId)
        .eq('materia_id', materiaId)
        .single();

      if (errBuscar && errBuscar.code !== 'PGRST116') { // PGRST116 = no encontrado, es válido
        throw errBuscar;
      }

      if (notaExistente) {
        // Actualizar
        const { error: errActualizar } = await supabase
          .from('notas')
          .update({ nota: nuevaNota })
          .eq('id', notaExistente.id);
        if (errActualizar) throw errActualizar;

        mensaje.textContent = 'Nota actualizada correctamente.';
      } else {
        // Insertar nueva fila
        const { error: errInsertar } = await supabase
          .from('notas')
          .insert([{ estudiante_id: estudianteId, materia_id: materiaId, nota: nuevaNota }]);
        if (errInsertar) throw errInsertar;

        mensaje.textContent = 'Nota agregada correctamente.';
      }

      setTimeout(() => (mensaje.textContent = ''), 4000);

    } catch (error) {
      mensaje.textContent = 'Error al actualizar nota: ' + error.message;
    }
  });

  document.querySelector('.btn-volver').addEventListener('click', () => {
  window.location.href = 'profesor.html';
});


});
