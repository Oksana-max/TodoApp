const btnAdd = document.querySelector(".form__btn");
const inputAdd = document.querySelector(".form__add_input");
const ul = document.querySelector(".input__list");

let todos = JSON.parse(localStorage.getItem("todo-list"));

//===============================================================================================
function showTask() {
    let task = "";
    if (todos) {
        todos.forEach((item, id) => {
            task += `
                 <li id = "${id}" onclick="update(this)" class="input__item">${item.name}<span onclick = deleteTask(this)>X</span></li>
                 `;
        })
    }
    ul.innerHTML = task;
}
showTask();


//===============================================================================================
function update(selected) {
    if (!selected.classList.contains("checked")) {
        if (todos[selected.id]) {
            todos[selected.id].checked = 'true';
        }

        selected.classList.add('checked');

    } else {
        if (todos[selected.id]) {
            todos[selected.id].checked = 'false';
        }
        selected.classList.remove('checked');
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function deleteTask(deleted) {
    todos.splice(deleted.parentNode.id, 1)
    deleted.parentNode.remove()
    localStorage.setItem("todo-list", JSON.stringify(todos))
}
//================================================================================================


btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    let value = inputAdd.value.trim();
    if (e.target == btnAdd && value) {
        if (!todos) {
            todos = [];
        }
        inputAdd.value = "";
        let taskInfo = { name: value, checked: 'false' };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos))
        showTask();
    } else {
        alert("Введите что-нибудь")
    }

})