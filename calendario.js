document.addEventListener('DOMContentLoaded', function () {
  // Obtener recordatorios guardados
  function obtenerRecordatoriosProfesor() {
    const data = localStorage.getItem('recordatoriosProfesor');
    return data ? JSON.parse(data) : [];
  }

  function obtenerRecordatoriosEstudiante() {
    const data = localStorage.getItem('recordatoriosEstudiante');
    return data ? JSON.parse(data) : [];
  }

  // Convertir recordatorios a eventos para FullCalendar
  function recordatoriosAEventos(recordatorios) {
    return recordatorios.map(r => ({
      title: r.materia,
      start: r.fecha,
      allDay: true,
      extendedProps: {
        descripcion: r.descripcion
      }
    }));
  }

  // Obtener todos los eventos
  const eventosProfesor = recordatoriosAEventos(obtenerRecordatoriosProfesor());
  const eventosEstudiante = recordatoriosAEventos(obtenerRecordatoriosEstudiante());

  const todosEventos = [...eventosProfesor, ...eventosEstudiante];

  // Inicializar FullCalendar
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: todosEventos,
    eventColor: '#378006',
    dayMaxEventRows: true, // ✅ muestra más de un evento por día
    eventClick: function(info) {
      const materia = info.event.title;
      const descripcion = info.event.extendedProps.descripcion;
      const fecha = info.event.start.toLocaleDateString();

      alert(`📚 Materia: ${materia}\n📅 Fecha: ${fecha}\n📝 Nota: ${descripcion}`);
    },
    eventDidMount: function(info) {
      // Agregar clase fade-in a cada evento cuando se monta
      info.el.classList.add('fade-in');
    }
  });

  calendar.render();
});
