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
        text:inputBox.value.trim(),
        completed:false
    });
    
    saveData();
    rendertask();
    inputBox.value = "";
}

//The event listener is on <ul>, but e.target is the element that was clicked (li or span).
listContainer.addEventListener("click", (e)=>{
    const index = e.target.dataset.index;

    if(e.target.tagName === "LI"){
        todoList[index].completed = !todoList[index].completed;

    }
    else if(e.target.tagName === "SPAN"){
        todoList.splice(index,1);
    }
    
    saveData();
    rendertask();
});

function rendertask(){
    listContainer.innerHTML = "";

    todoList.forEach((Task,index) => {
        const li = document.createElement("li");
        li.innerText = Task.text;
        li.dataset.index = index;

        if(Task.completed){
            li.classList.add("checked");
        }
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.dataset.index = index;

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
