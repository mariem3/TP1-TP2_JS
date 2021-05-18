

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoInputDesigna = document.querySelector('.todo-designa');

const todoInputRecette = document.querySelector('.todo-textarea');

const todoItemsList = document.querySelector('.todo-items');

let todos = [];

let editTodoId="";
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (editTodoId == "") {
    addTodo(todoInput.value,todoInputDesigna.value,todoInputRecette.value); // call addTodo function with input box current value
  }
  else {
    
    
    
    for (let i = 0; i < todos.length; i++)   {    
      objectTodo=todos[i];
          if (objectTodo.id==editTodoId) {
            objectTodo.name=todoInput.value;
            objectTodo.designa=todoInputDesigna.value;
            objectTodo.Recette=todoInputRecette.value;
          }
    } 
      
    todoInput.value = '';
    todoInputDesigna.value = '';
    todoInputRecette.value = '';
    editTodoId="";
    renderTodos(todos);
  }
});

function addTodo(inputNom,inputDesigna,inputRecette) {
  
  if (inputNom !== ''&& inputDesigna !== '' && inputRecette !== '') {
    
    const todo = {
      id: Date.now(),
      name: inputNom,
      designa: inputDesigna,
      Recette: inputRecette,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage

    todoInput.value = '';
    todoInputDesigna.value = '';
    todoInputRecette.value = '';
    editTodoId="";

  }
}

// function to render given todos to screen
function renderTodos(todos) {
  todoItemsList.innerHTML = '';

  // run through each item inside todos
  todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null;

    
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
   
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}       ${item.designa}  ${item.Recette}

      <button class="delete-button">X</button>
      <button class="edit-button">Edit</button>
    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}


// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}
function editTodo(id) {
   
  }

// initially get everything from localStorage
getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  todoToEdit={};
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('edit-button')) {
    editTodoId=event.target.parentElement.getAttribute('data-key');
    
    // iterate over them
    todoToEdit=getTodoById(editTodoId);

    todoInput.value=todoToEdit.name;
    todoInputDesigna.value=todoToEdit.designa;
    todoInputRecette.value=todoToEdit.Recette;
    todoToEdit={};
    

    
  }
});

function getTodoById(id){
    todoToEdit={};
    for (let i = 0; i < todos.length; i++)   {    
        objectTodo=todos[i];
            if (objectTodo.id==id) {
                todoToEdit=objectTodo;
            }
        } 
    return todoToEdit;
}

