//import css file
//import './styles.css';

//import functions from external files
import {createTodo,createProject,toggleCheck,isDeadlineToday,sortTodos,changePriority,addTodoToProject,allProjects,allTodos} from './todos';
import {createSidebar,addActiveClass,createHeader,createMainContainer} from './home-page';
import { createProjectDialog } from './todos-dom';

//DOM elements
const contentContainer=document.querySelector('.content');



//run functions to create home page on page load
document.addEventListener('DOMContentLoaded',()=>{

    contentContainer.appendChild(createSidebar());
    addActiveClass('home');
    contentContainer.appendChild(createHeader());
    contentContainer.appendChild(createMainContainer());
    contentContainer.appendChild(createProjectDialog());
    //return contentContainer;

    let openProjectModal=document.querySelector('.create-project-button');
    let projectDialog=document.querySelector('#create-project-dialog');
    //open project modal on button click
    openProjectModal.addEventListener('click',(e)=>{
        projectDialog.showModal();
    })
});
