/* Main */

let tasksContainer = document.getElementById("tasks-container");
let formContainer = document.getElementById("form-container");
let taskForm = document.getElementById("task-form");

let data = JSON.parse(localStorage.getItem("data")) || [];

let showForm = () => {
    formContainer.style.display = "block";
};

let hideForm = () => {
    formContainer.style.display = "none";
    taskForm.reset();
    taskForm.removeAttribute("data-index");
};

let createTaskElement = (task, index) => {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <input type="checkbox" class="task-checkbox" id="task-checkbox-${index}" ${task.completed ? "checked" : ""}>
        <div class="task-details">
            <label for="task-checkbox-${index}" class="task-title ${task.completed ? "completed" : ""}">${task.title.charAt(0).toUpperCase() + task.title.slice(1)}</label>
            <span class="task-date">${task.date}</span>
            <p class="task-description">${task.description.charAt(0).toUpperCase() + task.description.slice(1)}</p>
        </div>
        <div class="task-actions">
            <button class="edit-task-btn" onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
            <button class="delete-task-btn" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
    let checkbox = taskElement.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        localStorage.setItem("data", JSON.stringify(data));
        taskElement.querySelector(".task-title").classList.toggle("completed");
    });
    return taskElement;
};

let createTasks = () => {
    tasksContainer.innerHTML = "";
    data.forEach((task, index) => {
        let taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });
};

let addTask = (title, date, description) => {
    // Capitalize the first letter of the task title
    title = title.charAt(0).toUpperCase() + title.slice(1);
    // Capitalize the first letter of the task description
    description = description.charAt(0).toUpperCase() + description.slice(1);
    
    let index = taskForm.dataset.index; // get the index of the task being edited
    if (index) {
        // update the task in the data array
        data[index].title = title;
        data[index].date = date;
        data[index].description = description;
        taskForm.removeAttribute("data-index"); // clear the index data attribute
    } else {
        // add a new task to the data array
        let task = {
            title: title,
            date: date,
            description: description,
            completed: false
        };
        data.push(task);
    }
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    hideForm();
};

let editTask = (index) => {
    let task = data[index];
    taskForm.elements["task-title"].value = task.title;
    taskForm.elements["task-date"].value = task.date;
    taskForm.elements["task-description"].value = task.description;
    taskForm.dataset.index = index; // add index as a data attribute to the form
    showForm();
};

let deleteTask = (index) => {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let title = taskForm.elements["task-title"].value;
    let date = taskForm.elements["task-date"].value;
    let description = taskForm.elements["task-description"].value;
    addTask(title, date, description);
    hideForm();
});

createTasks();
