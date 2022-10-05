const mysql = require('mysql2/promise');
let inquirer = require("inquirer");


let connection

const test = [
  //   {
  //    type: 'input',
  //    message: "write what you need",
  //    name: 'first_name'
  // },
  {
    type: 'list',
    message: "write what you need",
    name: 'testMenuOptions',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', "I'm finished"]
  }
]

const menuQuestion = [{
  type: 'list',
  message: 'What would you like to do?',
  name: 'menuOptions',
  choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', "I'm finished"]
}]


const addDepartments = [{
  type: 'input',
  message: 'Name of the department you want to add?',
  name: 'departmentName'
}]

const addRole = [{
  type: 'input',
  message: 'Name of the role you want to add?',
  name: 'roleName'
},
{
  type: 'input',
  message: 'What is the salary of the new role?',
  name: 'roleSalary'
},
{
  type: 'list',
  message: 'Which department does this role belong to?',
  name: 'roleDepartment',
  choices: ['LIST OF DEPARTMENT ROLES GO HERE']
},]

const addEmployee = [{
  type: 'input',
  message: 'First name of the employee you want to add?',
  name: 'empFirstName'
},
{
  type: 'input',
  message: 'Last name of the employee you want to add?',
  name: 'empLastName'
},
{
  type: 'input',
  message: 'What is the employees role?',
  name: 'empRole',
  choices: ['LIST OF ROLES GO HERE']
},
{
  type: 'list',
  message: 'Who is the employees manager?',
  name: 'empManager',
  choices: ['LIST OF MANAGERS GO HERE']
}]

const updateRole = [{
  type: 'list',
  message: 'Which department does this role belong to?',
  name: 'roleDepartment',
  choices: ['LIST OF DEPARTMENT ROLES GO HERE']
}]

initialize()
main();


async function initialize() {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employeetracker_db'
  })
}



async function main() {
  console.log(`,--------------------------------------------------------.
  |                                                        |
  |  ______                 _                              |
  | |  ____|_ __ __   _ __ | |  ____  _    _   ___  ___    |
  | |  __| | '_ '_  \\|  '_\\| |/  __ \\| |  |  |/ _ \\/ _ \\   |
  | | |____| | | | | | |_) | |  (__) | |__|  |  __/  __/   |
  | |______|_| |_| |_| .__/|_|\\_____/\\____,  |\\___|\\___|   |
  |                  |_|              |_____/              |
  |     __  __                                             |
  |    |  \\/  | ___ _ _ __   ___ _  __ __   ___  _ __      |
  |   | |\\/| |/  _' | '__ \\ /  _' |/ _'  |/ _  \\/ __|      |
  |  | |  | |  ( | | |  | |  ( | | ( |  |  ___/  |         |
  | |_|  |_|\\__,__|_|  |_|\\__,__|\\__,  |\\___|___|          |
  |                                |__/                    |
  '--------------------------------------------------------'`)
  
  const menuAnswer = await inquirer.prompt(test)

  console.log(menuAnswer.testMenuOptions)


 
  switch (menuAnswer.testMenuOptions) {
    case 'view all departments':
      viewDepartments()
      break;
    case 'view all roles':
      viewRoles()
      break;
    case 'view all employees':
      viewEmployees()
      break;
    default:
      break;
  }






}


async function viewDepartments() {
  const [departments] = await connection.execute(`SELECT * FROM department`);
  console.table(departments);
}

async function viewRoles() {
  const [roles] = await connection.execute(`SELECT * FROM roles`);
  console.table(roles);
}

async function viewEmployees() {
  const [employees] = await connection.execute(`SELECT * FROM employees`);
  console.table(employees);
}

function runMenu(){

}