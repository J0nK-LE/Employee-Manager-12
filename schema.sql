DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE department (
  id INT NOT NULL auto_increment primary key,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL auto_increment primary key,
  title VARCHAR(30) NOT NULL
  salary DECIMAL NOT NULL
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL auto_increment primary key,
  firstName VARCHAR(30) NOT NULL
  lastName VARCHAR(30) NOT NULL
  role_id INT NOT NULL
  manager_id INT NOT NULL
);
