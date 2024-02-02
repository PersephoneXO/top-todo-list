//import css file
import './styles.css';

//import functions from external files
//import {createTodo,createProject,toggleCheck,isDeadlineToday,sortTodos,changePriority,addTodoToProject,todoManager} from './todos';
import {pageManager} from './pages-content';
import {domManager} from './todos-dom';
import {todoManager} from './todos';

//main DOM elements
const contentContainer=document.querySelector('.content');
const headerContainer=document.querySelector('.header-container');
const mainContainer=document.querySelector('.main-container');
//sidebar DOM elements
const homeTab=document.querySelector('#home-tab');
const tasksTab=document.querySelector('#tasks-tab');
const projectsTab=document.querySelector('#projects-tab');
//create task dialog DOM elements
const createTaskDialog=document.querySelector('#create-task-dialog');
const taskForm=document.querySelector('#task-form');
const cancelTaskDialog=document.querySelector('#cancel-create-task');
const submitTaskDialog=document.querySelector('#submit-button-task');
const existingProjectList=document.querySelector('#existing-projects-list');
//create project dialog DOM elements
const createProjectDialog=document.querySelector('#create-project-dialog');
const projectForm=document.querySelector('#project-form');
const cancelProjectDialog=document.querySelector('#cancel-create-project');
const submitProjectDialog=document.querySelector('#submit-button-project');
//edit task dialog DOM elements
const editTaskDialog=document.querySelector('.edit-task-dialog');
const editForm=document.querySelector('#edit-form')
const cancelEditButton=document.querySelector('#cancel-edit-button');
const deleteTaskButton=document.querySelector('#delete-todo-button');
const applyChangesButton=document.querySelector('#apply-changes-button');

//array that holds all projects and initializes the default project that contains every todo created
let allTodos=todoManager.createProject('All Todos');
let allProjects=[];


//test whether the storage has been previously populated
if(localStorage.getItem("alltodos")&&localStorage.getItem("allprojects")){
    allTodos=JSON.parse(localStorage.getItem("alltodos"));
    allProjects=JSON.parse(localStorage.getItem("allprojects"));


}else{
    //initialize allTodos and allProjects in localStorage
    localStorage.setItem("alltodos",JSON.stringify(allTodos));
    localStorage.setItem("allprojects",JSON.stringify(allProjects));
}



//run functions to create home page on page load
document.addEventListener('DOMContentLoaded',()=>{
    headerContainer.appendChild(pageManager.hpHeaderContent())
    domManager.addActiveClass('home');
    todoManager.changeCurrentProject('home');
    mainContainer.appendChild(pageManager.createHomeMainContainer());
    if(allProjects.length>0){
        let hpProjectContainer=document.querySelector('.hp-project-content');
        pageManager.populateProjectDoms(hpProjectContainer,allProjects);
    }
    return contentContainer;
});

//close project modal on button click
cancelProjectDialog.addEventListener('click',(e)=>{
    createProjectDialog.close();
    projectForm.reset();
});

//open project modal on button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.create-project-button');
    if(target){
        createProjectDialog.showModal();
    }
});

//close task modal on button click
cancelTaskDialog.addEventListener('click',(e)=>{
    createTaskDialog.close();
    taskForm.reset();
});

//open task modal on button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.create-task-button');
    if(target){
        existingProjectList.innerHTML="";
        domManager.populateExistingProjectsChoice(allProjects,existingProjectList);
        createTaskDialog.showModal();
    }
});

//successfully creates and adds project
submitProjectDialog.addEventListener('click',(e)=>{
            e.preventDefault();
            let projectName=document.querySelector('#project-title').value;
            if(projectName.length<1){
                alert('Please fill out all fields');
            }else{
                allProjects.push(todoManager.createProject(projectName));
                //localStorage Implementation
                localStorage.setItem("allprojects",JSON.stringify(allProjects));

                if(todoManager.getCurrentProject()=='allProjects'){
                    pageManager.updateNumOfProjects(allProjects);
                    mainContainer.innerHTML="";
                    mainContainer.appendChild(pageManager.createProjectsMainContainer(allProjects));
                }

                if(todoManager.getCurrentProject()=='home'){
                    let hpProjectContainer=document.querySelector('.hp-project-content');
                    hpProjectContainer.innerHTML="";
                    pageManager.populateProjectDoms(hpProjectContainer,allProjects);
                }

                createProjectDialog.close();
                projectForm.reset();
                //console.log(allProjects);
            }

});

//successfully creates and adds todos
submitTaskDialog.addEventListener('click',(e)=>{
    e.preventDefault();
    let todoName=document.querySelector('#task-title').value;
    let todoDescription=document.querySelector('#task-description').value;
    let todoDeadline=document.querySelector('#deadline').value;
    let todoPriorityTest=document.querySelector('input[name="priority"]:checked');
    let getSelectedProject=document.querySelector('#existing-projects-list');
    let todoProject=getSelectedProject.options[getSelectedProject.selectedIndex].text;
    if(todoName.length<1||todoPriorityTest===null){
        alert('Please fill out all required fields');
    }
    else{
        let todoPriority=document.querySelector('input[name="priority"]:checked').value;
        let newTodo=todoManager.createTodo(todoName,todoDescription,todoDeadline,todoPriority);
        todoManager.addTodoToGlobal(newTodo,allTodos);
        //localStorage Implementation
        localStorage.setItem("alltodos",JSON.stringify(allTodos));

        if(todoProject!='No'){
            let currentProject;
            for(let thisProject of allProjects){
                if(thisProject.title===todoProject){
                    currentProject=thisProject;
                    todoManager.addTodoToProject(newTodo,thisProject);
                    //localStorage Implementation
                    localStorage.setItem("allprojects",JSON.stringify(allProjects));
                }
            }
            let projectTitle=document.querySelector('.header-title').textContent;
            if(projectTitle==currentProject.title){
                pageManager.updateNumOfTasks(currentProject);
                mainContainer.innerHTML="";
                pageManager.createSpecificProjectPageMain(currentProject,mainContainer);
            }
        }
    }
    //console.log(allProjects);
    //console.log(allTodos);
    if(todoManager.getCurrentProject()=='tasks'){
        pageManager.updateNumOfTasks(allTodos);
        mainContainer.innerHTML="";
        mainContainer.appendChild(pageManager.createTasksMainContainer(allTodos));
    }


    createTaskDialog.close();
    taskForm.reset();
});

//run functions to create home page on "home" tab click
homeTab.addEventListener('click',(e)=>{
    mainContainer.innerHTML="";
    headerContainer.innerHTML="";
    headerContainer.appendChild(pageManager.hpHeaderContent())
    domManager.addActiveClass('home');
    mainContainer.appendChild(pageManager.createHomeMainContainer());
    if(allProjects.length>0){
        let hpProjectContainer=document.querySelector('.hp-project-content');
        pageManager.populateProjectDoms(hpProjectContainer,allProjects);
    }
    todoManager.changeCurrentProject('home');
    return contentContainer;
});

//run functions to create tasks page on "task" tab click
tasksTab.addEventListener('click',(e)=>{
    mainContainer.innerHTML="";
    headerContainer.innerHTML="";
    domManager.addActiveClass('tasks');
    headerContainer.appendChild(pageManager.tpHeaderContent(allTodos));
    mainContainer.appendChild(pageManager.createTasksMainContainer(allTodos));
    todoManager.changeCurrentProject('tasks');
    return contentContainer;
});

//run functions to create projects page on "projects" tab click
projectsTab.addEventListener('click',(e)=>{
    mainContainer.innerHTML="";
    headerContainer.innerHTML="";
    domManager.addActiveClass('projects');
    headerContainer.appendChild(pageManager.ppHeaderContent(allProjects));
    mainContainer.appendChild(pageManager.createProjectsMainContainer(allProjects));
    todoManager.changeCurrentProject('allProjects');
    return contentContainer;
});

//run functions to create and show all todos of a specific project on "view project" button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.view-project-button');
    if(target){
        let currentIdentifier=target.parentNode.id;
        let thisProject;
        allProjects.forEach(project=>{
            if (project.identifier==currentIdentifier){
                thisProject=project;
            }
        });
        mainContainer.innerHTML="";
        headerContainer.innerHTML="";
        todoManager.changeCurrentProject(currentIdentifier);
        pageManager.createSpecificProjectPageHeader(thisProject,headerContainer);
        pageManager.createSpecificProjectPageMain(thisProject,mainContainer);
        return mainContainer;

    }
});

//run functions to toggle the checkmark on a specific todo
mainContainer.addEventListener('click',(e)=>{

    if(e.target.classList.contains('checkbox-button')){

        let firstUpperContainer=e.target.parentNode;
        let currentIdentifier=firstUpperContainer.parentNode.id;
        let thisTodo;
        allTodos.allTodos.forEach(todo=>{
            if(todo.identifier==currentIdentifier){
                thisTodo=todo;
                todoManager.toggleCheck(todo);
                //localStorage Implementation
                localStorage.setItem("alltodos",JSON.stringify(allTodos));
                localStorage.setItem("allprojects",JSON.stringify(allProjects));

                //console.log(thisTodo);
            }
        });


        //if thisTodo is apart of a project AND we are currently on that page, rerender the todo list to apply changes
        if(thisTodo.projectName!==''){
            let thisProject=allProjects.find(project=>project.title===thisTodo.projectName);

            if(todoManager.getCurrentProject()==thisProject.identifier){
                mainContainer.innerHTML="";
                pageManager.createSpecificProjectPageMain(thisProject,mainContainer);
            }

        }


        if(todoManager.getCurrentProject()=='tasks'){
            mainContainer.innerHTML="";
            mainContainer.appendChild(pageManager.createTasksMainContainer(allTodos));
        }



        return mainContainer;
    }
});

//run functions to allow user to edit a specific todo on "details" button click
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('view-todo-button')){
        let currentIdentifier=e.target.parentNode.id;
        let thisTodo;
        allTodos.allTodos.forEach(todo=>{
            if(todo.identifier==currentIdentifier){
                thisTodo=todo;
            }
        });
        domManager.editTodoDialogDetails(thisTodo,editTaskDialog);
        editTaskDialog.showModal();
    }
});

//run functions to close the edit modal on click
cancelEditButton.addEventListener('click',(e)=>{
    editTaskDialog.close();
    editForm.reset();
});

//run functions to apply the changes from the edit dialog
applyChangesButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let currentIdentifier=editTaskDialog.id;
    let thisTodo;
    allTodos.allTodos.forEach(todo=>{
        if(todo.identifier==currentIdentifier){
            thisTodo=todo;
        }
    });

    thisTodo.title=document.querySelector('#edit-title').value;
    thisTodo.description=document.querySelector('#edit-description').value;
    thisTodo.deadline=document.querySelector('#edit-deadline').value;
    thisTodo.priority=document.querySelector('input[name="priority"]:checked').value;

    //localStorage Implementation
    localStorage.setItem("alltodos",JSON.stringify(allTodos));
    localStorage.setItem("allprojects",JSON.stringify(allProjects));


    editTaskDialog.close();

    if(todoManager.getCurrentProject()=='tasks'){
        mainContainer.innerHTML="";
        mainContainer.appendChild(pageManager.createTasksMainContainer(allTodos));

    }else{
        if(todoManager.getCurrentProject()!='home'||todoManager.getCurrentProject()!='projects'){
            let currentIdentifier=todoManager.getCurrentProject();
            let thisProject=allProjects.find(project=>project.identifier===currentIdentifier);
            mainContainer.innerHTML="";
            pageManager.createSpecificProjectPageMain(thisProject,mainContainer);

        }
    }

});

//run functions to delete a todo on button click
deleteTaskButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let currentIdentifier=editTaskDialog.id;

    //find the index of the todo from the allTodos array
    let todoIndex=allTodos.allTodos.findIndex(todo=>todo.identifier===currentIdentifier);

    //if not -1, remove the todo from the array
    if(todoIndex!==-1){
        let thisTodo=allTodos.allTodos.find(todo=>todo.identifier===currentIdentifier);

        //if the todo is apart of a project, remove it from there too
        let thisProject=allProjects.find(project=>project.title===thisTodo.projectName);
        if(thisProject){
            let projectTodoIndex=thisProject.allTodos.findIndex(todo=>todo.identifier===currentIdentifier);
            if(projectTodoIndex!==-1){
                thisProject.allTodos.splice(projectTodoIndex,1);
            }
        }
        allTodos.allTodos.splice(todoIndex,1);
        //localStorage Implementation
        localStorage.setItem("alltodos",JSON.stringify(allTodos));
        localStorage.setItem("allprojects",JSON.stringify(allProjects));
    }

    //update the ui accordingly
    if(todoManager.getCurrentProject()=='tasks'){
        mainContainer.innerHTML="";
        pageManager.updateNumOfTasks(allTodos);
        mainContainer.appendChild(pageManager.createTasksMainContainer(allTodos));
    } else{
        if(todoManager.getCurrentProject()!='home'||todoManager.getCurrentProject()!='projects'){
            let currentProjectIdentifier=todoManager.getCurrentProject();
            let currentProject=allProjects.find(project=>project.identifier===currentProjectIdentifier);
            mainContainer.innerHTML="";
            pageManager.updateNumOfTasks(currentProject);
            pageManager.createSpecificProjectPageMain(currentProject,mainContainer);

        }
    }

    editTaskDialog.close();
    //console.log(allTodos.allTodos);
    //console.log(allProjects);

});
