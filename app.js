// 1st step//: get input from user;
// 2nd step//: show output to UI;
// 3rd step//: store the data in localStorage;

// tag selection
const inputField = document.querySelector(".input_area input");
const addNewBtn = document.querySelector(".input_area button");
const todoList = document.querySelector(".todo_list");


// 1st step//: get input from user;

function getUserInput(){
    const taskName = inputField.value;
    inputField.value = "";
    return taskName;
}

// handle key press event here
function handleKeyPress(e){
    if (e.key === "Enter"){
        handleAddTask();
    }
}

// handle click press event here
    function handleAddTask(){
        const taskName = getUserInput();
        if(!taskName) return;
        displayTaskToUI(taskName);
        addTaskToLocalStorage(taskName);

    }



// 2nd step//: show output to UI;

// display show task to UI
function displayTaskToUI(taskName){
    const li = document.createElement("li");
    li.innerHTML = `<span id="taskName">${taskName}</span>
                        <button id="edit">E</button>
                        <button id="delete">D</button`;
    todoList.appendChild(li);
}

// display all tasks to UI while page loaded
function displayAndTasksToUIWhilePageLoaded(){
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((taskName) => displayTaskToUI(taskName));
}


// 3rd step//: store the data in localStorage;

// add  tasks to localStorage
function addTasksToLocalStorage(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
 

// add single task to localStorage
function addTaskToLocalStorage(taskName){
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskName);
    addTasksToLocalStorage(tasks);
}

// get all tasks from localStorage
function getTasksFromLocalStorage(){
    let tasks = [];
    const rowTasks = localStorage.getItem("tasks");
    if (rowTasks) {
        tasks = JSON.parse(rowTasks);
    }
    return tasks;
}


// 4th step//: delete tasks from UI;
// delete, action, edit, update handler is here

// delete handler
function deleteHandler(targetEl){
    const li = targetEl.parentElement;
    const taskName = li.querySelector("#taskName").textContent;
    li.remove();
    deleteTaskFromLocalStorage(taskName);
}

// action handler
function actionHandler(e){
    const targetEl = e.target;
    if(targetEl.id === "delete"){
        deleteHandler(targetEl);
    } else if (targetEl.id === "edit"){
        editHandler(targetEl);
    }
}

// edit handler
function editHandler(targetEl){
    const li = targetEl.parentElement;
    const preVal = li.querySelector("#taskName").textContent;
    li.innerHTML = `<input onkeypress ='eventHandler(event)' value= "${preVal}">
                    <button onclick = 'updateHandler(event)'>U</button>`
    
}

// event handler
function eventHandler(e){
    const input = e.target;
    if(e.key === "Enter"){
        updateTask(input);
    }
}

// update handler
function updateHandler(e){
    const input = e.target.previousElementSibling;
    updateTask(input);
}

// update task
function updateTask(input){
    const newTaskName = input.value;
    const li = input.parentElement;
    li.innerHTML = `<span id="taskName">${newTaskName}</span>
                        <button id="edit">E</button>
                        <button id="delete">D</button`;
}

// 5th step//: delete task from localStorage
function deleteTaskFromLocalStorage(taskName){
    const tasks = getTasksFromLocalStorage();
    const tasksAfterDeleting = tasks.filter(task => task !== taskName);
    addTasksToLocalStorage(tasksAfterDeleting);
}


// all handle event call function here
inputField.addEventListener("keypress", handleKeyPress);
addNewBtn.addEventListener("click",handleAddTask);
todoList.addEventListener("click", actionHandler);
displayAndTasksToUIWhilePageLoaded();
