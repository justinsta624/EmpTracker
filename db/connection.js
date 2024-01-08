//Import the mysql2 package
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection(
    { 
        host: 'localhost',
        user: 'root',
        password: 'justinsta624@gmail.com',
        database: 'employee_bigdata_db'
    });

    connection.connect(function(err) 
    {
        if (err) throw err;
        console.log(`Connected to the employee_bigdata_db`);
    });

module.exports = connection;

