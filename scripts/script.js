// Elements of the page.
const dom = {
    new: document.getElementById("new"),
    add: document.getElementById("add"),
    tasks: document.getElementById("tasks"),
    count: document.getElementById("count")
};

// Getting the tasks from localStorage, or creating empty array.
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const main = () => {
    renderTasks();
}

// Listen for pressing Enter key to add a new task.
dom.new.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTaskHandler();
    }
})

// Monitor action if user has pressed the add button.
dom.add.onclick = () => {
    addTaskHandler();
}

// Observes click on task checkbox.
dom.tasks.onclick = (event) => {
    const target = event.target;
    const isCheckboxEl = target.classList.contains("todo__checkbox-div");
    const isDeleteEl = target.classList.contains("todo__task-del");

    if (isCheckboxEl) {
        const task = target.parentElement.parentElement;
        const taskId = parseInt(task.getAttribute("id"), 10);

        changeTaskStatus(taskId);
        renderTasks();
    } else if (isDeleteEl) {
        const task = target.parentElement;
        const taskId = parseInt(task.getAttribute("id"), 10);

        deleteTask(taskId);
        renderTasks();
    }
}

// Adds new task if text field is not empty.
const addTaskHandler = () => {
    const newTaskText = dom.new.value;

    if (newTaskText === "") {
        return;
    }

    if (isTaskExists(newTaskText)) {
        alert("Task already exists!");

        return;
    }

    addTask(newTaskText);
    dom.new.value = ""; // clear new task input
    renderTasks();
}

// Output list of tasks.
const renderTasks = () => {
    let htmlList = "";

    tasks.forEach((task) => {
        const cls = task.isComplete
            ? "todo__task todo__task_complete"
            : "todo__task"
        
        const checked = task.isComplete
            ? " checked"
            : ""

        const taskHtml = `
            <div id="${task.id}" class="${cls}">
                <label class="todo__checkbox">
                    <input type="checkbox"${checked}>
                    <div class="todo__checkbox-div"></div>
                </label>
                <div class="todo__task-text selectable-all">${task.text}</div>
                <div class="todo__task-del">-</div>
            </div>
        `;

        htmlList += taskHtml;
    });

    dom.tasks.innerHTML = htmlList;

    renderTasksCount();
}

// Outputs total number of tasks.
const renderTasksCount = () => {
    dom.count.innerHTML = tasks.length;
}

// Checks existance of a task in tasks array.
const isTaskExists = (text) => {
    for (const task of tasks) {
        if (task.text === text) {
            return true;
        }
    }

    return false;
}

// Adds a task.
const addTask = (text) => {
    const timestamp = Date.now();

    const task = {
        id: timestamp,
        text,
        isComplete: false
    };

    tasks.push(task);

    updateLocalStorage();
}

// Changes status of a task.
const changeTaskStatus = (id) => {
    tasks.forEach((task) => {
        if (task.id === id) {
            task.isComplete = !task.isComplete;
        }
    });

    updateLocalStorage();
}

// Removes a task.
const deleteTask = (id) => {
    tasks.forEach((task, idx) => {
        if (task.id == id) {
            tasks.splice(idx, 1);
        }
    });

    updateLocalStorage();
}

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

main();
