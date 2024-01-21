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
        projectDiv.appendChild(viewProjectButton);

        return projectDiv;
    }

    return{
        addActiveClass,
        populateExistingProjectsChoice,
        projectDomElement
    };
})();
