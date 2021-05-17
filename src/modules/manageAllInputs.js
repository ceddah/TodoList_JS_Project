export const manageInputs = (element) => {
    element.addEventListener('click', (e) => {
        //Sidebar Section
        if(e.target.classList.contains('sidebar-btn')) {
            const sidebarButtons = document.querySelectorAll('.sidebar-btn');
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const tabID = e.target.dataset.addnew;

            const allTabs = document.querySelectorAll('.all-inputs > div');
            allTabs.forEach(tab => tab.classList.remove('display-InputTab'));

            const tab = document.getElementById(tabID);
            tab.classList.add('display-InputTab');
        }
        //Create New Todo Priority Buttons
        else if(e.target.classList.contains('new_priorityBtn')) {
            const allPriorityBtns = document.querySelectorAll('.new_priorityBtn');
            allPriorityBtns.forEach(btn => btn.classList.remove('priority-active'));
            e.target.classList.add('priority-active');
        }

    })
}