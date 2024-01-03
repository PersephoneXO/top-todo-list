//module for creating and manipulating todo objects

//difference in days from date-fns
const { differenceInDays,format } = require("date-fns");

//create a todo object
const createTodo=(title,description,deadline,priority,projectName)=>{
    //let todayDate=format(new Date(),"cccc LLLL d, yyyy");
    let checklist=false;
    return {title,description,deadline,priority,checklist,projectName};
};

//create a project object
const createProject=(title,todos=[])=>{
    return {title,todos};
};
