const inquirer = require('inquirer');
const db = require('../db/connection.js');

//Function to View all Departments from the database
function ViewallDepartments(DisplayMain) {
    return db.promise()
        .query('SELECT * FROM department')
        .then(([rows]) => {
            console.table(rows);
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error:', error);
            DisplayMain();
        });
}

//Function to Add a Department to the database
function AddaDepartment(DisplayMain) {
    inquirer
        .prompt({
            type: 'input',
            name: 'NameofDepartment',
            message: 'What is the name of the department?',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Please enter the department name again.';
                }
                return true;
            },
        })
        .then((answers) => {
            const NameofDepartment = answers.NameofDepartment;

            db.promise()
                .query('INSERT INTO department (name) VALUES (?)', [NameofDepartment])
                .then(() => {
                    console.log(`Successfully added ${NameofDepartment} to the database.`);
                    DisplayMain();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    DisplayMain();
                });
        })
        .catch((error) => {
            console.error('Error has occurred:', error);
            DisplayMain();
        });
}


//Function to Remove a Department from the database
function RemoveaDepartment(DisplayMain) {
    return db.promise()
        .query('SELECT id, name FROM department')
        .then(([department]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'department_id',
                message: 'Which department do you want to delete?',
                choices: department.map((department) => ({ name: department.name, value: department.id })),
            });
        })
        .then((answers) => {
            const department_id = answers.department_id;
            return db.promise().query('DELETE FROM department WHERE id = ?', [department_id]);
        })
        .then(() => {
            console.log('data has been successfully deleted.');
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error:', error);
            DisplayMain();
        });
}

//Function to View combinced salaries of department. 
function Viewcombinedsalariesofdepartment(DisplayMain) {
    return db.promise()
        .query('SELECT department.id, department.name, SUM(role.salary) AS total_budget ' +
            'FROM employee ' +
            'INNER JOIN role ON employee.role_id = role.id ' +
            'INNER JOIN department ON role.department_id = department.id ' +
            'GROUP BY department.id, department.name')
        .then(([rows]) => {
            console.table(rows);
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error:', error);
            DisplayMain();
        });
}

//Exporting function to index.js
module.exports = {
    ViewallDepartments,
    AddaDepartment,
    RemoveaDepartment,
    Viewcombinedsalariesofdepartment
};