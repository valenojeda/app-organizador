// Función para cargar calendarios desde localStorage
function loadCalendars() {
  const calendarios = JSON.parse(localStorage.getItem('calendarios')) || { calendarios: [] };
  const calendarContainer = document.getElementById('calendarContainer');
  calendarContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

  if (calendarios.calendarios.length === 0) {
    calendarContainer.innerHTML = '<p>No tienes calendarios creados.</p>';
    return;
  }

  calendarios.calendarios.forEach((calendario, index) => {
    const calendarCard = document.createElement('div');
    calendarCard.classList.add('calendar-card');

    const calendarName = document.createElement('h3');
    calendarName.textContent = calendario.nombre;

    const calendarIcon = document.createElement('div');
    calendarIcon.classList.add('calendar-icon');
    calendarIcon.textContent = calendario.nombre.charAt(0); // Primer letra del nombre como ícono

    // Crear enlace para redirigir al calendario
    const calendarLink = document.createElement('a');
    calendarLink.href = `index.html?id=${calendario.id}`;  // Redirigir a index.html con el ID del calendario
    calendarLink.textContent = "Abrir calendario";

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️ Borrar';
    deleteBtn.onclick = () => {
      if (confirm('¿Seguro que quieres borrar este calendario?')) {
        deleteCalendar(calendarios, index);
      }
    };

    calendarCard.appendChild(calendarIcon);
    calendarCard.appendChild(calendarName);
    calendarCard.appendChild(calendarLink);
    calendarCard.appendChild(deleteBtn);
    calendarContainer.appendChild(calendarCard);
  });
}

// Función para crear un nuevo calendario
document.getElementById('createCalendarBtn').addEventListener('click', () => {
  const calendarName = document.getElementById('calendarName').value.trim();
  if (calendarName) {
    const calendarios = JSON.parse(localStorage.getItem('calendarios')) || { calendarios: [] };
    const newCalendar = {
      id: new Date().toISOString(), // Genera un ID único basado en la fecha
      nombre: calendarName,
      tasks: [] // Inicialmente, sin tareas
    };
    calendarios.calendarios.push(newCalendar);
    localStorage.setItem('calendarios', JSON.stringify(calendarios));
    loadCalendars(); // Vuelve a cargar los calendarios
    document.getElementById('calendarName').value = ''; // Limpiar el input
  } else {
    alert('Por favor, ingresa un nombre para el calendario.');
  }
});

// Función para borrar un calendario
function deleteCalendar(calendarios, index) {
  calendarios.calendarios.splice(index, 1);
  localStorage.setItem('calendarios', JSON.stringify(calendarios));
  loadCalendars(); // Vuelve a cargar los calendarios
}

document.addEventListener('DOMContentLoaded', loadCalendars);

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}
