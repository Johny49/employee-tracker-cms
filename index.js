const inquirer = require('inquirer');
// question set
const questions = require('./lib/questions');
// query functions
const { showAll, addNew, buildList, updateEmployee, getDeptBudget } = require('./lib/queries');

const init = () => {    // ??
    // console.log(String.fromCharCode(2589, 2589, 2589, 2589));    // TODO ADD TITLE/ LOGO HERE
    // query to create list of department names
    buildList('department');
    buildList('role');
    buildList('employee');
    showMainMenu();
};

// Main Menu for application
const showMainMenu = () => {
    inquirer.prompt(questions.mainMenuQuestions)
        .then(function (answers) {
            switch (answers.menuChoice) {
                case 'View All Departments, Roles, or Employees':
                    viewAllMenu();
                    break;
                case 'Add New Department, Role or Employee':
                    addNewMenu();
                    break;
                case 'Update An Existing Employee Record':
                    updateRecordMenu();
                    break;
                case 'View Total Department Personnel Budget':
                    showDeptBudget();
                    break;
                case 'Exit':
                    return process.exit();
            };
        });
};

// Menu to view all records in a selected category
const viewAllMenu = () => {
    inquirer.prompt(questions.viewAllPrompt)
        .then(function (answers) {
            showAll(answers.viewAllType);
            showMainMenu();
        });
};

// Menu to select a category to create a new record
const addNewMenu = () => {
    inquirer.prompt(questions.addNewPrompt)
        .then(function (answers) {
            switch (answers.addNewType) {
                case 'New Department':
                    addDepartment();
                    break;
                case 'New Role':
                    addRole();
                    break;
                case 'New Employee':
                    addEmployee();
                    break;
            };
        });
};

// Create a new department
const addDepartment = () => {
    inquirer.prompt(questions.addDepartmentQuestions)
        .then(function (answers) {
            addNew('department', [answers.newDeptName.trim()]);
        })
        .then(() => {
            // update list for prompt choices
            buildList('department');
            showMainMenu();
        });
}

// Create a new role
const addRole = () => {
    inquirer.prompt(questions.addRoleQuestions)
        .then((answers) => {
            addNew("role", [answers.newRoleTitle.trim(), answers.newRoleDept, answers.newRoleSalary]);
        })
        .then(() => {
            // update list for prompt choices
            buildList('role');
            showMainMenu();
        });
};

// Create a new employee
const addEmployee = () => {
    inquirer.prompt(questions.addEmployeeQuestions)
        .then((answers) => {
            addNew("employee", [answers.newEmployeeFName, answers.newEmployeeLName, answers.newRole, answers.newEmployeeMgr])
        })
        .then(() => {
            //update list for prompt choices
            buildList('employee');
            showMainMenu();
        });
};

// Menu to update an existing employee record
const updateRecordMenu = () => {
    inquirer.prompt(questions.updateEmployeeQuestions)
        .then(function (answers) {
            updateEmployee(answers.chooseEmployee, answers.updateRole, answers.updateMgr);
            showMainMenu();
        });
};

// Display personnel budget for user selected department
const showDeptBudget = () => {
    inquirer.prompt(questions.showDepartmentBudgetQuestions)
        .then(function (answers) {
            getDeptBudget(answers.department);
            showMainMenu();
        });

};

// initialize the application
init();