let todoList = [];
const inputBox = document.querySelector("#input-box");
const addbtn = document.querySelector("#Add-btn");
const listContainer = document.querySelector("#list-container");

loadData();
rendertask();

//Add button logic
addbtn.addEventListener('click', addtask)

//allowig enter key to add the task
inputBox.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        addtask();
    }
})

//addtask function and delete combined
function addtask(){
    if(inputBox.value.trim() === ""){
        alert("Please enter a task");
        return;
    }
    todoList.push({
        id:Date.now(),
        text:inputBox.value.trim(),
        completed:false
    });
    
    saveData();
    rendertask();
    inputBox.value = "";
}

//The event listener is on <ul>, but e.target is the element that was clicked (li or span).
listContainer.addEventListener("click", (e)=>{
    const id = Number(e.target.dataset.id);
    if(!id) return;

    const taskIndex = todoList.findIndex(task => task.id === id);
    if (taskIndex === -1) return;

    if(e.target.tagName === "LI"){
        todoList[taskIndex].completed = !todoList[taskIndex].completed;

    }
    else if(e.target.tagName === "SPAN"){
        todoList.splice(taskIndex,1);
    }
    
    saveData();
    rendertask();
});

function rendertask(){
    listContainer.innerHTML = "";

    todoList.forEach((task) => {
        const li = document.createElement("li");
        li.innerText = task.text;
        li.dataset.id = task.id;

        if(task.completed){
            li.classList.add("checked");
        }
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.dataset.id = task.id;

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}


function saveData(){
    localStorage.setItem("tasks",JSON.stringify(todoList));
}

function loadData(){
    const data = localStorage.getItem("tasks");
    todoList = data ? JSON.parse(data) : [];
}
