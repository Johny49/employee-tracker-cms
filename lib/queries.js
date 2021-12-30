const mysql = require('mysql2/promise');
const deptList = [];
const roleList = [];
const employeeList = [];

const dbPool = mysql.createPool({
    user: 'root',
    database: 'employee_tracker_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//show all record for selected table
const showAll = (q) => {
    console.clear();
    switch (q) {
        // Show all departments
        case "Departments":
            dbPool.query('SELECT * FROM department')
                .then((result) => {
                    showTableWithPadding(result[0]);
                }).catch((err) => {
                    console.log(err);
                });
            break;

        // Show all roles
        case "Roles":
            dbPool.query('SELECT role.id, title, salary, department.name AS department_name FROM role INNER JOIN department ON department.id = role.department_id;')
                .then((result) => {
                    showTableWithPadding(result[0]);
                }).catch((err) => {
                    console.log(err);
                });
            break;
        // Show all employees
        case "Employees":
            dbPool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department_name, role.salary, CONCAT(mgr.first_name," ",mgr.last_name) AS manager_name FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department on role.department_id = department.id LEFT JOIN employee AS mgr ON mgr.id = employee.manager_id ORDER BY last_name ASC;')
                .then((result) => {
                    showTableWithPadding(result[0]);
                }).catch((err) => {
                    console.log(err);
                });
            break;
    }
};

const showTableWithPadding = (res) => {
    // whitespace for proper display of table header
    console.log(`\n \n`);
    console.table(res);
    console.log(`\n \n \n \n`);
}

// build list of names for question choices
async function buildList(type) {
    switch (type) {
        case 'department':
            dbPool.query('SELECT name FROM department')
                .then((depts) => {
                    for (dept of depts[0]) {
                        deptList.push(dept.name)
                    }
                    return (deptList);
                });
        case 'role':
            dbPool.query('SELECT title FROM role')
                .then((roles) => {
                    for (role of roles[0]) {
                        roleList.push(role.title)
                    }
                    return (roleList);
                });
        case 'employee':
            dbPool.query('SELECT CONCAT(first_name," ",last_name) AS name FROM employee')
                .then((employees) => {
                    for (employee of employees[0]) {
                        employeeList.push(employee.name)
                    }
                    employeeList.push("No Manager");
                    return (employeeList);
                });
    }
};

const updateEmployee = (name, newRole, newMgr) => {
    console.log(name, newRole, newMgr);
    // get id for new role
    dbPool.query('SELECT id FROM role WHERE title=?;', newRole)
                .then((role) => {
                    // get id for new manager
                    dbPool.query('SELECT id FROM employee WHERE first_name=? AND last_name=?;', [newMgr.split(" ")[0], newMgr.split(" ")[1]])
                        .then((manager) => {
                            dbPool.query('UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? AND last_name = ?;', [role[0][0].id, manager[0][0].id, name.split(" ")[0], name.split(" ")[1]])
                                .then((result) => {
                                    console.clear();
                                    console.log(`Updated record for ${name} in the database.`);
                                })
                        })
                }).catch((err) => {
                    console.log(err);
                    console.log(`New employee was not created.`);
                });
};

// add new record to table based on type and values entered by user
const addNew = (type, arr) => {
    switch (type) {
        case 'department':
            dbPool.query('INSERT INTO department (name) VALUES (?);', arr[0])
                .then((result) => {
                    console.clear();
                    console.log(`Added ${arr[0]} into the database.`);
                }).catch((err) => {
                    console.log(err);
                    console.log('New department was not created.');
                });
            console.log(`\n \n \n \n`);
            break;

        case "role":
            dbPool.query('SELECT id FROM department WHERE name=?;', arr[1])
                .then((result) => {
                    dbPool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [arr[0], arr[2], result[0][0].id])
                        .then((result) => {
                            console.clear();
                            console.log(`Added ${arr[0]} role into the database.`);
                        })
                }).catch((err) => {
                    console.log(err);
                    console.log('New role was not created');
                });
            console.log(`\n \n \n \n`);
            break;

        case "employee":
            // get id for chosen role
            dbPool.query('SELECT id FROM role WHERE title=?;', arr[2])
                .then((role) => {
                    // get id for chosen manager
                    dbPool.query('SELECT id FROM employee WHERE first_name=? AND last_name=?;', [arr[3].split(" ")[0], arr[3].split(" ")[1]])
                        .then((manager) => {
                            dbPool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [arr[0], arr[1], role[0][0].id, manager[0][0].id])
                                .then((result) => {
                                    console.clear();
                                    console.log(`Added new employee ${arr[0]} ${arr[1]} into the database.`);
                                })
                        })
                }).catch((err) => {
                    console.log(err);
                    console.log(`New employee was not created.`);
                });
            console.log(`\n \n \n \n`);
            break;
    };
};

const getDeptBudget = (dept) => {
    dbPool.query('SELECT id FROM department WHERE name=?;', dept)
        .then((result) => {
            let deptId = result[0][0].id;
            dbPool.query('SELECT SUM(salary) AS budget, role.department_id FROM role INNER JOIN employee ON employee.role_id = role.id WHERE role.department_id = ? GROUP BY role.department_id;', deptId)
                .then((result) => {
                    console.clear();
                    console.log(`The total personnel budget for ${dept} is $${result[0][0].budget}.`);
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    showAll,
    buildList,
    addNew,
    updateEmployee,
    getDeptBudget,
    deptList,
    roleList,
    employeeList
};