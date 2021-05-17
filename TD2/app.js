
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const adminGo = document.getElementById('go');

var logpassAdmin = function (event) {
    event.preventDefault();
    localStorage.setItem("testUser", "admin");               
    localStorage.setItem("password", "1234"); 
    const loginlog = inputLogin.value;
    const pw = inputPassword.value;

    if (loginlog && pw) {
        if (localStorage.getItem("testUser") === loginlog && localStorage.getItem("password") === pw) {
            location.href = "./crud.html";
            localStorage.removeItem("testUser");
            localStorage.removeItem("password");
        }
        else {alert("Login ou mot de passe admin incorrect")}
    }
}



adminGo.addEventListener('click', logpassAdmin);


let todos = [];
function addTodo(inputNom,inputDesigna,inputRecette) {
  
    // if item is not empty
    if (inputNom !== ''&& inputDesigna !== '' && inputRecette !== '') {
      
      // make a todo object, which has id, name, and completed properties
      const todo = {
        id: Date.now(),
        name: inputNom,
        designa: inputDesigna,
        Recette: inputRecette,
        completed: false
      };
  todos.push(todo);

    }
}

const todoItemsList = document.querySelector('.todo-items');
function renderTodos(todos) {
    // clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';
  
    // run through each item inside todos
    todos.forEach(function(item) {
      // check if the item is completed
      const checked = item.completed ? 'checked': null;
  
      // make a <li> element and fill it
      // <li> </li>
      const li = document.createElement('li');
      li.setAttribute('class', 'item');
      li.setAttribute('data-key', item.id);
        if (item.completed === true) {
        li.classList.add('checked');
      }
  
      li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}       ${item.designa}  ${item.Recette}
  
        
        
      `;
      // finally add the <li> to the <ul>
      todoItemsList.append(li);
    });  
}

  renderTodos(todos);

  function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
      // converts back to array and store it in todos array
      todos = JSON.parse(reference);
      renderTodos(todos);
    }
  }
  getFromLocalStorage();
