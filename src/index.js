//import css file
//import './styles.css';

//import functions from external files
import {createTodo,createProject,toggleCheck,isDeadlineToday,sortTodos,changePriority,addTodoToProject} from './todos';
import {createSidebar,addActiveClass,createHeader,createMainContainer} from './home-page';
import {createProjectDialog,createTaskDialog} from './todos-dom';

//DOM elements
const contentContainer=document.querySelector('.content');


//array that holds all projects and initializes the default project that contains every todo created
let allTodos=createProject('All Todos');
let allProjects=[];


//run functions to create home page on page load
document.addEventListener('DOMContentLoaded',()=>{
    contentContainer.appendChild(createSidebar());
    addActiveClass('home');
    contentContainer.appendChild(createHeader());
    contentContainer.appendChild(createMainContainer());
    contentContainer.appendChild(createProjectDialog());
    contentContainer.appendChild(createTaskDialog());
    return contentContainer;
});

//close project modal on button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.cancel-button');
    if(target){
        let dialog=document.querySelector('#create-project-dialog');
        dialog.close();
    }
})

//open project modal on button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.create-project-button');
    if(target){
        let dialog=document.querySelector('#create-project-dialog');
        dialog.showModal();
    }
});

//open task modal on button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.create-task-button');
    if(target){
        let dialog=document.querySelector('#create-task-dialog');
        dialog.showModal();
    }
});

//successfully creates and adds project
document.addEventListener('click',(e)=>{
    const target=e.target.closest('#submit-button-project');
    if(target){
            e.preventDefault();
            let dialog=document.querySelector('#create-project-dialog');
            let form=document.querySelector('#project-form');
            let projectName=document.querySelector('#project-title').value;
            if(projectName.length<1){
                alert('Please fill out all fields');
            }else{
                allProjects.push(createProject(projectName));
                dialog.close();
                form.reset();
                console.log(allProjects)
            }
    }
});
