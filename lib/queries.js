const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_tracker_db'
});

const showAll = (q) => {
    console.clear();
    switch (q) {
        // Show all departments
        case "allDepts": 
            db.query('SELECT * FROM department', (err, result) => {
                if (err) { 
                    console.log(err);
                }
                // whitespace for proper display of table header
                console.log(`\n \n`);
                console.table(result);
            });
            break;
        // Show all roles
        case "allRoles": 
            db.query('SELECT * FROM role', (err, result) => {
                if (err) { 
                    console.log(err);
                }
                // whitespace for proper display of table header
                console.log(`\n \n`);
                console.table(result);
            });
            break;
        // Show all employees
        case "allEmployees": 
        db.query('SELECT * FROM employee', (err, result) => {
            if (err) { 
                console.log(err);
            }
            // whitespace for proper display of table header
            console.log(`\n \n`);
            console.table(result);
        });
        break;
        // Add new department
        db.query('SELECT * FROM department', (err, result) => {
            if (err) { 
                console.log(err);
            }
            // whitespace for proper display of table header
            console.log(`\n \n`);
            console.table(result);
        });
        break;
        // Add new role

        // Add new employee

        // select employee
        case "findEmployee": return 'SELECT * FROM employees WHERE first_name = ? AND last_name = ?';
        // save updated record
        case "updateEmployee": return 'SELECT * FROM employees WHERE first_name = ? AND last_name = ?'; // TODO update
        // SUM all salaries in dept ** 
        case "sumSalaries": return '' // TODO add query;
    }
};

const addNew = (type, obj) => {
switch (type) {
    case "department":  //TODO add check on obj
        db.query('INSERT INTO department (name) VALUES (?)', obj.name, (err, result) => {
            if (err) { 
                console.log(err);
            } else {
                console.log(`Added ${obj.name} into the database.`);
                console.log(result);
            }
        });
        break;
    case "role": 
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [obj.title, obj.salary, obj.department_id], (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(`Added ${obj.title} role into the database.`);
            console.log(result);
        }
    });
    break;
    case "employee":
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [obj.first_name, obj.last_name, obj.role_id, obj.manager_id], (err, result) => {
            if (err) { 
                console.log(err);
            }
            console.log(`Added new employee ${obj.fName} ${obj.lName} into the database.`);
            console.log(result);
        });
        break;
}


};

module.exports = {
    showAll,
    addNew
};