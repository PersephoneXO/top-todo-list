//function to create sidebar
const createSidebar=()=>{
    let sidebarContainer=document.createElement('div');
    sidebarContainer.classList.add('sidebar');

    //create sidebar tabs
    let sidebarContent=document.createElement('div');
    sidebarContent.classList.add('sidebar-content');
    //home tab
    let homeTab=createSidebarTabs('Home','home-tab','<svg class="sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>');
    sidebarContent.appendChild(homeTab);
    //tasks tab
    let taskTab=createSidebarTabs('Tasks','tasks-tab','<svg class="sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-circle</title><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>');
    sidebarContent.appendChild(taskTab);
    //projects tab
    let projectsTab=createSidebarTabs('Projects','projects-tab','<svg class="sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-multiple</title><path d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z" /></svg>');
    sidebarContent.appendChild(projectsTab);

    //add sidebarContent to sidebar container
    sidebarContainer.appendChild(sidebarContent);
    return sidebarContainer;
}


//function to create sidebar tabs
function createSidebarTabs(page,id,svgCode){
    //create tab container
    let sidebarTab=document.createElement('div');
    sidebarTab.classList.add('sidebar-tab');
    sidebarTab.id=id;

    //add svg
    sidebarTab.innerHTML+=svgCode;

    //add tab title
    let sidebarTitle=document.createElement('p');
    sidebarTitle.classList.add('sidebar-name');
    sidebarTitle.textContent=page;
    sidebarTab.appendChild(sidebarTitle);

    return sidebarTab;
}


//function to add active class to the current tab and remove active class from other tabs if it exists
function addActiveClass(currentTab){
    let homeTab=document.querySelector('#home-tab');
    let tasksTab=document.querySelector('#tasks-tab');
    let projectsTab=document.querySelector('#projects-tab');

    //remove active if present
    homeTab.classList.remove('active-tab');
    tasksTab.classList.remove('active-tab');
    projectsTab.classList.remove('active-tab');

    switch(currentTab){
        case 'home':
            homeTab.classList.add('active-tab');
            break;
        case 'tasks':
            tasksTab.classList.add('active-tab');
            break;
        case 'projects':
            projectsTab.classList.add('active-tab');
            break;
    }
}

//function to create the header
const createHeader=()=>{
    let headerContainer=document.createElement('div');
    headerContainer.classList.add('header-container');

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
    headerContainer.appendChild(welcomeContainer);
    return headerContainer;
}

//function to create main container
const createMainContainer=()=>{
    let mainContainer=createDom('div','main-container');

    //create home page main container
    let hpMainContainer=createDom('div','hp-main-container');

    //create home page today container
    let hpTodayContainer=createDom('div','hp-today-container');
    let hpTodayContent=createDom('div','hp-today-content');
    let hpTodayTitle=createDom('p','hp-container-titles');
    hpTodayTitle.textContent='Due Today';
    hpTodayContent.appendChild(hpTodayTitle);
    hpTodayContainer.appendChild(hpTodayContent);

    //create home page projects container
    let hpProjectContainer=createDom('div','hp-project-container');
    let hpProjectContent=createDom('div','hp-project-content');
    let hpProjectTitle=createDom('p','hp-container-titles');
    hpProjectTitle.textContent='Projects';
    hpProjectContent.appendChild(hpProjectTitle);
    hpProjectContainer.appendChild(hpProjectContent);

    //append both containers to the home page main container
    hpMainContainer.appendChild(hpTodayContainer);
    hpMainContainer.appendChild(hpProjectContainer);
    //append home page container to the main overall container
    mainContainer.appendChild(hpMainContainer);
    return mainContainer;
}


//function to create divs
//I should've made this earlier but I only thought of it halfway through createMainContainer
function createDom(type,className){
    let created=document.createElement(type);
    created.classList.add(className);
    return created;
}





//export functions
export{createSidebar,addActiveClass,createHeader,createMainContainer};
