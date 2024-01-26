//import css file
//import './styles.css';

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




//array that holds all projects and initializes the default project that contains every todo created
let allTodos=todoManager.createProject('All Todos');
let allProjects=[];


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
        alert('Please fill out all fields');
    }
    else{
        let todoPriority=document.querySelector('input[name="priority"]:checked').value;
        let newTodo=todoManager.createTodo(todoName,todoDescription,todoDeadline,todoPriority);
        todoManager.addTodoToGlobal(newTodo,allTodos);

        if(todoProject!='No'){
            for(let thisProject of allProjects){
                if(thisProject.title===todoProject){
                    todoManager.addTodoToProject(newTodo,thisProject);
                }
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

    }
});
