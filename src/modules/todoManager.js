export const manageTodos = (() => {
    const todos = {
        "home": [],
        "gym": []
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
       todos.home.push(newTodo);
    }
    //We need to create one big array of all todos in obj, which we will use to display all and to sort by date
    const displayTodos = (arr) => {
        //Maybe by default it should take all keys in todos and spread it into one big array [...todo.keys[]]
        console.log('display todos');
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