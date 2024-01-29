//function to create div
function createDom(type,className){
    let created=document.createElement(type);
    created.classList.add(className);
    return created;
}

export const domManager=(function (){
    //function to add active class to the current tab and remove active class from other tabs if it exists
    function addActiveClass(currentTab){
        let homeTab=document.querySelector('#home-tab');
        let tasksTab=document.querySelector('#tasks-tab');
        let projectsTab=document.querySelector('#projects-tab');

        //remove active if present
        homeTab.classList.remove('active-tab');
        tasksTab.classList.remove('active-tab');
        projectsTab.classList.remove('active-tab');

        switch(currentTab){
            case 'home':
                homeTab.classList.add('active-tab');
                break;
            case 'tasks':
                tasksTab.classList.add('active-tab');
                break;
            case 'projects':
                projectsTab.classList.add('active-tab');
                break;
        }
    }

    //populate the project choice array
    function populateExistingProjectsChoice(allProjects,inputField){
        let defaultOption=document.createElement('option');
        defaultOption.textContent='No';
        defaultOption.id="do-not-add";
        defaultOption.setAttribute('selected','selected');
        inputField.appendChild(defaultOption);

        allProjects.forEach(project=>{
            let option=document.createElement('option');
            option.textContent=project.title;
            inputField.appendChild(option);
        });
    }

    //function to create a project dom element
    function projectDomElement(thisProject){
        let projectDiv=createDom('div','dom-project-div');
        projectDiv.id=`${thisProject.identifier}`;
        let projectTitle=createDom('p','dom-project-title');
        projectTitle.textContent=`${thisProject.title}`;
        projectDiv.appendChild(projectTitle);

        let viewProjectButton=createDom('button','view-project-button');
        viewProjectButton.textContent='View Project';
        projectDiv.appendChild(viewProjectButton);

        let divDivider=createDom('hr','dom-divider');
        projectDiv.appendChild(divDivider);

        return projectDiv;
    }

    function todoDomElement(thisTodo){
        let todoDiv=createDom('div','dom-todo-div');
        todoDiv.id=`${thisTodo.identifier}`;
        todoDiv.classList.add(`${thisTodo.priority}`);

        let leftSide=createDom('div','dom-todo-left');
        let rightSide=createDom('div','dom-todo-right');

        let todoTitle=createDom('p','dom-todo-title');
        todoTitle.textContent=`${thisTodo.title}`;
        leftSide.appendChild(todoTitle);

        todoDiv.appendChild(leftSide);

        let todoDeadline=createDom('p','dom-todo-deadline');
        todoDeadline.textContent=`${thisTodo.deadline}`;
        todoDiv.appendChild(todoDeadline);

        //priority flag
        let priorityFlag=document.createElement('div');
        priorityFlag.innerHTML=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" /></svg>`;
        let thisPriority=thisTodo.priority;
        switch(thisPriority){
            case "high":
                priorityFlag.classList.add('priority-flag-high');
                break;
            case "medium":
                priorityFlag.classList.add('priority-flag-medium');
                break;
            case "low":
                priorityFlag.classList.add('priority-flag-low');
                break;
        }
        todoDiv.appendChild(priorityFlag);


        let viewTodoButton=createDom('button','view-todo-button');
        viewTodoButton.textContent='Details';
        todoDiv.appendChild(viewTodoButton);

        let todoCheckBox=createDom('input','checkbox-button');
        todoCheckBox.setAttribute('type','checkbox');
        todoCheckBox.setAttribute('name','checkbox');
        if(thisTodo.checkmark==true){
            todoCheckBox.checked=true;
            leftSide.querySelector('.dom-todo-title').classList.add('title-checked');
        }
        rightSide.appendChild(todoCheckBox);

        let todoCheckmark=createDom('span','checkmark');
        rightSide.appendChild(todoCheckmark);


        todoDiv.appendChild(rightSide);

        let divDivider=createDom('hr','dom-divider');
        todoDiv.appendChild(divDivider);

        return todoDiv;
    }

    return{
        addActiveClass,
        populateExistingProjectsChoice,
        projectDomElement,
        todoDomElement
    };
})();
