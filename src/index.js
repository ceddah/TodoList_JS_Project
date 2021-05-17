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

    titles.forEach(title => title.addEventListener('click', switchTabs));
    addButton.addEventListener('click', () => formOverlay.classList.add('addNewItemsActive'));
    closeFormOverlay.addEventListener('click', () => formOverlay.classList.remove('addNewItemsActive'));
})();

const Controller = (() => {
    let editFlag = false;
    let editElement = undefined;

    const newTodoForm = document.querySelector('.create_new_todo form');
    const todoTitleInput = document.querySelector('.create_new_todo_title');
    const todoDetailsInput = document.querySelector('.create_new_todo_details');
    const todoDueDateInput = document.getElementById('create_new_todo_dueDate');


    const addNewTodo = (e) => {
        e.preventDefault();
        const todoTitle = todoTitleInput.value;
        const todoDetails = todoDetailsInput.value;
        const todoDueDate =  todoDueDateInput.value;
        const priority = document.querySelector('.priority-active') ? document.querySelector('.priority-active').dataset.priority : 'low';
        const todoId = new Date().getTime();

        if(!editFlag)
        manageTodos.setTodos('learn react', 'by the next month', '25-06-2021', 'medium', '', 4123123212, true);
        console.log(manageTodos.todos);
    }

    newTodoForm.addEventListener('submit', addNewTodo);
})()




// There needs to be a logic to delete projects if they have 0 todos in them or display message remove project in that case
