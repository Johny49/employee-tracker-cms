const inquirer = require('inquirer');
const mysql = require('mysql2');
// question set
const questions = require('./lib/questions');
// saved queries
const queries = require('./lib/queries');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_tracker_db'
});

const init = () => {    // ??
    // console.log(String.fromCharCode(2589, 2589, 2589, 2589));    // TODO ADD TITLE/ LOGO HERE
    showMainMenu();
};

const showMainMenu = () => {
    inquirer.prompt(questions.mainMenuQuestions)
    .then(function (answers) {
        switch (answers.menuChoice) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                ViewRoles();
                break;
            case 'View Employees':
                ViewEmployees();
                break;
            case 'Add New Department':
                addDepartment();
                break;
            case 'Add New Role':
                addRole();
                break;
            case 'Add New Employee':
                addEmployee();
                break;
            case 'Update Existing Employee':
                updateEmployee()
                break;
            case 'View Total Department Personnel Budget':
                showDeptBudget();
                break;
            case 'Exit':
                return process.exit();
        };
        return init();
        });
};


const viewDepartments = () => {
    console.table();
};

const ViewRoles = () => {

};

const ViewEmployees = () => {

};

const addDepartment = () => {
    inquirer.prompt(questions.addDepartmentQuestions)
    .then(function (answers) {

    });
};

const addRole = () => {
    inquirer.prompt(questions.addRoleQuestions)
    .then(function (answers) {

    });
};

const addEmployee = () => {
    inquirer.prompt(questions.addEmployeeQuestions)
    .then(function (answers) {

    });
};

const updateEmployee = (fName, lName) => {
    inquirer.prompt(questions.editEmployeeQuestions)
    .then(function (answers) {

    });
};

const showDeptBudget = (dept) => {
    inquirer.prompt(questions.showDepartmentBudgetQuestions)
    .then(function (answers) {

    });
};

// initialize the application
init();