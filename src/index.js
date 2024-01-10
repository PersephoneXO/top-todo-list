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
    return contentContainer;
});

//open project modal on button click
document.addEventListener('click',(e)=>{
    const target=e.target.closest('.create-project-button');
    if(target){
        let dialog=document.querySelector('#create-project-dialog');
        dialog.showModal();
    }
});
