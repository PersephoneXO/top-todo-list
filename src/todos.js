//module for creating and manipulating todo objects

//difference in days from date-fns
const { differenceInDays,format,isToday, lightFormat } = require("date-fns");

//create a todo object
const createTodo=(title,description,deadline,priority,projectName)=>{
    //let todayDate=format(new Date(),"cccc LLLL d, yyyy");
    let checkmark=false;
    let formatedDeadline=lightFormat(deadline,'yyyy-MM-dd');
    return {title,description,deadline,formatedDeadline,priority,checkmark,projectName};
};

//create a project object
const createProject=(title,allTodos=[],todosByDate=[])=>{
    return {title,allTodos,todosByDate};
};

//toggle checkmark
function toggleCheck(todo){
    todo.checkmark=true;
    return todo;
};

//check if deadline is today
function isDeadlineToday(todo){
    return isToday(todo.deadline);
};
/*
//sort todos by priority
function sortByPriority(project){
    let highPriority=[];
    let mediumPriority=[];
    let lowPriority=[];

    for(let task of project.allTodos){
        let currentPriority=task.priority;
        switch(currentPriority){
            case 'high':
                highPriority.push(task);
                break;
            case 'medium':
                mediumPriority.push(task);
                break;
            case 'low':
                lowPriority.push(task);
                break;
        }
    }

    project..splice(0,project.allTodos.length);
    project.todos.push(highPriority);
    project.todos.push(mediumPriority);
    project.todos.push(lowPriority);
    return project;
};
*/
//sort by deadline
function sortByDate(project){
    let currentTodos=project.allTodos;
    currentTodos.sort(function compare(a,b){
        let dateA=new Date(a.deadline);
        let dateB=new Date(b.deadline);
        return dateA-dateB;
    });
    //project.todosByDate.push(currentTodos);

    for()

};



let joe=createTodo('dentist','pull tooth',new Date(2024,0,4),'low');
let billy=createTodo('doctor','medicine',new Date(2024,5,25),'high');
let luke=createTodo('teacher','teach',new Date(2024,2,9),'medium');
let project=createProject('test',[joe,billy,luke]);

//console.log(project);
sortByDate(project);
console.log(project.todosByDate);
