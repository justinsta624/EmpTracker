//Import the mysql2 package
const mysql = require('mysql2');

// create the connection to database using credentials in protected .env file
const db = mysql.createConnection(
    { 
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_management_db'
    },
    console.log(`Connected to the employee_management_db database.`)
);

module.exports = db;

