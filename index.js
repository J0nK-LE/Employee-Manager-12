const mysql = require('mysql2/promise');
let inquirer = require("inquirer")

let connection

initialize()
main();


async function initialize(){
    connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employeetracker_db'})
}


async function main() {
    console.log(`,--------------------------------------------------------.
|                                                        |
|  ______                 _                              |
| |  ____|_ ___ __  _ __ | |  ____  _    _   ___  ___    |
| |  __| | '_ '_  \\|  '_\\| |/  __ \\| |  |  |/ _ \\/ _ \\   |
| | |____| | | | | | |_) | |  (__) | |__|  |  ___/  __/  |
| |______|_| |_| |_| .__/|_|\\_____/\\____,  |\\___|\\___|   |
|                  |_|              |_____/              |
|     __  __                                             |
|    |  \\/  | ___ _ _ ___   ___ _  __ __  ___  _ __      |
|   | |\\/| |/  _' | '__ \\ /  _' |/ _'  |/ _  \\/ __|      |
|  | |  | |  ( | | |  | |  ( | | ( |  |  ___/  |         |
| |_|  |_|\\__,__|_|  |_|\\__,__|\\__,  |\\___|___|          |
|                                |__/                    |
'--------------------------------------------------------'`)
    // get the client
    // create the connection
    const responseObject = await inquirer.prompt([ {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menuOptions',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee', 'update employee role'],
      },])

      console.log(responseObject)


    // query database
    const [rows] = await connection.execute(`SELECT * FROM employees where firstname = ?`,[responseObject.first_name] );
    console.table(rows);



  }