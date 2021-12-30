const inquirer = require('inquirer');
// question set
const questions = require('./lib/questions');
// saved queries
const { showAll, addNew, listDepts, getDeptBudget } = require('./lib/queries');

const init = () => {    // ??
    // console.log(String.fromCharCode(2589, 2589, 2589, 2589));    // TODO ADD TITLE/ LOGO HERE
    // query to create list of department names
    listDepts();
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
                case 'Update An Existing Record':
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
            try {
                // let obj = { "name": answers.newDeptName.trim() };
                addNew('department', [answers.newDeptName])
                showMainMenu();
            } catch (error) {
                console.log(error, `${answers.newDeptName} was not created.`);
                showMainMenu();
            }
        });
};

// Create a new role
const addRole = () => {
    inquirer.prompt(questions.addRoleQuestions)
        .then(function (answers) {
        //     const res = queryBySelection('department', 'id', `name = '${answers.newRoleDept}'`)
        // .then(function (res) {
            try {
                // let obj = { "title": answers.newRoleTitle.trim(), "department_id": res.id, "salary": answers.newRoleSalary };
                addNew("role", [answers.newRoleTitle.trim(), answers.newroleDept, answers.newRoleSalary]); 
                showMainMenu();               
            } catch (error) {
                console.log(error, `\n ${answers.newRoleTitle} role was not created.`);
                showMainMenu();
            }
        });
        // });
};

// Create a new employee
const addEmployee = () => {
    // todo query list of roles,  manager??
    inquirer.prompt(questions.addEmployeeQuestions)
        .then(function (answers) {
            
            console.log(answers);
            try {
                let obj = { "first_name": obj.first_name, "last_name": obj.last_name, "role_id": obj.role_id, "manager_id": obj.manager_id };
                addNew("employee", obj);
                showMainMenu();
            } catch (error) {
                console.log(error, `${answers.newEmployeeFName} ${answers.newEmployeeLName} was not created.`);
                showMainMenu();
            }
        });
};

// Menu to update an existing record in a selected category
const updateRecordMenu = () => {
    inquirer.prompt(questions.updatePrompt)
        .then(function (answers) {
            switch (answers.viewAllType) {
                    case 'Update Existing Department':
                        console.log('Not ready yet');
                        showMainMenu();
                        break;
                    case 'Update Existing Role':
                       console.log('Not ready yet');
                        showMainMenu();
                        break;
                    case 'Update Existing Employee':
                        updateEmployee();
                        showMainMenu(); 
                        break;
            };
        });
};

// Edit saved values for existing employee
const updateEmployee = (fName, lName) => {
    inquirer.prompt(questions.editEmployeeQuestions)
        .then(function (answers) {

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