//module for creating and manipulating todo objects

//difference in days from date-fns
const { differenceInDays,format,isToday } = require("date-fns");

//create a todo object
const createTodo=(title,description,deadline,priority,projectName)=>{
    //let todayDate=format(new Date(),"cccc LLLL d, yyyy");
    let checkmark=false;
    return {title,description,deadline,priority,checkmark,projectName};
};

//create a project object
const createProject=(title,todos=[])=>{
    return {title,todos};
};

//toggle checkmark
function toggleCheck(todo){
    todo.checkmark=true;
    return todo;
};

//check if deadline is today
function isDeadlineToday(todo){

};
