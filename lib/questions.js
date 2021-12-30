const { deptList, roleList, employeeList } = require('./queries');

const questions = {
    mainMenuQuestions: [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Select an option:',
            choices: ['View All Departments, Roles, or Employees', 'Add New Department, Role or Employee', 'Update An Existing Employee Record', 'View Total Department Personnel Budget', 'Exit'],
        },
    ],
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
            name: 'newRole',
            message: 'Choose a role for this employee:',
            choices: roleList,
        },
        {
            type: 'list',
            name: 'newEmployeeMgr',
            message: 'Please select a manager for the new employee:',
            choices: employeeList,
        },
    ],
    updateEmployeeQuestions: [
        {
            type: 'list',
            name: 'chooseEmployee',
            message: 'Select the employee to update',
            choices: employeeList,
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'Choose a new role for this employee',
            choices: roleList,
        },
        {
            type: 'list',
            name: 'updateMgr',
            message: 'Choose the new manager for this employee',
            choices: employeeList,
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