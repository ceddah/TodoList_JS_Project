export const manageTodos = (() => {
    let todos = [
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
    ]

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
       todos.push(newTodo);
    }

    //Every Time display is called we should display quantity of items in count element
    const displayTodos = (arr = todos) => {
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

        const titles = document.querySelectorAll('.nav-ul .title');
        titles.forEach(title => {
            const checkFor = title.dataset.id;
            const spanEl = title.nextElementSibling;
            const spanCount = todos.filter(todo => todo.project == checkFor).length;
            switch(checkFor) {
                case 'home':
                    todos.length > 0 ? spanEl.classList.add('countVisible') : spanEl.classList.remove('countVisible');
                    spanEl.textContent = todos.length;
                    break;
                default: 
                    spanCount > 0 ? spanEl.classList.add('countVisible') : spanEl.classList.remove('countVisible');
                    spanEl.textContent = spanCount;
                    break;
            }
        })
    }

    const getTodo = (id) => {
        const Todo = todos.filter(todo => todo.id === Number(id))[0];
        return Todo;
    }

    const editTodos = (...inputs) => {
        const id = inputs[5];
        const toEditElem = todos.filter(todo => todo.id === Number(id))[0];
        toEditElem.title = inputs[0];
        toEditElem.desc = inputs[1];
        toEditElem.dueDate = inputs[2];
        toEditElem.priority = inputs[3];
        toEditElem.project = inputs[4];
        displayTodos();
    }

    const removeTodos = (id) => {
        todos = todos.filter(todo => todo.id !== Number(id));
        displayTodos();
        console.log(todos);
    } 

    const createNewProject = () => {
        //Append new key to todos obj e.g. "Furniture: []"
        console.log('furnitute')
    }
    //remove todos from return when we finish
    return { setTodos, displayTodos, editTodos, removeTodos, getTodo, todos }
})()