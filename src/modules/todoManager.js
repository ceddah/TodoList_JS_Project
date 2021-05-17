export const manageTodos = (() => {
    const todos = {
        "home": [],
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
       todos.home.push(newTodo);
       todos[project].push(newTodo);
    }

    const displayTodos = (arr) => {
        //Maybe by default it should take all keys in todos and spread it into one big array [...todo.keys[]]
        console.log('display todos');
        const todoListUL = document.querySelector('.todo-list');
    }

    const editTodos = () => {
        console.log('edit todos');
    }

    const removeTodos = () => {
        console.log('remove todos');
    } 

    const createNewProject = () => {
        //Append new key to todos obj e.g. "Furniture: []"
        console.log('furnitute')
    }

    return { setTodos, todos }
})()