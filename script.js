document.addEventListener('DOMContentLoaded', () => {
  /* ========= TASK MANAGEMENT ========= */
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

    // Toggle completed style when checkbox changes
    checkbox.addEventListener('change', () => {
      taskSpan.classList.toggle('completed', checkbox.checked);
    });

    // Remove task from list when delete button is clicked
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    li.append(checkbox, taskSpan, deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
  });

  /* ========= CALENDAR & EVENT MANAGEMENT ========= */
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    // Load events from local storage (if any)
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: savedEvents,
      eventClick(info) {
        const newTitle = prompt('Edit event title:', info.event.title);
        if (newTitle) {
          info.event.setProp('title', newTitle);
          saveEvents(calendar);
        }
      }
    });
    calendar.render();

    // Event Modal Elements
    const addEventBtn = document.getElementById('addEventBtn');
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.querySelector('.modal .close');
    const eventForm = document.getElementById('eventForm');

    addEventBtn.addEventListener('click', () => {
      eventModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
      eventModal.style.display = 'none';
    });

    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('eventTitle').value;
      const date = document.getElementById('eventDate').value;
      const description = document.getElementById('eventDescription').value;

      if (title && date) {
        const newEvent = { title, start: date, description };
        calendar.addEvent(newEvent);
        saveEvents(calendar);
        eventModal.style.display = 'none';
        eventForm.reset();
      }
    });

    function saveEvents(calendarInstance) {
      const events = calendarInstance.getEvents().map(event => ({
        title: event.title,
        start: event.start,
        description: event.extendedProps.description
      }));
      localStorage.setItem('events', JSON.stringify(events));
    }
  }
});
