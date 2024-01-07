// installed npm packages & files for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection.js');
require('dotenv').config();

// Import query functions, module exports from queries folder
const { ViewallDepartments, AddaDepartment, RemoveaDepartment, Viewcombinedsalariesofdepartment } = require('./queries/department.js');
const { ViewallRoles, AddaRole, RemoveaRole } = require('./queries/roles.js');
const { Viewallemployees, ViewallEmployeesByDepartment, ViewallEmployeesByManager, AddanEmployee, RemoveanEmployee, UpdateanEmployeeManager } = require('./queries/employee.js');

// Function to commence the application
function init() {
    connection.promise()
        .connect()
        .then(() => {
            // Call the function to display main list of options
            DisplayMain();
        })

        .catch((error) => {
            console.error('Error has been occurred:', error);
        });
}

function DisplayMain() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all Departments',
            'Add a Department',
            'Remove a Department',
            'View combined salaries of department',
            'View all Roles',
            'Add a Role',
            'Remove a Role',
            'View all employees',
            'View all Employees By Department',
            'View all Employees By Manager',
            'Add an Employee',
            'Remove an Employee',
            'Update an Employee Manager',
            'Exit'
        ]
    })

    .then((answers) => {
        switch (answers.action) {
            case 'View all Departments':
                return ViewallDepartments(DisplayMain);
                break;
            case 'Add a Department':
                return AddaDepartment(DisplayMain);
                break;
            case 'Remove a Department':
                return RemoveaDepartment(DisplayMain);
                break;
            case 'VView combined salaries of department':
                return Viewcombinedsalariesofdepartment(DisplayMain);
                break;
            case 'View all Roles':
                return ViewallRoles(DisplayMain);
                break;
            case 'Add a Role':
                return AddaRole(DisplayMain);
                break;
            case 'Remove a Role':
                return RemoveaRole(DisplayMain);
                break;
            case 'View all employees':
                return Viewallemployees(DisplayMain);
                break;
            case 'View all Employees By Department':
                return ViewallEmployeesByDepartment(DisplayMain);
                break;
            case 'View all Employees By Manager':
                return ViewallEmployeesByManager(DisplayMain);
                break;
            case 'Add an Employee':
                return AddanEmployee(DisplayMain);
                break;
            case 'Remove an Employee':
                return RemoveanEmployee(DisplayMain);
                break;
            case 'Update an Employee Manager':
                return UpdateanEmployeeManager(DisplayMain);
                break;
            case 'Exit':
                console.log('Exit the bigdata');
                process.exit();
                break;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}