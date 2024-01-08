# ⭐ Structured Query Language: Employee Tracker ⭐
    
![Contributor](https://img.shields.io/badge/Contributor-Hanbyeol(Justin)Lee-purple)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/MIT)
![GitHub](https://img.shields.io/badge/GitHub-justinsta624-yellow)
![DataBase](https://img.shields.io/badge/DataBase-MySql2-green)
![Module](https://img.shields.io/badge/Module-Dotenv-magenta)
![Installation](https://img.shields.io/badge/Installation-Inquirer@8.2.4-red)

## Outcome

Followings are the outcomes of the challenge 12:

* A walkthrough video demonstrating the functionality of the application. </br>
[Walk-Through Video: Webm file](https://drive.google.com/file/d/13lYzjIttgbpzISU735EU99gA_hCyNSp6/view) </br>
[Walk-Through Video: GIF file](https://github.com/justinsta624/EmpTracker/blob/main/assets/240107_WalkThroughVideo_Challenge12_HBLEE.gif)
</br>

* The URL of the GitHub repository, with a unique name and a README describing the project </br>
[Repository for this challenge](https://github.com/justinsta624/EmpTracker)

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles,
view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department belongs to, and the salary of the role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names,
last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role which is added to the db
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee
is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated
in the database
```

## What to expect for this challenge?

* To create interfaces **content management systems (CMS)** that allow non-developers to easily view and interact with information stored in databases.
* To build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.
* Your application should use [Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4) to interact with the user via the command line.
* You’ll need to use the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries.
* To provide a link to a walkthrough video that demonstrates its functionality and passes all of the tests. </br>
  [Video Submission Guide](https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide)
* You might also want to make your queries asynchronous. MySQL2 exposes a `.promise()` function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2).
* `additional functionality`: Update employee managers, View employees by manager/department, Delete department/roles/employee, View the total utilized budget of a department&mdash; in other words, the combined salaries of all employees in that department


## Design the database schema:

Your schema should contain the following three tables:

* `department`
    * `id`: `INT PRIMARY KEY`
    * `name`: `VARCHAR(30)` to hold department name

* `role`
    * `id`: `INT PRIMARY KEY`
    * `title`: `VARCHAR(30)` to hold role title
    * `salary`: `DECIMAL` to hold role salary
    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`
    * `id`: `INT PRIMARY KEY`
    * `first_name`: `VARCHAR(30)` to hold employee first name
    * `last_name`: `VARCHAR(30)` to hold employee last name
    * `role_id`: `INT` to hold reference to employee role
    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)


You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. 
You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.


## Review

You are required to submit the following for review:
* A walkthrough video demonstrating the functionality of the application.
* The URL of the GitHub repository, with a unique name and a README describing the project.

---
