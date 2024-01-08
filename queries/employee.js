const inquirer = require('inquirer');
const db = require('../db/connection.js');

//Function to View all employees from the database
function Viewallemployees(DisplayMain) {
    return db.promise()
        .query(`
        SELECT 
          employee.id,
          employee.first_name,
          employee.last_name,
          roles.title AS title,
          department.name AS department,
          roles.salary,
          IFNULL(CONCAT(manager.first_name, ' ', manager.last_name), 'None') AS manager
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
      `)
        .then(([rows]) => {
            console.table(rows);
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
}

//Function to View all Employees By Department
function ViewallEmployeesByDepartment(DisplayMain) {
    return db.promise()
        .query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee_name, \
              department.name AS department_name \
              FROM employee \
              INNER JOIN roles ON employee.role_id = roles.id \
              INNER JOIN department ON roles.department_id = department.id')
        .then(([rows]) => {
            console.table(rows);
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
}

//Function to View all Employees By Manager  
function ViewallEmployeesByManager(DisplayMain) {
    return db.promise()
        .query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee_name, \
              CONCAT(manager.first_name, " ", manager.last_name) AS manager_name \
              FROM employee \
              LEFT JOIN employee AS manager ON employee.manager_id = manager.id')
        .then(([rows]) => {
            console.table(rows);
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
}

//Function to Add an Employee to the database
function AddanEmployee(DisplayMain) {
    // Function to view a list of managers from employee database
    function viewManagers() {
        return db.promise()
            .query('SELECT CONCAT(first_name, " ", last_name) AS manager FROM employee')
            .then(([manager]) => ['None', ...manager.map((manager) => manager.manager)]);
    }

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'FirstName',
                message: "Please enter the first name of employee you want to add",
                validate: (input) => {
                    if (input.trim() === '') {
                        return "Please correct the error and enter again.";
                    }
                    return true;
                },
            },
            {
                type: 'input',
                name: 'LastName',
                message: "Please enter the last name of employee you want to add",
                validate: (input) => {
                    if (input.trim() === '') {
                        return "Please correct the error and enter again.";
                    }
                    return true;
                },
            },
            {
                type: 'list',
                name: 'Role',
                message: "Please choose the role of employee you want to add",
                choices: () => {
                    return db.promise()
                        .query('SELECT title FROM roles')
                        .then(([role]) => role.map((role) => role.title));
                },
            },
            {
                type: 'list',
                name: 'Manager',
                message: "Please choose the manager of employee you want to add",
                choices: viewManagers,
            },
        ])
        .then((answers) => {
            const { FirstName, LastName, Role, Manager } = answers;
            console.log(answers);

            db.promise()
                .query('SELECT id FROM roles WHERE title = ?', [Role])
                .then(([role]) => {
                    if (!role || role.length === 0) {
                        console.error('Error has been occurred:');
                        DisplayMain();
                        return;
                    }

                    const roleId = role[0].id;

                    // In case of no one selected as manager.
                    const managerIdPromise =
                        Manager === 'None'
                            ? Promise.resolve(null)
                            : db.promise()
                                .query('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?', [
                                    Manager,
                                ])
                                .then(([managerResult]) => (managerResult.length > 0 ? managerResult[0].id : null));

                                managerIdPromise
                        .then((managerId) => {
                            db.promise()
                                .query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
                                    FirstName,
                                    LastName,
                                    roleId,
                                    managerId,
                                ])
                                .then(() => {
                                    console.log(`Added ${FirstName} ${LastName} to the database.`);
                                    DisplayMain();
                                })
                                .catch((error) => {
                                    console.error('Error has been occurred:', error);
                                    DisplayMain();
                                });
                        })
                        .catch((error) => {
                            console.error('Error has been occurred:', error);
                            DisplayMain();
                        });
                })
                .catch((error) => {
                    console.error('Error has been occurred:', error);
                    DisplayMain();
                });
        });
}



//Function to Remove an employee from the database
function RemoveanEmployee(DisplayMain) {
    return db.promise()
        .query('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee')
        .then(([employee]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'employee_id',
                message: 'Please choose the name of employee you want to remove',
                choices: employee.map((employee) => ({ name: employee.employee_name, value: employee.id })),
            });
        })
        .then((answers) => {
            const employee_id = answers.employee_id;
            return db.promise().query('DELETE FROM employee WHERE id = ?', [employee_id]);
        })
        .then(() => {
            console.log('data has been successfully removed.');
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error:', error);
            DisplayMain();
        });
}



//Exporting function to index.js
module.exports = {
    Viewallemployees,
    ViewallEmployeesByDepartment,
    ViewallEmployeesByManager,
    AddanEmployee,
    RemoveanEmployee,
};