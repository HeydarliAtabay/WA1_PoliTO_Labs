function createTaskNode(task){
    const li = document.createElement('li');
    li.id = "task"+task.id;
    li.className = 'list-group-item';
    const innerDiv = document.createElement('div');
    innerDiv.className = 'custom-control custom-checkbox';
    const externalDiv = document.createElement('div');
    externalDiv.className = 'd-flex w-100 justify-content-between';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "check-t"+ task.id;
    if(task.important)
        checkbox.className = 'custom-control-input important';
    else
        checkbox.className = 'custom-control-input';
    
    innerDiv.appendChild(checkbox);
    
    const descriptionText = document.createElement('label');
    descriptionText.className = 'description custom-control-label';
    descriptionText.innerText = task.description;
    descriptionText.htmlFor = "check-t"+ task.id;
    innerDiv.appendChild(descriptionText);

    const dateText = document.createElement('small');
    dateText.innerText = task.deadline.toString(); 
    externalDiv.appendChild(innerDiv); 
    externalDiv.appendChild(dateText);
    
    if(!task.private){
        innerDiv.insertAdjacentHTML("afterend", ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> `);
    }
    else{
        innerDiv.insertAdjacentHTML("afterend", ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` )
    }
    
    li.appendChild(externalDiv);
    return li;
}

function createAllTasks(){
    const taskList = document.getElementById("taskList");
    for(const task of tasks){
        const taskNode = createTaskNode(task);
            clearTasks();
            for(const task of tasks){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
            }
        }
    }


function clearTasks(){
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
}

const all = document.getElementById("filter-all");
const important = document.getElementById("filter-imp");
const today = document.getElementById("filter-today");
const week = document.getElementById("filter-next7");
const private = document.getElementById("filter-private");
const filterTitle = document.getElementById("filter-title");
//set the callbacks

all.addEventListener('click', event => {
    all.classList.add('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.remove('active');
    filterTitle.innerText = "All Tasks";
    
    clearTasks();
    createAllTasks();
});
    
important.addEventListener('click', event => {
    all.classList.remove('active');
    important.classList.add('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.remove('active');
    filterTitle.innerText = "Important Tasks";

    clearTasks();
    const taskList = document.getElementById("taskList");

    for(const task of tasks){
        if(task.important){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
});
    
today.addEventListener('click', event => {
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.add('active');
    week.classList.remove('active');
    private.classList.remove('active');
    filterTitle.innerText = "Tasks for Today";

    clearTasks();
    const taskList = document.getElementById("taskList");

    for(const task of tasks){
        
    }
    
});
    
week.addEventListener('click', event => {
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.add('active');
    private.classList.remove('active');
    filterTitle.innerText = "Tasks for the next week";

    clearTasks();
    const taskList = document.getElementById("taskList");
        
    for(const task of tasks){
       
    }
    
});
    
private.addEventListener('click', event => {
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.add('active');
    filterTitle.innerText = "Private Tasks";

    clearTasks();
    const taskList = document.getElementById("taskList");
        
    for(const task of tasks){
        if(task.private){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
    
});
    

    
createAllTasks();