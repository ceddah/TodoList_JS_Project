import './styles/style.css';
import { manageInputs } from './modules/manageAllInputs.js';
import { manageTodos } from './modules/todoManager.js';
console.log('webpack working.1235.');

//On Click, visual stuff.
const syncUI = (() => {
    const navUl = document.querySelector('.nav-ul');
    const addButton = document.querySelector('.addTodo');
    const formOverlay = document.querySelector('.addNewItems-overlay');
    const closeFormOverlay = document.querySelector('.close-newItemsInput');
    const closeDetailsOverlay = document.querySelector('.close-details');
    const formWrapper = document.querySelector('.form-wrapper');
    const projectsUl = document.querySelector('.projects-ul');

    //Displaying Project Tabs when we first load the page
    manageTodos.displayProjects();

    const switchTabs = (e) => {
        const titles = document.querySelectorAll('.nav-ul .title');
        if(e.target.classList.contains('title')) {
            titles.forEach(title => title.classList.remove('active'));
            e.target.classList.add('active');
            const data = e.target.dataset.id;
            const allTodos = manageTodos.getAllTodos();

            if(data == 'home') {
                manageTodos.displayTodos();
            } else if(data == 'today') {
                const now = new Date()
                const lessThen24H = allTodos.filter(todo => {
                    const dueDate = new Date(todo.dueDate);
                    if(dueDate > now) {
                        const diffTime = Math.abs(dueDate - now);
                        const differenceHours= Math.ceil(diffTime / (1000 * 60 * 60));
                        if(differenceHours <= 24) {
                            return todo;
                        }
                    }
                })
                manageTodos.displayTodos(lessThen24H);
            } else if(data == 'thisweek') {
                const now = new Date()
                const lessThenWeek = allTodos.filter(todo => {
                    const dueDate = new Date(todo.dueDate);
                    if(dueDate > now) {
                        const diffTime = Math.abs(dueDate - now);
                        const differenceDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if(differenceDays <= 7) {
                            return todo;
                        }
                    }
                })
                manageTodos.displayTodos(lessThenWeek);
            } else {
                let filteredTodos = allTodos.filter(todo => todo.project == data);
                manageTodos.displayTodos(filteredTodos);
            }
        }
    }

    //This func manage openning and closing input forms and their respective tabs/categories.
    manageInputs(formWrapper);
    
    //Displaying todos when we first load the page
    manageTodos.displayTodos();

    navUl.addEventListener('click', switchTabs);
    addButton.addEventListener('click', () => formOverlay.classList.add('addNewItemsActive'));
    closeFormOverlay.addEventListener('click', () => formOverlay.classList.remove('addNewItemsActive'));
    closeDetailsOverlay.addEventListener('click', () => document.querySelector('.details-overlay').classList.remove('details-active'));
    return { formOverlay, closeFormOverlay }
})();

//Controlling the UI
const Controller = (() => {
    let editFlag = false;
    let editElement = undefined;
    let currentActiveTitle = undefined;

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

    const updateProjectOptions = () => {
        const projects = manageTodos.getProjects();
        const allOptions = projects.reduce((total, item) => {
            if(!total.includes(item)) {
                total.push(item);
            }
            return total;
        }, ['home']);

        selectedProjectInput.innerHTML = '';
        selectedProjectInput.innerHTML = allOptions.map(project => {
            return `
                <option value="${project}">${project == 'home' ? 'None' : project}</option>
            `
        }).join('');
    }

    const addNewProject = (e) => {
        e.preventDefault();
        const newProjectTitle = newProjectTitleInput.value;
        manageTodos.setNewProject(newProjectTitle);
        newProjectTitleInput.value = '';
        updateProjectOptions();
        //We need to set new active title because we are recreateing all Tabs and title loses active class
        const projectsUl = document.querySelector('.projects-ul');
        const newTitle = projectsUl.querySelector(`[data-id=${newProjectTitle}]`);
        newTitle.classList.add('active');
        manageTodos.displayTodos(manageTodos.displayByActiveTitle());
        
    }

    newTodoForm.addEventListener('submit', addNewTodo);
    syncUI.closeFormOverlay.addEventListener('click', resetAllInputs);
    newProjectForm.addEventListener('submit', addNewProject);

    //Listenening for Edit,Remove, Get Details Buttons
    todoListUL.addEventListener('click', (e) => {
        const id = e.target.parentElement.id;
        if(e.target.classList.contains('removeBtn')) {
            manageTodos.removeTodos(id);
            updateProjectOptions();
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
            manageTodos.displayTodos(manageTodos.displayByActiveTitle());
        }
    })

    return { resetAllInputs }
})()