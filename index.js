const inquirer = require('inquirer');
const mysql = require('mysql2');
// question set
const questions = require('./lib/questions');
// saved queries
const { showAll, addNew } = require('./lib/queries');

// const db = mysql.createConnection({
//     user: 'root',
//     database: 'employee_tracker_db'
// });

const init = () => {    // ??
    // console.log(String.fromCharCode(2589, 2589, 2589, 2589));    // TODO ADD TITLE/ LOGO HERE
    showMainMenu();
};

const showMainMenu = () => {
    
    inquirer.prompt(questions.mainMenuQuestions)
    .then(function (answers) {
        switch (answers.menuChoice) {
            case 'View Departments':
                showAll("allDepts");
                showMainMenu();
                break;
            case 'View Roles':
                showAll("allRoles");
                showMainMenu();
                break;
            case 'View Employees':
                showAll("allEmployees");
                showMainMenu();
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
        });
};

const addDepartment = () => {
    inquirer.prompt(questions.addDepartmentQuestions)
    .then(function (answers) {
        console.log(answer.deptName);
        let obj = {"name": "Test Department"};
        addNew("department", obj);
    })
    // .then(showMainMenu());
};

const addRole = () => {
    // TODO query and return list of departments || ask for dept_id and offer prompt for list of vals
    inquirer.prompt(questions.addRoleQuestions)
    .then(function (answers) {
        // TODO query to retrieve list of roles??
        console.log(answers.roleTitle, answers.roleDept, answers.roleSalary);
        let obj = {"title": "Test", "department_id": "7", "salary": "15000"};
        addNew("role", obj);
    })
    // .then(showMainMenu());
};

const addEmployee = () => {
    // todo query list of roles,  manager??
    inquirer.prompt(questions.addEmployeeQuestions)
    .then(function (answers) {
        console.log(answers);
        let obj = {"first_name": "Testy", "last_name": "Testerson", "role_id": "7", "manager_id": "NULL"};
        addNew("employee", obj);
    })
    // .then(showMainMenu());
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