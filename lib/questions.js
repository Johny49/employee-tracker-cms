// Initial options
// Select an option:
//     * view all departments, 
//         -> show departments in table
//     * view all roles, 
//         -> show roles in table
//     * view all employees, 
//         -> show employees in table
//     * add a department,
//         -> prompt to add a new department
//     * add a role,
//         -> prompt to add a new role
//     * add an employee,
//         -> prompt to add a new employee
//     * update an employee role
//         -> prompt to edit an existing employee
//     * view total department personnel budget

const questions = {
    mainMenuQuestions: [
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Select an option:',
            choices: ["View Departments", "View Roles", "View Employees", "Add New Department", "Add New Role", "Add New Employee", "Update Existing Employee", "View Total Department Personnel Budget", "Exit"],
        }
    ],
    addDepartmentQuestions: [
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the new department?',
            validate: "" // TODO - ensure length > 0, < 30
        }
    ],
    addRoleQuestions: [
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the name of the new role?',
        },
        {
            type: 'number',
            name: 'roleSalary',
            message: 'Please enter the salary for this role in whole dollars:',
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'Choose a department for this role:',
            choices: [""] // TODO retrieve list of departments from db
        }
    ],
    addEmployeeQuestions: [
        {
            type: 'input',
            name: 'employeeFName',
            message: 'What is the employee\'s first name?',
            validate: "" // TODO verify that length < 30
        },
        {
            type: 'input',
            name: 'employeeLName',
            message: 'What is the employee\'s last name?',
            validate: "" // TODO verify that length < 30
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'Choose a role for this employee:',
            choices: [""] // TODO retrieve list of roles from db
        },
        {
            type: 'confirm',
            name: 'addMgr',
            message: 'Does this employee report to a manager?',
        },
        {
            type: 'input',
            name: 'employeeMgrFName',
            message: 'Please enter manager\'s first name',
            when: (answers) => answers.addMgr === true, // TODO use input to query for mgr
            validate: "" // verify length < 30 
        },
        {
            type: 'input',
            name: 'employeeMgrLName',
            message: 'Please enter manager\'s last name',
            when: (answers) => answers.addMgr === true, // TODO use input to query for mgr
            validate: "" // verify length < 30 
        }
    ],
    editEmployeeQuestions: [
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
            type: 'input',
            name: 'department',
            message: 'Enter a department to see the total personnel budget:',
            validate: "" // TODO validate input ??
        }
    ],
};

module.exports = questions;