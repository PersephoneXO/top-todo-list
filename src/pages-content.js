import { domManager } from "./todos-dom";

//function to create divs
//I should've made this earlier but I only thought of it halfway through createMainContainer
function createDom(type,className){
    let created=document.createElement(type);
    created.classList.add(className);
    return created;
}



export const pageManager=(function(){
    //function to create the content for the header on the home page
    function hpHeaderContent(){
        //create welcome container
        let welcomeContainer=document.createElement('div');
        welcomeContainer.classList.add('welcome-container');

        //create welcome content
        let headerTitle=document.createElement('p');
        headerTitle.classList.add('header-title');
        headerTitle.textContent='Welcome to TaskMaster!';
        welcomeContainer.appendChild(headerTitle);

        let headerSubtitle=document.createElement('p');
        headerSubtitle.classList.add('header-subtitle');
        headerSubtitle.textContent='Here is your agenda for today';
        welcomeContainer.appendChild(headerSubtitle);

        //append welcome container to header container

        return welcomeContainer;
    }

    //function to create main container content on the home page
    function createHomeMainContainer(){


        //create home page main container
        let hpMainContainer=createDom('div','hp-main-container');

        //create home page today container
        let hpTodayContainer=createDom('div','hp-today-container');
        let hpTodayHeader=createDom('div','hp-today-header');
        let hpTodayTitle=createDom('p','hp-container-titles');
        hpTodayTitle.textContent='Due Today';
        let addTaskButton=createDom('button','create-task-button');
        addTaskButton.textContent='Add Task';

        let hpTodayContent=createDom('div','hp-today-content');

        hpTodayHeader.appendChild(hpTodayTitle);
        hpTodayHeader.appendChild(addTaskButton);
        hpTodayContainer.appendChild(hpTodayHeader);
        hpTodayContainer.appendChild(hpTodayContent);

        //create home page projects container
        let hpProjectContainer=createDom('div','hp-project-container');
        let hpProjectHeader=createDom('div','hp-project-header');
        let hpProjectTitle=createDom('p','hp-container-titles');
        hpProjectTitle.textContent='Projects';
        let addProjectButton=createDom('button','create-project-button');
        addProjectButton.textContent='Add Project';

        let hpProjectContent=createDom('div','hp-project-content');

        hpProjectHeader.appendChild(hpProjectTitle);
        hpProjectHeader.appendChild(addProjectButton);
        hpProjectContainer.appendChild(hpProjectHeader);
        hpProjectContainer.appendChild(hpProjectContent);

        //append both containers to the home page main container
        hpMainContainer.appendChild(hpTodayContainer);
        hpMainContainer.appendChild(hpProjectContainer);

        return hpMainContainer;
    }

    //function to create the content for the header on the task page
    function tpHeaderContent(allTodos){
        let headerContent=createDom('div','header-content');

        let headerTitle=createDom('p','header-title');
        headerTitle.textContent="Tasks";
        headerContent.appendChild(headerTitle);

        let hSubtitleContainer=createDom('div','header-subtitle-button-container');

        let headerSubtitle=createDom('p','header-subtitle');
        let numOfTasks=allTodos.allTodos.length;
        headerSubtitle.textContent=`${numOfTasks} Tasks`;
        hSubtitleContainer.appendChild(headerSubtitle);

        let addTaskButton=createDom('button','create-task-button');
        addTaskButton.textContent='Add Task';
        hSubtitleContainer.appendChild(addTaskButton);
        headerContent.appendChild(hSubtitleContainer);

        return headerContent;
    }

    //function to update the num of tasks if a task is added on the task page
    function updateNumOfTasks(allTodos){
        let headerSubtitle=document.querySelector('.header-subtitle');
        headerSubtitle.textContent="";
        let numOfTasks=allTodos.allTodos.length;
        headerSubtitle.textContent=`${numOfTasks} Tasks`;
        return headerSubtitle;
    }

    //function to create the main container content on the task page
    function createTasksMainContainer(allTodos){
        let tpMainContainer=createDom('div','tp-main-container');

        populateTodoDoms(tpMainContainer,allTodos.allTodos);

        return tpMainContainer;
    }

    //function to create the content for the header on the projects page
    function ppHeaderContent(allProjects){
        let headerContent=createDom('div','header-content');

        let headerTitle=createDom('p','header-title');
        headerTitle.textContent="Projects";
        headerContent.appendChild(headerTitle);

        let hSubtitleContainer=createDom('div','header-subtitle-button-container');

        let headerSubtitle=createDom('p','header-subtitle');
        let numOfProjects=allProjects.length;
        headerSubtitle.textContent=`${numOfProjects} Projects`;
        hSubtitleContainer.appendChild(headerSubtitle);

        let addProjectButton=createDom('button','create-project-button');
        addProjectButton.textContent='Add Project';
        hSubtitleContainer.appendChild(addProjectButton);
        headerContent.appendChild(hSubtitleContainer);

        return headerContent;
    }

    //function to update the num of projects of a project is added on the projects page
    function updateNumOfProjects(allProjects){
        let headerSubtitle=document.querySelector('.header-subtitle');
        let numOfProjects=allProjects.length;
        headerSubtitle.textContent=`${numOfProjects} Projects`;
        return headerSubtitle;
    }

    //function to create the main container content on the project page
    function createProjectsMainContainer(allProjects){
        let ppMainContainer=createDom('div','pp-main-container');

        populateProjectDoms(ppMainContainer,allProjects);

        return ppMainContainer;
    }

    //function to populate a specified div with all project doms
    function populateProjectDoms(specifiedDiv, allProjects){
        allProjects.forEach(project=>{
            specifiedDiv.appendChild(domManager.projectDomElement(project));
        });
        return specifiedDiv;
    }

    //function to populate a specified div with all todo doms
    function populateTodoDoms(specifiedDiv, allTodos){
        allTodos.forEach(todo=>{
            specifiedDiv.appendChild(domManager.todoDomElement(todo));
        });
        return specifiedDiv;
    }



    return{
        hpHeaderContent,
        createHomeMainContainer,
        tpHeaderContent,
        ppHeaderContent,
        updateNumOfTasks,
        updateNumOfProjects,
        createProjectsMainContainer,
        populateProjectDoms,
        populateTodoDoms,
        createTasksMainContainer
    }
})();
