const tasks = [];
const addNewTask = document.getElementById('add-task');
const taskCounter = document.getElementById('taskCounter');
const taskList = document.getElementById('List');
//adding to dom
function addTaskToDom(task){
//createing a li element
const li  = document.createElement('li');
li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="#" class="deleted" data-id="${task.id}" alt="img">
`
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
    })
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
    }
    showNotification('could not toggled the task');
}

function deletedask(taskId){
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
//addevent
addNewTask.addEventListener('keyup',handeInputKeypress);