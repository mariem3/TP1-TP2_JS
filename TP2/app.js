
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const adminGo = document.getElementById('go');
/* *************************************************
**************   USER : admin *********************
**************************************************$
*************** MOT DE PASSE : 1234  **************
**************************************************
**************************************************/
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
    todoItemsList.innerHTML = '';
  
    todos.forEach(function(item) {
      const checked = item.completed ? 'checked': null;
  
     
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
