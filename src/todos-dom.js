//function to create div
function createDom(type,className){
    let created=document.createElement(type);
    created.classList.add(className);
    return created;
}

//function to create a single line input for the form
function createSingleLineInput(type,name,labelText){
    let label=document.createElement('label');
    label.setAttribute('for',name);
    label.textContent=labelText;

    let input=document.createElement('input');
    input.setAttribute('type',type);
    input.classList.add('single-line-input');
    input.setAttribute('name',name);
    return label,input;
}


//create project dialog
const createProjectDialog=()=>{
    let dialog=document.createElement('dialog');
    dialog.id='create-project-dialog';
    let inputContainer=createDom('div','input-container');
    //create form
    let form=createDom('form','form-container');
    form.setAttribute('method','post');
    //create cancel button
    let cancelButton=createDom('button','cancel-button');
    cancelButton.setAttribute('formmethod','dialog');
    cancelButton.formNoValidate=true;
    cancelButton.textContent='x';
    form.appendChild(cancelButton);
    //project title input
    let titleInputContainer=createDom('div','project-title-input');
    titleInputContainer.appendChild(createSingleLineInput('text','project-title','Project Name:'));
    form.appendChild(titleInputContainer);
    //submit form and create project button
    let submitButton=createDom('button','submit-button');
    submitButton.setAttribute('type','submit');
    submitButton.setAttribute('value','submit');
    submitButton.setAttribute('formmethod','post');
    submitButton.textContent='Add Project';
    form.appendChild(submitButton);
    //append form to the input container
    inputContainer.appendChild(form);
    //append the input container to the dialog
    dialog.appendChild(inputContainer);

    return dialog;
};


export{createProjectDialog};
