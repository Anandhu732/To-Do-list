document.addEventListener('DOMContentLoaded', () => {
    const saveNoteBtn = document.querySelector('.add-note-card .save-note-btn');
    const noteTextArea = document.querySelector('.add-note-card textarea');
    const savedNotesContainer = document.getElementById('savedNotes');
  
    if (saveNoteBtn && noteTextArea && savedNotesContainer) {
      saveNoteBtn.addEventListener('click', () => {
        const noteText = noteTextArea.value.trim();
        if (!noteText) return;
  
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
        deleteBtn.addEventListener('click', () => {
          savedNotesContainer.removeChild(noteDiv);
        });
        noteDiv.appendChild(deleteBtn);
  
        savedNotesContainer.appendChild(noteDiv);
        noteTextArea.value = '';
      });
    }
  });
  