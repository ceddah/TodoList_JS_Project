import './styles/style.css';
import { manageInputs } from './modules/manageAllInputs.js';
import { manageTodos } from './modules/todoManager.js';
console.log('webpack working.1235.');

//On Click, visual stuff.
const syncUI = (() => {
    const titles = document.querySelectorAll('.nav-ul .title');
    const addButton = document.querySelector('.addTodo');
    const formOverlay = document.querySelector('.addNewItems-overlay');
    const closeFormOverlay = document.querySelector('.close-newItemsInput');
    const closeDetailsOverlay = document.querySelector('.close-details');
    const formWrapper = document.querySelector('.form-wrapper');

    const switchTabs = (e) => {
        titles.forEach(title => title.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const data = e.currentTarget.dataset.id;
        const allTodos = manageTodos.getAllTodos();
        let filteredTodos = allTodos.filter(todo => todo.project == data);

        if(data == 'home') {
            manageTodos.displayTodos();
        } else {
            manageTodos.displayTodos(filteredTodos);
        }
    }

    //This func managed openning and closing input forms and their respective tabs/categories.
    manageInputs(formWrapper);
    
    //Displaying todos when we first load the page
    manageTodos.displayTodos();

    //Maybe set timeout for this so we can load all tabs first...
    //Maybe set timeout for this so we can load all tabs first...
    //Maybe set timeout for this so we can load all tabs first...
    //OR even better put event listener on whole side UL and listen for class title
    titles.forEach(title => title.addEventListener('click', switchTabs));
    addButton.addEventListener('click', () => formOverlay.classList.add('addNewItemsActive'));
    closeFormOverlay.addEventListener('click', () => formOverlay.classList.remove('addNewItemsActive'));
    closeDetailsOverlay.addEventListener('click', () => document.querySelector('.details-overlay').classList.remove('details-active'));
    return { formOverlay, closeFormOverlay }
})();

const Controller = (() => {
    let editFlag = false;
    let editElement = undefined;

    const newTodoForm = document.querySelector('.create_new_todo form');
    const newProjectForm = document.querySelector('.create_new_project form');
    const todoTitleInput = document.querySelector('.create_new_todo_title');
    const todoDetailsInput = document.querySelector('.create_new_todo_details');
    const todoDueDateInput = document.getElementById('create_new_todo_dueDate');
    const selectedProjectInput = document.getElementById('selectedProject');
    const newProjectTitleInput = document.getElementById('create_new_project_title');
    const todoListUL = document.getElementById('todo-list');
    const detailsOverlay = document.querySelector('.details-overlay');
    const detailsEl = document.querySelector('.details-info');
    const submitTodoBtn = document.querySelector('.submit_new_todo');
    
    const resetAllInputs = () => {
        const allPriorityBtns = document.querySelectorAll('.new_priorityBtn');
        allPriorityBtns.forEach(btn => btn.classList.remove('priority-active'));
        todoTitleInput.value = '';
        todoDetailsInput.value = '';
        todoDueDateInput.value = '';
        selectedProjectInput.value = 'home';
        submitTodoBtn.textContent = 'Submit';
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
        //If no Params are passed it will display home/all by default.
        manageTodos.displayTodos(manageTodos.displayByActiveTitle());
        resetAllInputs();
        } else if(editFlag && todoTitle !== '' && todoDueDate !== '') {
            manageTodos.editTodos(todoTitle, todoDetails, todoDueDate, priority, forProject, editElement.id, false);
            editFlag = false;
            editElement = undefined;
            resetAllInputs();
        }
    }

    const addNewProject = (e) => {
        e.preventDefault();
        const newProjectTitle = newProjectTitleInput.value;
        manageTodos.setNewProject(newProjectTitle);
    }

    newTodoForm.addEventListener('submit', addNewTodo);
    syncUI.closeFormOverlay.addEventListener('click', resetAllInputs);
    newProjectForm.addEventListener('submit', addNewProject);

    //Listenening for Edit,Remove, Get Details Buttons
    todoListUL.addEventListener('click', (e) => {
        const id = e.target.parentElement.id;
        if(e.target.classList.contains('removeBtn')) {
            manageTodos.removeTodos(id);
        } else if(e.target.classList.contains('editBtn')) {
            editFlag = true;
            editElement = manageTodos.getTodo(id);
            syncUI.formOverlay.classList.add('addNewItemsActive');
            todoTitleInput.value = editElement.title;
            todoDetailsInput.value = editElement.desc;
            todoDueDateInput.value = editElement.dueDate;
            selectedProjectInput.value = editElement.project;
            const priority = document.querySelector(`[data-priority=${editElement.priority}]`);
            priority.classList.add('priority-active');
            submitTodoBtn.textContent = 'Edit ToDo';
        } else if(e.target.classList.contains('getDetails')) {
            detailsOverlay.classList.add('details-active');
            const getItem = manageTodos.getTodo(id);
            detailsEl.innerHTML = `
                <h4>${getItem.title}</h4>
                <ul>
                    <li>Project: ${getItem.project.charAt(0).toUpperCase() + getItem.project.slice(1)}</li>
                    <li>Priority: ${getItem.priority.charAt(0).toUpperCase() + getItem.priority.slice(1)}</li>
                    <li>Due Date: ${getItem.dueDate}</li>
                    <li>Details: ${getItem.desc}</li>
                </ul>
            `;
        } else if(e.target.classList.contains('todoStatus')) {
            const getItem = manageTodos.getTodo(id);
            getItem.finished = e.target.checked;
        }
    })

    return { resetAllInputs }
})()




// There needs to be a logic to delete projects if they have 0 todos in them or display message remove project in that case
