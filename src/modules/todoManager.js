export const manageTodos = (() => {
    const todos = {
        "home": [{
            title: 'Learn React',
            desc: '',
            dueDate: '25-06-2021',
            priority: 'medium',
            project: 'home',
            id: 23121313112,
            finished: false
        }],
        "gym": [],
        "study": [],
        "work": [],
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
       const project = inputs[4];
       if(project !== 'home') {
        todos.home.push(newTodo);
       }
       todos[project].push(newTodo);
    }

    const displayTodos = (arr = 'home') => {
        //Maybe by default it should take all keys in todos and spread it into one big array [...todo.keys[]]
        const todoListUL = document.getElementById('todo-list');
        todoListUL.innerHTML = '';
        todoListUL.innerHTML = todos[arr].map(todo => {
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

    const editTodos = () => {
        console.log('edit todos');
    }

    const removeTodos = (id) => {
        console.log(id);
    } 

    const createNewProject = () => {
        //Append new key to todos obj e.g. "Furniture: []"
        console.log('furnitute')
    }
    //remove todos from return when we finish
    return { setTodos, displayTodos, editTodos, removeTodos, todos }
})()