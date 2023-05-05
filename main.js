let data = JSON.parse(localStorage.getItem("data")) || [];

let taskList = document.getElementById("task-list");
let taskForm = document.getElementById("task-form");
let taskTitleInput = document.getElementById("task-title-input");
let taskDateInput = document.getElementById("task-date-input");
let taskDescriptionInput = document.getElementById("task-description-input");

let showForm = () => {
    taskForm.classList.add("show");
    };

    let hideForm = () => {
        taskForm.classList.remove("show");
            taskTitleInput.value = "";
                taskDateInput.value = "";
                    taskDescriptionInput.value = "";
                    };

                    let createTaskElement = (task, index) => {
                        let taskElement = document.createElement("div");
                            taskElement.classList.add("task");
                                taskElement.innerHTML = `
                                        <input type="checkbox" class="task-checkbox" id="task-checkbox-${index}" ${task.completed ? "checked" : ""}>
                                                <label for="task-checkbox-${index}" class="task-title ${task.completed ? "completed" : ""}">${task.title.charAt(0).toUpperCase() + task.title.slice(1)}</label>
                                                        <br>
                                                                <span class="task-date">${task.date}</span>
                                                                        <p class="task-description">${task.description.charAt(0).toUpperCase() + task.description.slice(1)}</p>
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

                                                                                                                                                            let renderTaskList = () => {
                                                                                                                                                                taskList.innerHTML = "";
                                                                                                                                                                    data.forEach((task, index) => {
                                                                                                                                                                            let taskElement = createTaskElement(task, index);
                                                                                                                                                                                    taskList.appendChild(taskElement);
                                                                                                                                                                                        });
                                                                                                                                                                                        };

                                                                                                                                                                                        let addTask = (event) => {
                                                                                                                                                                                            event.preventDefault();
                                                                                                                                                                                                let task = {
                                                                                                                                                                                                        title: taskTitleInput.value,
                                                                                                                                                                                                                date: taskDateInput.value,
                                                                                                                                                                                                                        description: taskDescriptionInput.value,
                                                                                                                                                                                                                                completed: false
                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                        data.push(task);
                                                                                                                                                                                                                                            localStorage.setItem("data", JSON.stringify(data));
                                                                                                                                                                                                                                                hideForm();
                                                                                                                                                                                                                                                    renderTaskList();
                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                    let editTask = (index) => {
                                                                                                                                                                                                                                                        let task = data[index];
                                                                                                                                                                                                                                                            taskTitleInput.value = task.title;
                                                                                                                                                                                                                                                                taskDateInput.value = task.date;
                                                                                                                                                                                                                                                                    taskDescriptionInput.value = task.description;
                                                                                                                                                                                                                                                                        data.splice(index, 1);
                                                                                                                                                                                                                                                                            localStorage.setItem("data", JSON.stringify(data));
                                                                                                                                                                                                                                                                                hideForm();
                                                                                                                                                                                                                                                                                    renderTaskList();
                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                    let deleteTask = (index) => {
                                                                                                                                                                                                                                                                                        data.splice(index, 1);
                                                                                                                                                                                                                                                                                            localStorage.setItem("data", JSON.stringify(data));
                                                                                                                                                                                                                                                                                                renderTaskList();
                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                taskForm.addEventListener("submit", addTask);

                                                                                                                                                                                                                                                                                                renderTaskList();
