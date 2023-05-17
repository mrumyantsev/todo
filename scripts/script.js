const dom = {
    new: document.getElementById("new"),
    add: document.getElementById("add"),
    tasks: document.getElementById("tasks"),
    count: document.getElementById("count")
};

// Tasks array.
const tasks = [];

// Listen for pressing Enter key to add a new task.
dom.new.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addTaskHandler();
    }
});

// Monitor action if user has pressed the add button.
dom.add.onclick = () => {
    addTaskHandler()
};

// Adds new task if text field is not empty.
const addTaskHandler = () => {
    const newTaskText = dom.new.value;

    if (newTaskText && isTaskExists(newTaskText, tasks)) {
        addTask(newTaskText, tasks);
        dom.new.value = "";
        renderTasks(tasks);
    }
};

// Checks existance of a task in tasks array.
// If task with that text already exists it will correspond prompt.
const isTaskExists = (text, list) => {
    list.forEach(task => {
        if (task.text === text) {
            alert("Task already exits!");
            return false;
        }
    });

    return true;
};

// Task adding function.
const addTask = (text, list) => {
    const timestamp = Date.now();

    const task = {
        id: timestamp,
        text,
        isComplete: false
    };

    list.push(task);
};

// Output list of tasks.
const renderTasks = list => {
    let htmlList = "";

    list.forEach(task => {
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
                <div class="todo__task-text">${task.text}</div>
                <div class="todo__task-del">-</div>
            </div>
        `;

        htmlList += taskHtml;
    });

    dom.tasks.innerHTML = htmlList;

    renderTasksCount(list);
};

// Outputs total number of tasks.
const renderTasksCount = list => {
    dom.count.innerHTML = list.length;
};

// Observes click on task checkbox.
dom.tasks.onclick = event => {
    const target = event.target;
    const isCheckboxEl = target.classList.contains("todo__checkbox-div");
    const isDeleteEl = target.classList.contains("todo__task-del");

    if (isCheckboxEl) {
        const task = target.parentElement.parentElement;
        const taskId = parseInt(task.getAttribute("id"), 10);

        changeTaskStatus(taskId, tasks);
        renderTasks(tasks);
    } else if (isDeleteEl) {
        const task = target.parentElement;
        const taskId = parseInt(task.getAttribute("id"), 10);

        deleteTask(taskId, tasks);
        renderTasks(tasks);
    }
}

// Changes status of a task.
const changeTaskStatus = (id, list) => {
    list.forEach(task => {
        if (task.id === id) {
            task.isComplete = !task.isComplete;
        }
    });
};

// Removes task.
const deleteTask = (id, list) => {
    list.forEach((task, idx) => {
        if (task.id == id) {
            list.splice(idx, 1);
        }
    });
};
