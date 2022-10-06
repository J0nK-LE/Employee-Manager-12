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

start();
initialize();
main();


async function initialize() {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employeetracker_db'
  })
}

function start() {
  console.log(`  ,--------------------------------------------------------.
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
}

async function main() {
  
  const menuAnswer = await inquirer.prompt(menuQuestion)

  console.log(menuAnswer.menuOptions)


 
  switch (menuAnswer.menuOptions) {
    case 'view all departments':
      viewDepartments()
      break;
    case 'view all roles':
      viewRoles()
      break;
    case 'view all employees':
      viewEmployees()
      break;
    case 'add a department':
      addDepartment()
      break;
    case 'add a role':
      addRole()
      break;
    case 'add an employee':
      addEmployee()
      break;
    case 'update employee role':
      updateRole()
      break;
    default:

      break;
  }






}


async function viewDepartments() {
  const [departments] = await connection.execute(`SELECT * FROM department`);
  console.table(departments);
  await main()
}

async function viewRoles() {
  const [roles] = await connection.execute(`SELECT roles.id, roles.title, roles.salary, department.names as "Department" FROM employeetracker_db.roles INNER JOIN department  on department.id = roles.department_id;`);
  console.table(roles);
  await main()
}

async function viewEmployees() {
  const [employees] = await connection.execute(`SELECT A.id, A.firstName AS "First Name", A.lastName AS "Last Name", roles.title, department.names AS "Department", roles.salary, B.firstName AS "Manager" FROM employees A INNER JOIN roles  on roles.id = A.role_id INNER JOIN department  on department.id = roles.department_id left join employees B on A.manager_id = B.id `);
  console.table(employees);
  await main()
}

async function addDepartment(){
  const departmentAnswer = await inquirer.prompt(addDepartments)
  let newDepartment = departmentAnswer.departmentName
  const [departmentAdded] = await connection.execute(`INSERT INTO department(names) VALUES ('${newDepartment}');select * From department`);
  console.table(departmentAdded)
  
  main()
}

// async function addRole(){

//   main()
// }

// async function addEmployee(){

//   main()
// }

// async function updateRole(){
  
//   main()
// }

