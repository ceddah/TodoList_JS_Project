export const manageTodos = (() => {
    let todoData = {
        "todos": [
            {
                title: 'Learn React',
                desc: '',
                dueDate: '2021-06-06',
                priority: 'medium',
                project: 'home',
                id: 23121313112,
                finished: false
            },
            {
                title: 'Practice on Exercism',
                desc: '',
                dueDate: '2021-12-06',
                priority: 'low',
                project: 'study',
                id: 23121313213,
                finished: false
            },
            {
                title: 'Finish Room Decorations',
                desc: '',
                dueDate: '2021-05-02',
                priority: 'high',
                project: 'work',
                id: 12381313112,
                finished: false
            }
        ],
        "projects": ['gym', 'study', 'work'],
        "notes": []
    }

    const TODO = (title, desc, dueDate, priority, project = 'home', id, finished = false ) => {
        return {title, 
                desc, 
                dueDate, 
                priority, 
                project, 
                id, 
                finished};
        }

    const setTodos = (...inputs) => {
       const newTodo = TODO(...inputs);
       todoData.todos.push(newTodo);
    }

    const updateTodoCount = () => {
        const titles = document.querySelectorAll('.nav-ul .title');
        titles.forEach(title => {
            const checkFor = title.dataset.id;
            const spanEl = title.nextElementSibling;
            const spanCount = todoData.todos.filter(todo => todo.project == checkFor).length;
            switch(checkFor) {
                case 'home':
                    todoData.todos.length > 0 ? spanEl.classList.add('countVisible') : spanEl.classList.remove('countVisible');
                    spanEl.textContent = todoData.todos.length;
                    break;
                default: 
                    spanCount > 0 ? spanEl.classList.add('countVisible') : spanEl.classList.remove('countVisible');
                    spanEl.textContent = spanCount;
                    break;
            }
        })
    }

    const displayByActiveTitle = () => {
        const titles = document.querySelectorAll('.nav-ul .title');
        let activeTitle;
        titles.forEach(title => {
            if(title.classList.contains('active')) {
                activeTitle = title;
            }
        })
        const projectName = activeTitle.dataset.id;

        const filteredTodosForTitle = todoData.todos.filter(todo => {
            if(projectName == 'home') {
                return todoData.todos;
            } else {
                return todo.project === projectName
            }
        });

        return filteredTodosForTitle;
    }

    const displayTodos = (arr = todoData.todos) => {
        const todoListUL = document.getElementById('todo-list');
        todoListUL.innerHTML = '';
        todoListUL.innerHTML = arr.map(todo => {
            return `
            <li class="todo priority-${todo.priority}" id="${todo.id}">
                <input type="checkbox" class="todoStatus" ${todo.finished === true ? 'checked' : ''}>
                <span class="todoTitle">${todo.title}</span>

                <button class="getDetails">Details</button>
                <span class="dueDate">${todo.dueDate}</span>
                <button class="editBtn"><i class="fas fa-edit"></i></button>
                <button class="removeBtn"><i class="fas fa-trash-alt"></i></button>
            </li>
            `
        }).join('');
        updateTodoCount();
        console.log(todoData);
    }

    const getTodo = (id) => {
        const Todo = todoData.todos.filter(todo => todo.id === Number(id))[0];
        return Todo;
    }

    const getAllTodos = () => {
        return todoData.todos;
    }

    const editTodos = (...inputs) => {
        const id = inputs[5];
        const toEditElem = todoData.todos.filter(todo => todo.id === Number(id))[0];
        toEditElem.title = inputs[0];
        toEditElem.desc = inputs[1];
        toEditElem.dueDate = inputs[2];
        toEditElem.priority = inputs[3];
        toEditElem.project = inputs[4];
        displayTodos(displayByActiveTitle());
    }

    const removeTodos = (id) => {
        //Getting project name of todo we are about to delete.
        const deletedTodosProject = todoData.todos.filter(todo => {
            if(todo.id == Number(id)) {
                return todo;
            }
        })[0].project;

        todoData.todos = todoData.todos.filter(todo => todo.id !== Number(id));
        displayTodos(displayByActiveTitle());
        
        //Deleting whole project if it's empty.
        const checkIfEmpty = todoData.todos.filter(todo => todo.project == deletedTodosProject).length;
        if(todoData.projects.includes(deletedTodosProject)) {
            if(checkIfEmpty == 0) {
                const idx = todoData.projects.indexOf(deletedTodosProject);
                todoData.projects.splice(idx, 1);
                displayProjects();
            }
        }
    } 

    // Managing Projects
    const getProjects = () => {
        return todoData.projects;
    }

    const displayProjects = () => {
        const projectsUl = document.querySelector('.projects-ul');
        projectsUl.innerHTML = '';
        projectsUl.innerHTML = todoData.projects.map(project => {
            return `<li><span class="title" data-id="${project}">/${project.charAt(0).toUpperCase() + project.slice(1)}/</span> <span class="count">0</span></li>`
        }).join('');
    }

    const setNewProject = (title) => {
        const projectsUl = document.querySelector('.projects-ul');
        todoData.projects.push(title);
        displayProjects(projectsUl);
        updateTodoCount();
    }

    //remove todos from return when we finish
    return { setTodos, 
            displayTodos, 
            editTodos, 
            removeTodos, 
            getTodo, 
            todoData, 
            getAllTodos, 
            displayByActiveTitle,
            getProjects,
            setNewProject,
            displayProjects }
})()