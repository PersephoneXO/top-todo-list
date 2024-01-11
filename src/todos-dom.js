//function to create div
function createDom(type,className){
    let created=document.createElement(type);
    created.classList.add(className);
    return created;
}

//function to create a single line input for the form
function createSingleLineInput(divName,type,name,labelText){
    let div=createDom('div',divName);

    let label=document.createElement('label');
    label.setAttribute('for',name);
    label.textContent=labelText;
    div.appendChild(label);

    let input=document.createElement('input');
    input.setAttribute('type',type);
    input.classList.add('single-line-input');
    input.setAttribute('name',name);
    input.id=name;
    div.appendChild(input);
    return div;
}

//function to create radio buttons
function createRadioButtons(divName,name,id,labelText){
    let div=createDom('div',divName);

    let label=document.createElement('label');
    label.setAttribute('for',id);
    label.textContent=labelText;
    div.appendChild(label);

    let input=document.createElement('input');
    input.setAttribute('type','radio');
    input.classList.add('radio-inputs');
    input.setAttribute('name',name);
    input.id=id;
    div.appendChild(input);
    return div;
}

//create task dialog
const createTaskDialog=()=>{
    let dialog=document.createElement('dialog');
    dialog.id='create-task-dialog';
    let inputContainer=createDom('div','input-container');
    //create form
    let form=createDom('form','form-container');
    form.setAttribute('method','post');
    form.id='task-form';
    //create cancel button
    let cancelButton=createDom('button','cancel-button');
    cancelButton.setAttribute('formmethod','dialog');
    cancelButton.formNoValidate=true;
    cancelButton.textContent='x';
    form.appendChild(cancelButton);
    //task title input
    form.appendChild(createSingleLineInput('task-title-input','text','task-title','Task Name: '));
    //task description input
    form.appendChild(createSingleLineInput('task-description-input','text','task-description','Task Description: '));
    //task deadline input
    let deadlineInput=createDom('div','task-deadline-input');
    let label=document.createElement('label');
    label.setAttribute('for','deadline');
    label.textContent='Deadline: ';
    deadlineInput.appendChild(label);
    let input=document.createElement('input');
    input.setAttribute('type','date');
    input.classList.add('deadline-input');
    input.setAttribute('name','deadline');
    input.id='deadline';
    input.setAttribute('value','2024-01-10');
    deadlineInput.appendChild(input);
    form.appendChild(deadlineInput);
    //task priority input
    let radioContainer=createDom('div','radio-container');
    let radioLabel=createDom('p','radio-label');
    radioLabel.textContent='Task Priority: ';
    radioContainer.appendChild(radioLabel);
    radioContainer.appendChild(createRadioButtons('high-container','priority-choice','high','High'));
    radioContainer.appendChild(createRadioButtons('medium-container','priority-choice','medium','Medium'));
    radioContainer.appendChild(createRadioButtons('low-container','priority-choice','low','Low'));
    form.appendChild(radioContainer);
    //submit form and create project button
    let submitButton=createDom('button','submit-button');
    submitButton.setAttribute('type','submit');
    submitButton.setAttribute('value','submit');
    submitButton.setAttribute('formmethod','post');
    submitButton.id='submit-button-task';
    submitButton.textContent='Add Task';
    form.appendChild(submitButton);
    //append form to the input container
    inputContainer.appendChild(form);
    //append the input container to the dialog
    dialog.appendChild(inputContainer);

    return dialog;
};


//create project dialog
const createProjectDialog=()=>{
    let dialog=document.createElement('dialog');
    dialog.id='create-project-dialog';
    let inputContainer=createDom('div','input-container');
    //create form
    let form=createDom('form','form-container');
    form.setAttribute('method','post');
    form.id='project-form';
    //create cancel button
    let cancelButton=createDom('button','cancel-button');
    cancelButton.setAttribute('formmethod','dialog');
    cancelButton.formNoValidate=true;
    cancelButton.textContent='x';
    form.appendChild(cancelButton);
    //project title input
    form.appendChild(createSingleLineInput('project-title-input','text','project-title','Project Name: '));
    //submit form and create project button
    let submitButton=createDom('button','submit-button');
    submitButton.setAttribute('type','submit');
    submitButton.setAttribute('value','submit');
    submitButton.setAttribute('formmethod','post');
    submitButton.id='submit-button-project';
    submitButton.textContent='Add Project';
    form.appendChild(submitButton);
    //append form to the input container
    inputContainer.appendChild(form);
    //append the input container to the dialog
    dialog.appendChild(inputContainer);

    return dialog;
};


export{createProjectDialog,createTaskDialog};
