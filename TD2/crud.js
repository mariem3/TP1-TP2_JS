

var addArticleToLocalStorage = () => {
    let NomArticle = inputNomArticle.value;
    let Designation = inputDesignation.value;
    let Recette = inputRecette.value;
    if (NomArticle && Designation && Recette) {
        Article.NomArticle = NomArticle;
        Article.Designation = Designation;
        Article.Recette = Recette;
        // ajout au local storage avec une clé unique (les 2 premières lettres de chaque champs)
        var ArticleKey = `${NomArticle.substring(0, 2)}${Designation.substring(0, 2)}${Recette.substring(0, 2)}`;
        localStorage.setItem(ArticleKey, JSON.stringify(Article));
    }
};






// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
const todoInputDesigna = document.querySelector('.todo-designa');

const todoInputRecette = document.querySelector('.todo-textarea');

// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array which stores every todos
let todos = [];

let editTodoId="";
// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
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

// function to add todo
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

    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage

    // finally clear the input box value
    todoInput.value = '';
    todoInputDesigna.value = '';
    todoInputRecette.value = '';
    editTodoId="";

  }
}

// function to render given todos to screen
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
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
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
  // conver the array to string then store it.
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
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}


// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}


function editTodo(id) {
   
  
    // update the localStorage
    //addToLocalStorage(todos);
  }

// initially get everything from localStorage
getFromLocalStorage();



// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
  todoToEdit={};
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('edit-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
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


/*




// Création d'éléments et mise en page 
var bookDisplay = document.createElement('div');
var bookInfo = document.createElement('p');
articleInfo.classList.add('fs-5');
articleDisplay.appendChild(articleInfo);
myBooksAdmin.appendChild(articleDisplay);

var htmlClass = `${Article.substring(0,2)}${i+1}`;
var htmlClassNoSpace = htmlClass.replace(" ", "");
bookInfo.innerHTML = `<img class="me-3 modify ${htmlClassNoSpace}" style="width: 2.5em; cursor: pointer;" src="./assets/modify.svg" alt="">
<img class="me-5 delete ${htmlClassNoSpace}" style="width: 2.5em; cursor: pointer;" src="./assets/delete.svg" alt="">"${NomArticle}" - ${Designation} `;

const parser = new DOMParser();
htmlarticleInfo = parser.parseFromString(articleInfo.innerHTML, "text/html");

// Boutons modifier/supprimer
var editButtom = document.querySelector(`.modify.${htmlClassNoSpace}`);


modifyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = Article;
    inputDesigna.value = Designation;
    inputRecette.value = Recette;
})


*/