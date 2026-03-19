const API = "https://tinkr.tech/sdb/iljatasks";
const addButton = document.querySelector('.addButton');

addButton.addEventListener('click', async function(){
    await addTask();
})

async function loadTasks(){

    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("taskList");

    data.forEach(task => {

        const li = document.createElement("li");
        li.textContent = task.text;

        const del = document.createElement("button");
        del.textContent = "X";

        del.addEventListener('click', async function() {
            await deleteTask(task.id);
        })
        li.appendChild(del);
        list.appendChild(li);

    });

}

async function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value;

    if(!text) return;

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({text:text})
    });

    input.value="";
    loadTasks();

}

async function deleteTask(id){

    await fetch(API + "/" + id,{
        method:"DELETE"
    });

    loadTasks();

}

loadTasks();