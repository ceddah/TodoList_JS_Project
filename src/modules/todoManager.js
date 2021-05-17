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

    const displayTodos = (arr = todos) => {
        //Maybe by default it should take all keys in todos and spread it into one big array [...todo.keys[]]
        const todoListUL = document.getElementById('todo-list');
        todoListUL.innerHTML = '';
        todoListUL.innerHTML = arr.map(todo => {
            return `
            <li class="todo priority-${todo.priority}" id="${todo.id}">
                <input type="checkbox" id="todoStatus" ${todo.finished === true ? 'checked' : ''}>
                <span class="todoTitle">${todo.title}</span>

                <button class="getDetails">Details</button>
                <span class="dueDate">${todo.dueDate}</span>
                <button class="editBtn"><i class="fas fa-edit"></i></button>
                <button class="removeBtn"><i class="fas fa-trash-alt"></i></button>
            </li>
            `
        }).join('');
    }

    const getEditTodo = (id) => {
        const editTodo = todos.filter(todo => todo.id === Number(id))[0];
        return editTodo;
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
    } 

    const createNewProject = () => {
        //Append new key to todos obj e.g. "Furniture: []"
        console.log('furnitute')
    }
    //remove todos from return when we finish
    return { setTodos, displayTodos, editTodos, removeTodos, getEditTodo, todos }
})()