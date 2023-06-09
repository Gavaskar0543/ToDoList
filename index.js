var todoListApp = (function() {
    let tasks = [];
    const addNewTask = document.getElementById('add-task');
    const taskCounter = document.getElementById('taskCounter');
    const taskList = document.getElementById('List');
    
    
    //Api call
    async function fetchTodoList(){
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(response){
        //     console.log(response);
        //     return response.json();
        // })
        // .then(function(data){
        //     tasks = data.slice(0,10);
        //     renderList();
        // })
      
       try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
            tasks = data.slice(0,10);
            renderList();
       } catch (error) {
        console.log(error,'error');
       }
       
    
    }
    
    
    
    //adding to dom
    function addTaskToDom(task){
    //createing a li element
    const li  = document.createElement('li');
    li.innerHTML=`
    <div class="todoList">
        <div id="inside-todo">
        <div>
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        </div>
        <div>
        <label for="${task.id}">${task.title}</label>
        </div>
        
        <div> 
      <img 
      class="delete" id="${task.id}" data-id="${task.id}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg=="/>
        </div>
      </div>`
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
            return task.id == Number(taskId);
        });
        if(task.length > 0){
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }
       
        showNotification('could not toggled the task');
    }
    
    function deletetask(taskId){
        let newTasks = tasks.filter(function(task){
            return task.id != Number(taskId);
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
                title : text,
                id : Date.now(),
                completed:false
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
       // fetchTodoList();
    addNewTask.addEventListener('keyup',handeInputKeypress);
    document.addEventListener('click',handelEvents);
    }
    return{
        initialize : initializeApp,
    }
    })();