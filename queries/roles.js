const inquirer = require('inquirer');
const db = require('../db/connection.js');

//Function to View all Roles from the database
function ViewallRoles(DisplayMain) {
    return db.promise()
        .query(`
        SELECT roles.id, roles.title, roles.salary, department.name AS department
        FROM roles
        JOIN department ON roles.department_id = department.id
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


//Function to Add a Role to the database
function AddaRole(DisplayMain) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please enter the role you want to add',
                validate: (input) => {
                    if (input.trim() === '') {
                        return 'Please correct the error and enter again.';
                    }
                    return true;
                },
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary(number) of the role you want to add',
                validate: (input) => {
                    if (isNaN(input) || input.trim() === '') {
                        return 'Please correct the error and enter again.';
                    }
                    return true;
                },
            },
            {
                type: 'list',
                name: 'department',
                message: 'Please choose the department of the role you want to add',
                choices: () => {
                    return db.promise()
                        .query('SELECT name FROM department')
                        .then(([department]) => department.map((department) => department.name));
                },
            },
        ])
        .then((answers) => {
            const { title, salary, department } = answers;

            db.promise()
                .query('SELECT id FROM department WHERE name = ?', [department])
                .then(([result]) => {
                    const departmentId = result[0].id;

                    db.promise()
                        .query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [
                            title,
                            parseFloat(salary),
                            departmentId,
                        ])
                        .then(() => {
                            console.log(`${title} has been added to the database.`);
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
        });
}

//Function to Remove a Role from the database
function RemoveaRole(DisplayMain) {
    return db.promise()
        .query('SELECT id, title FROM roles')
        .then(([roles]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'role_id',
                message: 'Please choose the role you want to remove',
                choices: roles.map((roles) => ({ name: roles.title, value: roles.id })),
            });
        })
        .then((answers) => {
            const roles_id = answers.roles_id;
            return db.promise().query('DELETE FROM roles WHERE id = ?', [roles_id]);
        })
        .then(() => {
            console.log('data has been successfully removed.');
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
}

//Function to Update an Employee Role
function UpdateanEmployeeRole(DisplayMain) {
    //Prompt 1: Query to view the list of employees
    const ViewEmployeesList = 'SELECT CONCAT(first_name, " ", last_name) AS employeeName FROM employee';

    return db.promise()
        .query(ViewEmployeesList)
        .then(([employee]) =>
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeName',
                    message: 'Please choose the name of employee you want to update',
                    choices: employee.map((employee) => employee.employeeName),
                },
            ])
        )
        .then((answers) => {
            const ChosenEmployeesName = answers.employeeName;

    //Prompt 2: Query to view the list of roles
    const ViewRolesList = 'SELECT title FROM roles';

    return db.promise()
        .query(ViewRolesList)
        .then(([roles]) =>
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'newEmployeeRole',
                    message: 'Please choose the new role of selected employee you want to update',
                    choices: roles.map((roles) => roles.title),
                },
            ])
        )
        .then((rolesAnswer) => {
            const newRoleTitle = rolesAnswer.newEmployeeRole;

    //Update the employee's role by input
    return db.promise()
        .query(
        'UPDATE employee SET role_id = (SELECT id FROM roles WHERE title = ?) WHERE CONCAT(first_name, " ", last_name) = ?',
        [newRoleTitle, ChosenEmployeesName]
        )
        .then(() => {
            console.log('New role has been updated to the database');
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
});
})
        .catch((error) => {
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
}

//Exporting function to index.js
module.exports = {
    ViewallRoles,
    AddaRole,
    RemoveaRole,
    UpdateanEmployeeRole
};