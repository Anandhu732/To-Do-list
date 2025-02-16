// Add Task Functionality
document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    if (taskInput.value.trim() !== '') {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      const taskText = document.createElement('span');
      taskText.className = 'task-text';
      taskText.textContent = taskInput.value;
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  
      checkbox.addEventListener('change', function () {
        taskText.classList.toggle('completed', this.checked);
      });
  
      deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
      });
  
      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });
  
 // Save Sticky Note
document.querySelector('.save-note-btn').addEventListener('click', function () {
    const noteText = document.querySelector('.add-note-card textarea').value;
    if (noteText.trim() !== '') {
      const savedNotes = document.getElementById('savedNotes');
  
      // Create a new note card
      const noteDiv = document.createElement('div');
      noteDiv.className = 'saved-note';
  
      // Add note content
      const noteContent = document.createElement('p');
      noteContent.textContent = noteText;
      noteDiv.appendChild(noteContent);
  
      // Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-note-btn';
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
      deleteBtn.addEventListener('click', function () {
        savedNotes.removeChild(noteDiv);
      });
      noteDiv.appendChild(deleteBtn);
  
      // Append the new note to the saved notes container
      savedNotes.appendChild(noteDiv);
  
      // Clear the textarea
      document.querySelector('.add-note-card textarea').value = '';
    }
  });
  // Save Sticky Note
  document.querySelector('.save-note-btn').addEventListener('click', function () {
    const noteText = document.querySelector('.note-card textarea').value;
    if (noteText.trim() !== '') {
      const savedNotes = document.getElementById('savedNotes');
      const noteDiv = document.createElement('div');
      noteDiv.className = 'saved-note';
      noteDiv.textContent = noteText;
      savedNotes.appendChild(noteDiv);
      document.querySelector('.note-card textarea').value = '';
    }
  });
  
  // Initialize FullCalendar
  document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: [
        { title: 'Meeting', date: '2023-10-15' },
        { title: 'Deadline', date: '2023-10-20' }
      ]
    });
    calendar.render();
  });

  // Initialize FullCalendar
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: JSON.parse(localStorage.getItem('events')) || [],
      eventClick: function (info) {
        const eventTitle = prompt('Edit event title:', info.event.title);
        if (eventTitle) {
          info.event.setProp('title', eventTitle);
          saveEvents(calendar);
        }
      }
    });
    calendar.render();
  
    // Add Event Button
    const addEventBtn = document.getElementById('addEventBtn');
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.querySelector('.close');
    const eventForm = document.getElementById('eventForm');
  
    // Open Modal
    addEventBtn.addEventListener('click', function () {
      eventModal.style.display = 'flex';
    });
  
    // Close Modal
    closeModal.addEventListener('click', function () {
      eventModal.style.display = 'none';
    });
  
    // Save Event
    eventForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const eventTitle = document.getElementById('eventTitle').value;
      const eventDate = document.getElementById('eventDate').value;
      const eventDescription = document.getElementById('eventDescription').value;
  
      if (eventTitle && eventDate) {
        const newEvent = {
          title: eventTitle,
          start: eventDate,
          description: eventDescription
        };
        calendar.addEvent(newEvent);
        saveEvents(calendar);
        eventModal.style.display = 'none';
        eventForm.reset();
      }
    });
  
    // Save Events to Local Storage
    function saveEvents(calendar) {
      const events = calendar.getEvents().map(event => ({
        title: event.title,
        start: event.start,
        description: event.extendedProps.description
      }));
      localStorage.setItem('events', JSON.stringify(events));
    }
  });
  // Show/Hide Sticky Notes Section
document.getElementById('stickyNotesMenu').addEventListener('click', function (e) {
    e.preventDefault();
  
    // Toggle Sticky Notes Section
    const stickyNotesSection = document.getElementById('stickyNotesSection');
    stickyNotesSection.style.display = stickyNotesSection.style.display === 'none' ? 'block' : 'none';
  
    // Highlight Active Menu Option
    const menuItems = document.querySelectorAll('.sidebar nav ul li a');
    menuItems.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
  });
  
  // Save Sticky Note
document.querySelector('.save-note-btn').addEventListener('click', function () {
    const noteText = document.querySelector('.add-note-card textarea').value;
    if (noteText.trim() !== '') {
      const savedNotes = document.getElementById('savedNotes');
  
      // Create a new note card
      const noteDiv = document.createElement('div');
      noteDiv.className = 'saved-note';
  
      // Add note content
      const noteContent = document.createElement('p');
      noteContent.textContent = noteText;
      noteDiv.appendChild(noteContent);
  
      // Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-note-btn';
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
      deleteBtn.addEventListener('click', function () {
        savedNotes.removeChild(noteDiv);
      });
      noteDiv.appendChild(deleteBtn);
  
      // Append the new note to the saved notes container
      savedNotes.appendChild(noteDiv);
  
      // Clear the textarea
      document.querySelector('.add-note-card textarea').value = '';
    }
  });