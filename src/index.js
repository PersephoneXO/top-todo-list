//import css file
//import './styles.css';

//import functions from external files
//import {createTodo,createProject,toggleCheck,isDeadlineToday,sortTodos,changePriority,addTodoToProject,todoManager} from './todos';
import {hpHeaderContent,createHomeMainContainer} from './home-page';
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
    headerContainer.appendChild(hpHeaderContent())
    domManager.addActiveClass('home');
    mainContainer.appendChild(createHomeMainContainer());
    return contentContainer;
});

//close project modal on button click
cancelProjectDialog.addEventListener('click',(e)=>{
    createProjectDialog.close();
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
                createProjectDialog.close();
                projectForm.reset();
                //console.log(allProjects);
            }
});
