const inquirer = require('inquirer');
const { deptList } = require('./queries');

const questions = {
    mainMenuQuestions: [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Select an option:',
            choices: ['View All Departments, Roles, or Employees', 'Add New Department, Role or Employee', 'Update An Existing Record', 'View Total Department Personnel Budget', 'Exit'],
        },
    ],
    // Secondary Prompts
    viewAllPrompt: [
        {
            type: 'list',
            name: 'viewAllType',
            message: 'Select a category to view:',
            choices: ['Departments', 'Roles', 'Employees'],
        },
    ],
    addNewPrompt: [
        {
            type: 'list',
            name: 'addNewType',
            message: 'Select a category to add:',
            choices: ['New Department', 'New Role', 'New Employee'],
        },
    ],
    updatePrompt: [
        {
            type: 'list',
            name: 'updateType',
            message: 'Select a category to update:',
            choices: ['Department', 'Role', 'Employee'],
        },
    ],
    // Additonal Sub-Prompts
    addDepartmentQuestions: [
        {
            type: 'input',
            name: 'newDeptName',
            message: 'What is the name of the new department?',
            validate: function (val) { 
                if (!val.trim().length || val.trim.length > 30) {
                    console.log("Name must be between 1 and 30 characters. Please try again.");
                    return false;
                } else return true;
            },
        }
    ],
    addRoleQuestions: [
        {
            type: 'input',
            name: 'newRoleTitle',
            message: 'What is the name of the new role?',
            validate: function (val) { 
                if (!val.trim().length || val.trim.length > 30) {
                    console.log("Title must be between 1 and 30 characters. Please try again.");
                    return false;
                } else return true;
            },
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: 'Choose a department for this role:',
            choices: deptList,
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'Please enter the salary for this role in whole dollars:',
            validate: function (val) {
                if (isNaN(val) || !val.trim().length) {
                    console.log("Please enter a valid number.");
                    return false;
                } else return true;
            },
        },
    ],
    addEmployeeQuestions: [
        {
            type: 'input',
            name: 'newEmployeeFName',
            message: 'What is the employee\'s first name?',
            validate: function (val) { 
                if (!val.trim().length || val.trim.length > 30) {
                    console.log("Name must be between 1 and 30 characters. Please try again.");
                    return false;
                } else return true;
            },
        },
        {
            type: 'input',
            name: 'newEmployeeLName',
            message: 'What is the employee\'s last name?',
            validate: function (val) { 
                if (!val.trim().length || val.trim.length > 30) {
                    console.log("Name must be between 1 and 30 characters. Please try again.");
                    return false;
                } else return true;
            },
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: 'Choose a role for this employee:',
            choices: deptList,
        },
        {
            type: 'confirm',
            name: 'addMgr',
            message: 'Does this employee report to a manager?',
        },
        {
            type: 'list',
            name: 'newEmployeeMgrFName',
            message: 'Please enter manager\'s first name',
            when: (answers) => answers.addMgr === true, // TODO use input to query for mgr
            choices: ['Gipsy Perutto', 'Grover Beekmann'], //TODO connect query for employees in dept.
        },
    ],
    editEmployeeQuestions: [
        {
            type: 'list',
            name: 'empDept',
            message: 'In which department is the employee?',
            choices: deptList,
        },
        {
            type: 'input',
            name: 'fNameToEdit',
            message: 'What is the first name of the employee?',
            validate: "" // TODO validate input ??
        },
        {
            type: 'input',
            name: 'lNameToEdit',
            message: 'What is the last name of the employee?',
            validate: "" // TODO validate input ??
        },
    ],
    showDepartmentBudgetQuestions: [
        {
            type: 'list',
            name: 'department',
            message: 'Enter a department to see the total personnel budget:',
            choices: deptList,
        }
    ],
};

module.exports = questions;