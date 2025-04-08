const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const TodoList = document.getElementById('TodoList');

let editTodo =null;

// function to add todo
const addTodo = ()=>{
    const inputText=inputBox.value.trim();
    if(inputText.length<=0){
        alert("you must write something in your to do");
        return false;
    }
    if(addBtn.value ==="Edit"){
        //passing the orignal text to editlocal todo funtion before edit

        editTodo.target.previousElementSibling.innerHTML= inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{
    // p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    // edit button
    const editBtn = document.createElement("button");
    editBtn.innerText ="Edit";
    editBtn.classList.add ("btn","editBtn");
    li.appendChild(editBtn);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText ="Remove";
    deleteBtn.classList.add ("btn","deleteBtn");
    li.appendChild(deleteBtn); 
    TodoList.appendChild(li);
    inputBox.value ="";
     saveLocalTodos(inputText);
}
}
// function to update:(edit/dellete)todo
const updateTodo = (e)=>{
    //console.log(e.target.innerHTML);
if(e.target.innerHTML==="Remove"){
   TodoList.removeChild(e.target.parentElement);
   deleteLocalTodos(e.target.parentElement);
    //console.log(e.target.parentElement);
}
if(e.target.innerHTML==="Edit"){
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
}


}
//function to save localtodo
const saveLocalTodos =(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
         todos = [];
    }
else{
    todos = JSON.parse(localStorage.getItem("todos"));

}
    //console.log(localStorage.getItem("todos"));
   // console.log(JSON.parse(localStorage.getItem("todos")));

    //todos = localStorage.getItem("todo");
   //todos.push(todo);
   //todo = JSON.parse(localStorage.getItem("todos"));
   todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
// funtion to get local todo

const getLocalTodos = () =>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos= [];

    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            // creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);
            // Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText="Edit";
            editBtn.classList.add("btn","editBtn");
            // delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText ="Remove";
            deleteBtn.classList.add("btn","deleteBtn");
            li.appendChild(deleteBtn);

            TodoList.appendChild(li);
        });
    }}
// funtion delete local todo
const deleteLocalTodos =(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
let todoText= todo.children[0].innerHTML;
let todoIndex=todos.indexOf(todoText);
todos.splice(todoIndex,1);
localStorage.setItem("todos",JSON.stringify(todos));
// array functions: slice/splice
console.log(todoIndex)
}
const editLocalTodos =(todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click',addTodo);
TodoList.addEventListener('click',updateTodo);

