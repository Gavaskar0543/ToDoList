let tasks = [];
let addNewTask = document.getElementById('add-task');
let taskCounter = document.getElementById('taskCounter');
let taskList = document.getElementById('List');

function renderList(taskId){

}
function markTaskComplete(taskId){
    const task = tasks.filter(function(task){
        return task.id == taskId;
    })
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
    }
    showNotification('could not toggled the task');
}

function deletTask(taskId){
    const newTasks = tasks.filter(function(task){
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
        let text = event.target.value;
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
//addevent
addNewTask.addEventListener('keyup',handeInputKeypress);