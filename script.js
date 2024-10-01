const addTask = document.querySelector("#add");
const inputBtn = document.querySelector(".input-btn");
const displayField = document.querySelector(".display-field");

const addbtnfunc = () => {
    if(inputBtn.value === "") return;
    let userTask = inputBtn.value.trim();


    // for task
    const task = document.createElement("div");
    task.className = "task";
    displayField.appendChild(task);

    // for inner div and hr
    const eachTask = document.createElement("div");
    eachTask.className = "eachtask";
    task.appendChild(eachTask);
    task.appendChild(document.createElement("hr"));

    // for eachtask - main task and buttons
    const newSpan = document.createElement("span");
    newSpan.className = "main-task";
    newSpan.textContent = userTask;
    const newdonebtn = document.createElement("button");
    newdonebtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
    const newremovebtn = document.createElement("button");
    newremovebtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    newdonebtn.className = "done-btn";
    newremovebtn.className = "remove-btn";
    eachTask.appendChild(newSpan);
    eachTask.appendChild(newdonebtn);
    eachTask.appendChild(newremovebtn);

    // newremovebtn.addEventListener("click", () => {
    //     newremovebtn.closest(".task").remove();
    //     savedata();
    // });
    // newdonebtn.addEventListener("click", () => {
    //     newSpan.style.textDecoration = "line-through";
    //     savedata();
    // });
    // newdonebtn.addEventListener("dblclick", () => {
    //     newSpan.style.textDecoration = "none";
    //     savedata();
    // });
    inputBtn.value = "";
    savedata();
};


inputBtn.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
       addbtnfunc();
    }
});

addTask.addEventListener("click", () => addbtnfunc());

function savedata(){
    localStorage.setItem("task-data",displayField.innerHTML);
}
function showtask(){
    displayField.innerHTML = localStorage.getItem("task-data");
}


displayField.addEventListener("click", (e) => {
    if(e.target.className == "done-btn" || e.target.closest(".done-btn")){
        const nearestEachTask = e.target.closest(".eachtask");
        const mainTask = nearestEachTask.querySelector(".main-task");
        if(mainTask.style.textDecoration == "line-through"){
            mainTask.style.textDecoration = "none";
            savedata();
            return;
        }
        mainTask.style.textDecoration = "line-through";
        savedata();
    }
    if(e.target.className == "remove-btn" || e.target.closest(".remove-btn")){
        const nearestTask = e.target.closest(".task");
        nearestTask.remove();
        savedata();
    }
});

showtask();