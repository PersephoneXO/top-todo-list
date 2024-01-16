//import css file
//import './styles.css';

//import functions from external files
import {createTodo,createProject,toggleCheck,isDeadlineToday,sortTodos,changePriority,addTodoToProject,todoManager} from './todos';
import {hpHeaderContent,createHomeMainContainer} from './home-page';
import {domManager} from './todos-dom';


//DOM elements
const contentContainer=document.querySelector('.content');
const headerContainer=document.querySelector('.header-container');
const mainContainer=document.querySelector('.main-container');

//array that holds all projects and initializes the default project that contains every todo created
/*let allTodos=createProject('All Todos');
let allProjects=[];*/


//run functions to create home page on page load
document.addEventListener('DOMContentLoaded',()=>{
    headerContainer.appendChild(hpHeaderContent())
    domManager.addActiveClass('home');
    mainContainer.appendChild(createHomeMainContainer());
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
