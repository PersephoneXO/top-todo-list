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

    return{
        hpHeaderContent,
        createHomeMainContainer
    }
})();
