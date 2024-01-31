//function to create dom elements
function createDom(type,className){
    let created=document.createElement(type);
    created.classList.add(className);
    return created;
}
//function to create form labels
function createLabel(forName,text){
    let label=document.createElement('label');
    label.setAttribute('for',forName);
    label.textContent=text;
    return label;
}
//function to create form inputs
function createFormInput(type,name,id,value){
    let input=document.createElement('input');
    input.setAttribute('type',type);
    input.setAttribute('name',name);
    input.id=id;
    input.setAttribute('value',value);
    input.required=true;
    return input;
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

    function editTodoDetails(thisTodo){
        let dialog=createDom('dialog','edit-task-dialog');
        let inputContainer=createDom('div','input-container');
        let form=document.createElement('form');
        form.setAttribute('method','post');
        form.id='edit-form';
        //cancel edit button
        let cancelButton=createDom('button','cancel-button');
        cancelButton.setAttribute('formmethod','dialog');
        cancelButton.id='cancel-edit-button';
        cancelButton.formnovalidate=true;
        cancelButton.textContent='x';
        form.appendChild(cancelButton);
        //title edit
        let titleDiv=createDom('div','edit-title-input');
        titleDiv.appendChild(createLabel('edit-title','Task Name*: '));
        titleDiv.appendChild(createFormInput('text','task-title','edit-title',thisTodo.title));
        form.appendChild(titleDiv);
        //description edit
        let descriptionDiv=createDom('div','edit-description-input');
        descriptionDiv.appendChild(createLabel('edit-description','Task Description: '));
        let editDescription=createFormInput('text','task-description','edit-description',thisTodo.description);
        editDescription.required=false;
        descriptionDiv.appendChild(editDescription);
        form.appendChild(descriptionDiv);
        //deadline edit
        let deadlineDiv=createDom('div','edit-deadline-input');
        deadlineDiv.appendChild(createLabel('edit-deadline','Deadline*: '));
        deadlineDiv.appendChild(createFormInput('date','deadline','edit-deadline',thisTodo.deadline));
        form.appendChild(deadlineDiv);
        //priority edit
        let priorityContainer=createDom('div','edit-priority-input');
        let containerTitle=document.createElement('p');
        containerTitle.textContent='Task Priority: ';
        priorityContainer.appendChild(containerTitle);
        //high priority
        let highContainer=createDom('div','high-container');
        highContainer.appendChild(createLabel('high','High'));
        let highInput=createFormInput('radio','priority','high','high');
        if(thisTodo.priority=='high'){
            highInput.checked=true;
        }
        highContainer.appendChild(highInput);
        priorityContainer.appendChild(highContainer);
        //medium priority
        let mediumContainer=createDom('div','medium-container');
        mediumContainer.appendChild(createLabel('medium','Medium'));
        let mediumInput=createFormInput('radio','priority','medium','medium');
        if(thisTodo.priority=='medium'){
            mediumInput.checked=true;
        }
        mediumContainer.appendChild(mediumInput);
        priorityContainer.appendChild(mediumContainer);
        //low priority
        let lowContainer=createDom('div','low-container');
        lowContainer.appendChild(createLabel('low','Low'));
        let lowInput=createFormInput('radio','priority','low','low');
        if(thisTodo.priority=='low'){
            lowInput.checked=true;
        }
        lowContainer.appendChild(lowInput);
        priorityContainer.appendChild(lowContainer);
        form.appendChild(priorityContainer);
        //delete task button
        let deleteButton=createDom('button','delete-button');
        deleteButton.setAttribute('type','submit');
        deleteButton.setAttribute('value','delete');
        deleteButton.setAttribute('formmethod','post');
        deleteButton.id='delete-todo-button';
        deleteButton.textContent='Delete Task?';
        form.appendChild(deleteButton);
        //apply changes button
        let applyChangesButton=createDom('button','apply-changes-button');
        applyChangesButton.setAttribute('type','submit');
        applyChangesButton.setAttribute('value','apply-changes');
        applyChangesButton.setAttribute('formmethod','post');
        applyChangesButton.id='apply-changes-task';
        applyChangesButton.textContent='Apply Changes'
        form.appendChild(applyChangesButton);
        //
        inputContainer.appendChild(form);
        dialog.appendChild(inputContainer);
        return dialog;
    }

    return{
        addActiveClass,
        populateExistingProjectsChoice,
        projectDomElement,
        todoDomElement,
        editTodoDetails
    };
})();
