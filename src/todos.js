//module for creating and manipulating todo objects

//difference in days from date-fns
const { isToday, lightFormat, isEqual } = require("date-fns");

//data manager
export const todoManager=(function (){
    let todoID=0;
    let projectID=0;
    let currentProject='home';
    //let currentPage='home';
    //change the current project to a new project
    function changeCurrentProject(newProject){
        currentProject=newProject;
    }
    //return the current project
    function getCurrentProject(){
        return currentProject;
    }
    /*
    //change the current page to a new page
    function changeCurrentPage(newPage){
        currentPage=newPage;
    }
    //return the current page
    function getCurrentPage(){
        return currentPage;
    }*/

    //create a todo object
    const createTodo=(title,description,deadline,priority,projectName='')=>{
        //let todayDate=format(new Date(),"cccc LLLL d, yyyy");
        let checkmark=false;
        let formatedDeadline=lightFormat(deadline,'yyyy-MM-dd');
        let identifier=`t${todoID}`;
        todoID++;
        return {title,description,deadline,formatedDeadline,priority,checkmark,projectName,identifier};
    };

    //create a project object
    const createProject=(title,allTodos=[],sortedTodos=[])=>{
        let identifier=`p${projectID}`;
        projectID++;
        return {title,allTodos,sortedTodos,identifier};
    };

    //toggle checkmark
    function toggleCheck(todo){
        todo.checkmark=!todo.checkmark;
        return todo;
    };

    //check if deadline is today
    function isDeadlineToday(todo){
        return isToday(todo.deadline);
    };


    //sort by priority after being sorted by deadline
    function sortByPriority(sortedDateArr,project){

        for (let day of sortedDateArr){
            let highPriority=[];
            let mediumPriority=[];
            let lowPriority=[];
            for(let todo of day){
                let currentPriority=todo.priority;
                switch(currentPriority){
                    case 'high':
                        highPriority.push(todo);
                        break;
                    case 'medium':
                        mediumPriority.push(todo);
                        break;
                    case 'low':
                        lowPriority.push(todo);
                        break;
                }
            }
            let highToMedium=highPriority.concat(mediumPriority);
            let highToLow=highToMedium.concat(lowPriority);
            project.sortedTodos.push(highToLow);
        }
        return project;
    };

    //sort by deadline
    function sortByDate(project){
        let currentTodos=project.allTodos;
        currentTodos.sort(function compare(a,b){
            let dateA=new Date(a.deadline);
            let dateB=new Date(b.deadline);
            return dateA-dateB;
        });

        let separatedDatesArr=[];
        let checkTrigger=false;
        for (let todo of currentTodos){

            for(let i=0;i<separatedDatesArr.length;i++){
                if(isEqual(separatedDatesArr[i][0].deadline,todo.deadline)){
                    separatedDatesArr[i].push(todo);
                    checkTrigger=true;
                    break;
                }
            }
            if(checkTrigger==false){
                separatedDatesArr.push([todo]);

            }
            if(checkTrigger==true){
                checkTrigger=false;
            }
        }
        return separatedDatesArr;
    };

    //sort todos by both deadline and priority
    function sortTodos(project){
        project.sortedTodos=[];
        let byDate=sortByDate(project);
        sortByPriority(byDate,project);
        return project;
    };

    //change todo priority
    function changePriority(todo,newpriority){
        todo.priority=newpriority;
        return todo;
    }

    //add todo to a project
    function addTodoToProject(todo,chosenProject){
        todo.projectName=chosenProject.title;
        chosenProject.allTodos.push(todo);
        sortTodos(chosenProject);
        return chosenProject;
    }

    //add todo to the global project
    function addTodoToGlobal(newTodo,global){
        global.allTodos.push(newTodo);
        sortTodos(global);
        return global;

    }

    return{
        changeCurrentProject,
        getCurrentProject,
        createTodo,
        createProject,
        toggleCheck,
        isDeadlineToday,
        sortTodos,
        changePriority,
        addTodoToProject,
        addTodoToGlobal
    }

})();

//test conditions
/*
let joe=todoManager.createTodo('dentist','pull tooth',new Date(2024,0,4),'low');
let billy=todoManager.createTodo('doctor','medicine',new Date(2024,5,25),'high');
let luke=todoManager.createTodo('teacher','teach',new Date(2024,2,9),'medium');
let henry=todoManager.createTodo('agent','spy',new Date(2024,0,4),'high');
let project=todoManager.createProject('test',[joe,billy,luke,henry]);

//console.log(project);
todoManager.sortTodos(project);
console.log(project.sortedTodos);
*/
