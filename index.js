const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_tracker_db'
});

const init = () => {    // ??
    showMainMenu();
};

const showMainMenu = () => {
    inquirer.prompt(mainMenuQuestions)
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

        };
        });
};


const viewDepartments = () => {

};

const ViewRoles = () => {

};

const ViewEmployees = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee = () => {

};

const updateEmployee = (fName, lName) => {

};

const showDeptBudget = (dept) => {

};