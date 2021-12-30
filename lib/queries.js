const mysql = require('mysql2/promise');
// const cTable = require('console.table');
const deptList = [];

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

// build list of department names for question choices
async function listDepts() {
    dbPool.query('SELECT * FROM department')
        .then((depts) => {
            for (dept of depts[0]) {
                deptList.push(dept.name)
            }
            return (deptList);
        });
};

// function to run query based on user answers to prompts
async function queryBySelection(table, output, param) {
    dbPool.query(`SELECT ? FROM ? WHERE ?`, [output, table, param], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);

        switch (table) {
            case 'departments':
                return result.id;
                break;
        }


    });
};

// add new record to table based on type and values entered by user
const addNew = (type, arr) => {
    switch (type) {
        case 'department':
            // dbPool.query('INSERT INTO department (name) VALUES (?)', obj.name, (err, result) => {
            dbPool.query('INSERT INTO department (name) VALUES (?)', arr[0], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Added ${obj.name} into the database.`);

                }
            });
            console.log(`\n \n \n \n`);
            break;

        case "role":
            // dbPool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [obj.title, obj.salary, obj.department_id], (err, result) => {
            dbPool.query('SELECT id FROM department WHERE name=?', arr[1], (err, result) => {
                if (err) {
                    console.log(err);
                }
                dbPool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [arr[0], arr[2], obj.department_id], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Added ${obj.title} role into the database.`);
                        console.log(result);
                    }
                });
                console.log(`\n \n \n \n`);
            })
            break;

        case "employee":
            dbPool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [obj.first_name, obj.last_name, obj.role_id, obj.manager_id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Added new employee ${obj.fName} ${obj.lName} into the database.`);
                console.log(result);
            });
            console.log(`\n \n \n \n`);
            break;
    }
};

const getDeptBudget = (dept) => {
    dbPool.query('SELECT id FROM department WHERE name=?', dept)
    .then((result) => {
        console.log(result[0][0].id);
        let deptId = result[0][0].id;
        dbPool.query('SELECT SUM(salary) AS budget, role.department_id FROM role INNER JOIN employee ON employee.role_id = role.id WHERE role.department_id = ? GROUP BY role.department_id;', deptId)
        .then((result) => {
            console.clear();
            console.log(`The total budget for ${dept} is $${result[0][0].budget}.`);
        })
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    showAll,
    listDepts,
    addNew,
    getDeptBudget,
    deptList,
};