document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    checkOverdueTasks();
    updateDashboard();
});

let goal = 0;


function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const comments = Array.from(task.querySelectorAll('.comment')).map(comment => comment.textContent);
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.querySelector('.checkbox').checked,
            dueDate: task.querySelector('.due-date')?.textContent || '',
            category: task.querySelector('.category')?.textContent || '',
            priority: task.querySelector('.priority')?.textContent || '',
            assignee: task.querySelector('.assignee')?.textContent.replace('Assigned to: ', '') || 'Unassigned',
            comments: comments
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed, task.dueDate, task.category, task.priority, task.assignee, task.comments);
    });
    updateProgressChart();
}


function addTaskToDOM(text, completed = false, dueDate = '', category = '', priority = '', assignee = 'Unassigned', comments = []) {
    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.className = `task-item card ${isOverdue(dueDate) ? 'border-red-500' : ''} mb-4 group hover:scale-[1.01] transition-all duration-200`;
    newTodo.innerHTML = `
        <div class="flex items-center w-full justify-between p-4">
            <div class="flex items-center gap-4">
                <input type="checkbox" class="checkbox transform hover:scale-110 transition-transform" ${completed ? 'checked' : ''}> 
                <span class="font-medium ${completed ? 'line-through text-gray-400' : ''} transition-all duration-200">${text}</span>
            </div>
            <div class="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                ${category ? `<span class="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/20">${category}</span>` : ''}
                ${priority ? `<span class="px-3 py-1 rounded-full text-xs ${getPriorityColor(priority)} border border-current">${priority}</span>` : ''}
                ${dueDate ? `<span class="text-sm text-gray-400">${formatDate(dueDate)}</span>` : ''}
            </div>
        </div>
        <div class="flex mt-2">
            <button class="text-yellow-500 hover:text-yellow-700 mr-2"><i class="fas fa-edit"></i></button>
            <button class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
            <button class="text-blue-500 hover:text-blue-700 ml-2 toggle-comments"><i class="fas fa-comment"></i></button>
        </div>
        <div class="comments-section hidden w-full mt-2">
            <textarea class="comment-input w-full p-2 bg-gray-700 text-white rounded-lg" placeholder="Add a comment..."></textarea>
            <button class="add-comment mt-2 p-2 bg-blue-600 text-white rounded-lg">Add Comment</button>
            <div class="comments-list mt-2"></div>
        </div>`;
    todoList.appendChild(newTodo);

    
    const commentsList = newTodo.querySelector('.comments-list');
    comments.forEach(comment => {
        commentsList.innerHTML += `<div class="comment bg-gray-700 p-2 rounded-lg mt-2">${comment}</div>`;
    });

    newTodo.querySelector('.toggle-comments').addEventListener('click', () => {
        newTodo.querySelector('.comments-section').classList.toggle('hidden');
    });

  
    newTodo.querySelector('.add-comment').addEventListener('click', () => {
        const commentInput = newTodo.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        if (commentText) {
            commentsList.innerHTML += `<div class="comment bg-gray-700 p-2 rounded-lg mt-2">${commentText}</div>`;
            commentInput.value = '';
            saveTasks();
        }
    });
}

function getPriorityColor(priority) {
    switch(priority.toLowerCase()) {
        case 'high': return 'bg-red-500/20 text-red-400';
        case 'medium': return 'bg-yellow-500/20 text-yellow-400';
        case 'low': return 'bg-green-500/20 text-green-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

function isOverdue(dueDate) {
    if (!dueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDate < today;
}


document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date').value;
    const todoCategory = document.getElementById('todo-category').value;
    const todoPriority = document.getElementById('todo-priority').value;
    const todoAssignee = document.getElementById('todo-assignee').value;
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    addTaskToDOM(todoText, false, todoDate, todoCategory, todoPriority, todoAssignee);
    todoInput.value = '';
    document.getElementById('todo-date').value = '';
    saveTasks();
    updateDashboard();
    showNotification('New Task Added', 'A new task has been added to your list.');
});

document.getElementById('todo-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-trash')) {
        if (confirm('Are you sure you want to delete this task?')) {
            e.target.closest('li').remove();
            saveTasks();
            updateDashboard();
        }
    } else if (e.target.classList.contains('fa-edit')) {
        const task = e.target.closest('li');
        const text = task.querySelector('span').textContent;
        const category = task.querySelector('.category')?.textContent || '';
        const dueDate = task.querySelector('.due-date')?.textContent || '';
        const priority = task.querySelector('.priority')?.textContent || '';
        const assignee = task.querySelector('.assignee')?.textContent.replace('Assigned to: ', '') || 'Unassigned';

        const newText = prompt('Edit your task:', text);
        const newCategory = prompt('Edit category:', category);
        const newDueDate = prompt('Edit due date (YYYY-MM-DD):', dueDate);
        const newPriority = prompt('Edit priority (High, Medium, Low):', priority);
        const newAssignee = prompt('Edit assignee:', assignee);

        if (newText !== null) {
            task.querySelector('span').textContent = newText;
            if (task.querySelector('.category')) task.querySelector('.category').textContent = newCategory;
            if (task.querySelector('.due-date')) task.querySelector('.due-date').textContent = newDueDate;
            if (task.querySelector('.priority')) task.querySelector('.priority').textContent = newPriority;
            if (task.querySelector('.assignee')) task.querySelector('.assignee').textContent = `Assigned to: ${newAssignee}`;
            saveTasks();
        }
    }
});

document.getElementById('todo-list').addEventListener('change', function(e) {
    if (e.target.classList.contains('checkbox')) {
        saveTasks();
        updateDashboard();
    }
});

function updateDashboard() {
    const totalTasks = document.querySelectorAll('#todo-list li').length;
    const completedTasks = document.querySelectorAll('.checkbox:checked').length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('pending-tasks').textContent = pendingTasks;
}


function showNotification(title, message) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body: message });
            }
        });
    }
}

// Remove the theme toggle event listener at the bottom of the file
// Remove or comment out:
// document.getElementById('theme-toggle').addEventListener('click', function() {
//     document.body.classList.toggle('bg-white');
//     document.body.classList.toggle('text-gray-900');
//     document.body.classList.toggle('bg-gray-900');
//     document.body.classList.toggle('text-white');
// });