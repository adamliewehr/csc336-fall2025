let tasks = [
    {
        description: "Complete CSC336 assignment",
        priority: "#d93025", 
        dueDate: "2025-09-23",
    },
    {
        description: "Go grocery shopping",
        priority: "#34a853", 
        dueDate: "2025-09-23",
    }
];

document.addEventListener("DOMContentLoaded", populateTasksDiv);

const tasksInfoDiv = document.querySelector('#all-tasks-info');
const errorMessageDiv = document.querySelector('#error-message');

function populateTasksDiv() {
    tasksInfoDiv.innerHTML = ""; 

    for (const task of tasks) {
        const taskHTML = createTaskDiv(task);
        tasksInfoDiv.innerHTML += taskHTML;
    }
}

function createTaskDiv(task) {
    return `
        <div class="task" style="border-left-color: ${task.priority};">
            <h3>${task.description}</h3>
            <div class='task-details'>
                <span>Due: ${task.dueDate}</span>
            </div>
        </div>
    `;
}

const addTaskForm = document.querySelector("#add-task-form");
addTaskForm.addEventListener("submit", addNewTask);

function addNewTask(e) {
    e.preventDefault(); 
    errorMessageDiv.textContent = ""; 

    const descriptionInput = document.querySelector("#task-description-field").value;
    const priorityInput = document.querySelector("#task-priority-field").value;
    const dueDateInput = document.querySelector("#task-due-date-field").value;

 
    // Check if any fields are empty
    if (!descriptionInput || !priorityInput || !dueDateInput) {
        errorMessageDiv.textContent = "Error: All fields are required.";
        return;
    }

    // Check if the description is long enough
    if (descriptionInput.length < 3) {
        errorMessageDiv.textContent = "Error: Task description must be at least 3 characters long.";
        return; 
    }

    const newTask = {
        description: descriptionInput,
        priority: priorityInput,
        dueDate: dueDateInput
    };

    tasks.push(newTask); 
    populateTasksDiv(); 
    addTaskForm.reset();
}