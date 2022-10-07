const mysql = require('mysql2/promise');
let inquirer = require("inquirer");


let connection

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
  |    |  \\/  | __ _ _ __   ___ _  __ __   ___  _ __       |
  |   | |\\/| |/  _' |'__ \\ /  _' |/ _'  |/ _  \\/ __|       |
  |  | |  | |  ( | | |  | |  ( | | ( |  |  ___/ |          |
  | |_|  |_|\\__,__|_|  |_|\\__,__|\\__,  |\\___|___|          |
  |                                |__/                    |
  '--------------------------------------------------------'`)
}

async function main() {
  
  const menuQuestion = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'menuOptions',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', "I'm finished"]
  }]
  const menuAnswer = await inquirer.prompt(menuQuestion)
  // console.log(menuAnswer.menuOptions)


 
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
      process.exit()
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
  const addDepartments = [{
    type: 'input',
    message: 'Name of the department you want to add?',
    name: 'departmentName'
  }]
  const departmentAnswer = await inquirer.prompt(addDepartments)
  
  const newDepartment = departmentAnswer.departmentName
  
  await connection.execute(`INSERT INTO department(names) VALUES ('${newDepartment}');`)

  console.log(`${newDepartment} department added!`)
  
  main()
}

async function addRole(){
  try {
    
    const [departments] = await connection.execute(`SELECT * FROM department;`)
  
    const addRoles = [{
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
      choices: departments.map(department => ({
        name:department.names, value:department.id
      }))
    },
    ]

    const addRoleAnswers = await inquirer.prompt(addRoles)
    
    const roleName = addRoleAnswers.roleName
    const roleSalary = addRoleAnswers.roleSalary
    const roleDepartment = addRoleAnswers.roleDepartment
  
    
    await connection.execute(`INSERT INTO roles(title, salary, department_id) VALUES (?,?,?);`, [roleName,roleSalary,roleDepartment])

    console.log(`${roleName} role added!`)
  
    main()
  } catch (error) {
    console.log(error)
  }
}


async function addEmployee(){


  try {
    const [roles] = await connection.execute(`SELECT * FROM roles;`)
    const [employees] = await connection.execute(`SELECT * FROM employees;`)

    
    const addEmployees = [{
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
      type: 'list',
    message: 'What is the employees role?',
    name: 'empRole',
    choices: roles.map(role => ({
      name:role.title, value:role.id}))
  },
  {
    type: 'list',
    message: 'Who is the employees manager?',
    name: 'empManager',
    choices: employees.map(employee => ({
      name: (employee.firstName + " " + employee.lastName), value:employee.id}))
  }
]
  const addEmpAnswers = await inquirer.prompt(addEmployees)
  
  const empFirstName = addEmpAnswers.empFirstName
  const empLastName = addEmpAnswers.empLastName
  const empRole = addEmpAnswers.empRole
  const empManager = addEmpAnswers.empManager
  
  await connection.execute(`INSERT INTO employees(firstName, lastName, role_id, manager_id) VALUES (?,?,?,?);`, [empFirstName,empLastName,empRole,empManager])

  console.log(`${empFirstName} ${empLastName} role added!`)
  main()
} catch (error) {
  console.log(error)
}
}

async function updateRole(){
  try {
    const [roles] = await connection.execute(`SELECT * FROM roles;`)
    const [employees] = await connection.execute(`SELECT * FROM employees;`)

    
    const updateRoles = [{
      type: 'list',
      message: 'Which employee would you like to update?',
      name: 'employeeEdit',
      choices: employees.map(employee => ({
        name: (employee.firstName + " " + employee.lastName), value:employee.id}))
    },
    {
      type: 'list',
      message: 'What is their new role?',
      name: 'newRole',
      choices: roles.map(role => ({
        name:role.title, value:role.id}))
    }]

    const roleUpdateAnswers = await inquirer.prompt(updateRoles)
  
    
    const employeeEdit = roleUpdateAnswers.employeeEdit
    const newRole = roleUpdateAnswers.newRole
    // console.log(employeeEdit)
    // console.log(newRole)
    
    await connection.execute(`UPDATE employees SET role_id = (?) WHERE id=(?) ;`, [newRole,employeeEdit])
  
    console.log(`Role updated!`)

    main()
  } catch (error) {
    console.log(error)
  }
}

