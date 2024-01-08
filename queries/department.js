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
            console.error('Error has been occurred:', error);
            DisplayMain();
        });
}

//Function to Add a Department to the database
function AddaDepartment(DisplayMain) {
    inquirer
        .prompt({
            type: 'input',
            name: 'NameofDepartment',
            message: 'Please enter the department you want to add',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Please correct the error and enter again.';
                }
                return true;
            },
        })
        .then((answers) => {
            const NameofDepartment = answers.NameofDepartment;

            db.promise()
                .query('INSERT INTO department (name) VALUES (?)', [NameofDepartment])
                .then(() => {
                    console.log(`${NameofDepartment} has been successfully added to the database.`);
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
}


//Function to Remove a Department from the database
function RemoveaDepartment(DisplayMain) {
    return db.promise()
        .query('SELECT id, name FROM department')
        .then(([department]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'department_id',
                message: 'Please choose the department you want to remove',
                choices: department.map((department) => ({ name: department.name, value: department.id })),
            });
        })
        .then((answers) => {
            const department_id = answers.department_id;
            return db.promise().query('DELETE FROM department WHERE id = ?', [department_id]);
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

//Function to View combinced salaries of department. 
function Viewcombinedsalariesofdepartment(DisplayMain) {
    console.log("hello");
    return db.promise()
        .query('SELECT d.name, SUM(r.salary) AS total_budget ' +
            'FROM department d ' +
            'JOIN roles r ON d.id = r.department_id ' +
            'GROUP BY d.name ')
        .then(([rows]) => {
            console.table(rows);
            DisplayMain();
        })
        .catch((error) => {
            console.error('Error has been occurred:', error);
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