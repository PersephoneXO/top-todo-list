//import css file
//import './styles.css';

//import functions from external files
import {createTodo,createProject,toggleCheck,isDeadlineToday,sortTodos,changePriority,addTodoToProject,allProjects,allTodos} from './todos';
import {createSidebar,addActiveClass,createHeader,createMainContainer} from './home-page';


//DOM elements
const contentContainer=document.querySelector('.content');



//run functions to create home page on page load
document.addEventListener('DOMContentLoaded',()=>{

    contentContainer.appendChild(createSidebar());
    addActiveClass('home');
    contentContainer.appendChild(createHeader());
    contentContainer.appendChild(createMainContainer());
    return contentContainer;
});
