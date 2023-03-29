let tasks = [];
const addNewTask = document.getElementById('add-task');
const taskCounter = document.getElementById('taskCounter');
const taskList = document.getElementById('List');
//adding to dom
function addTaskToDom(task){
//createing a li element
const li  = document.createElement('li');
li.classList.add('list-group-item');
li.innerHTML=`
<div class="d-flex justify-content-between">

    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="trash.svg" class="delete" id="${task.id}" data-id="${task.id}" height="20px" width="30px" alt="img"></div>`
taskList.append(li);
}
//rndering
function renderList(taskId){
   taskList.innerHTML = '';
    for(let i = 0; i<tasks.length; i++){
        addTaskToDom(tasks[i]);
    }
    taskCounter.innerHTML = tasks.length;

}
function markTaskComeleted(taskId){
    const task = tasks.filter(function(task){
        return task.id == taskId;
    });
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
   
    showNotification('could not toggled the task');
}

function deletetask(taskId){
    let newTasks = tasks.filter(function(task){
        return task.id != taskId;
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted sucessfully!');
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('task added sucessfully');
        return;
    }
    showNotification('Task can not be added');

}
//notification function
function showNotification(text){
    alert(text);

}
//handing key press
function handeInputKeypress(event){
    if(event.key == 'Enter'){
        const text = event.target.value;
        console.log('text',text);
        if(!text){
            showNotification('Task text cannot empty');
            return;
        }
        const task = {
            text,
            id : Date.now().toString(),
            done:false
        }
        event.target.value = '';
        addTask(task);
    }
    
   
}
function handelEvents(event){
    const target = event.target;
    console.log(target.className);
    if(target.className == 'delete'){
        console.log("working...");
     const taskId = target.id;
     console.log(taskId);
     deletetask(taskId);
     return;
    }
    else if(target.className =='custom-checkbox'){
        console.log("working..");
        const taskId = target.id;
        markTaskComeleted(taskId);
        return;
    }
    
}
//addevent
function initializeApp(){
addNewTask.addEventListener('keyup',handeInputKeypress);
document.addEventListener('click',handelEvents);
}
initializeApp();