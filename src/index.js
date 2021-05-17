import './styles/style.css';
import { manageInputs } from './modules/manageAllInputs.js';
import { manageTodos } from './modules/todoManager.js';
console.log('webpack working.1245.');


//On Click, visual stuff.
const syncUI = (() => {
    const titles = document.querySelectorAll('.nav-ul .title');
    const addButton = document.querySelector('.addTodo');
    const formOverlay = document.querySelector('.addNewItems-overlay');
    const closeFormOverlay = document.querySelector('.close-newItemsInput');
    const formWrapper = document.querySelector('.form-wrapper');

    const switchTabs = (e) => {
        titles.forEach(title => title.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const data = e.currentTarget.dataset.id;
        //Here goes function for generating todos for specific data type/category
    }

    //This func managed openning and closing input forms and their respective tabs/categories.
    manageInputs(formWrapper);
    
    //Displaying todos when we first load the page
    manageTodos.displayTodos();

    titles.forEach(title => title.addEventListener('click', switchTabs));
    addButton.addEventListener('click', () => formOverlay.classList.add('addNewItemsActive'));
    closeFormOverlay.addEventListener('click', () => formOverlay.classList.remove('addNewItemsActive'));

    return { formOverlay }
})();

const Controller = (() => {
    let editFlag = false;
    let editElement = undefined;

    const newTodoForm = document.querySelector('.create_new_todo form');
    const todoTitleInput = document.querySelector('.create_new_todo_title');
    const todoDetailsInput = document.querySelector('.create_new_todo_details');
    const todoDueDateInput = document.getElementById('create_new_todo_dueDate');
    const selectedProjectInput = document.getElementById('selectedProject');
    const todoListUL = document.getElementById('todo-list');
    
    const resetAllInputs = () => {
        const allPriorityBtns = document.querySelectorAll('.new_priorityBtn');
        allPriorityBtns.forEach(btn => btn.classList.remove('priority-active'));
        todoTitleInput.value = '';
        todoDetailsInput.value = '';
        todoDueDateInput.value = '';
        selectedProjectInput.value = 'home';
    }

    const addNewTodo = (e) => {
        e.preventDefault();
        const todoTitle = todoTitleInput.value;
        const todoDetails = todoDetailsInput.value;
        const todoDueDate =  todoDueDateInput.value;
        const forProject = selectedProjectInput.value;
        const priority = document.querySelector('.priority-active') ? document.querySelector('.priority-active').dataset.priority : 'low';
        const todoId = new Date().getTime();

        if(!editFlag && todoTitle !== '' && todoDueDate !== '') {
        manageTodos.setTodos(todoTitle, todoDetails, todoDueDate, priority, forProject, todoId, false);
        console.log(manageTodos.todos);
        //If no Params are passed it will display home/all by default.
        manageTodos.displayTodos();
        resetAllInputs();
        } else if(editFlag && todoTitle !== '' && todoDueDate !== '') {
            manageTodos.editTodos(todoTitle, todoDetails, todoDueDate, priority, forProject, editElement.id, false);
            editFlag = false;
            editElement = undefined;
            resetAllInputs();
        }
    }

    newTodoForm.addEventListener('submit', addNewTodo);

    //Listenening for Edit,Remove, Get Details Buttons
    todoListUL.addEventListener('click', (e) => {
        const id = e.target.parentElement.id;
        if(e.target.classList.contains('removeBtn')) {
            manageTodos.removeTodos(id);
        } else if(e.target.classList.contains('editBtn')) {
            editFlag = true;
            editElement = manageTodos.getEditTodo(id);
            syncUI.formOverlay.classList.add('addNewItemsActive');
            todoTitleInput.value = editElement.title;
            todoDetailsInput.value = editElement.desc;
            todoDueDateInput.value = editElement.dueDate;
            selectedProjectInput.value = editElement.project;
            const priority = document.querySelector(`[data-priority=${editElement.priority}]`);
            priority.classList.add('priority-active');
        }
    })
})()




// There needs to be a logic to delete projects if they have 0 todos in them or display message remove project in that case