const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
var action = "";

// Creates the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: '*****',
  database: 'company'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});

afterConnection = () => {
//   connection.query('SELECT * FROM employees', function(err, res) {
//     if (err) throw err;
//     var table = cTable.getTable(res);
//     console.log(table);
//     connection.end();
//  });
    welcome();
};

welcome = async () => {
    action = "";
    await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "Welcome! What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee"]
        }
    ])
    .then(function(data){
        switch (data.action) {
            case "View All Departments":
                action = "view";
                viewDepartments();
            break;
            case "View All Roles":
                action = "view";
                viewRoles();
            break;
            case "View All Employees":
                action = "view";
                viewEmployees();
            break;
            case "Add A Department":
                action = "add";
                viewDepartments();
            break;
            case "Add A Role":
                action = "add";
                viewRoles();
            break;
            case "Add An Employee":
                action = "add";
                viewEmployees();
            break;
            case "Update An Employee":
                action = "update";
                viewEmployees();
            break;
        }
    })
}
  
  
viewDepartments = async () => {
    connection.query('SELECT department_name FROM departments ORDER BY department_name', function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res);
        console.log(table);
        connection.end();
    });
};

viewRoles = async () => {
    connection.query('SELECT title, salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY salary DESC', function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res);
        console.log(table);
        connection.end();
    });
};

viewEmployees = async () => {
    connection.query('SELECT first_name, last_name, roles.title, roles.salary, managers.name AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN managers ON employees.manager_id = managers.id ORDER BY salary DESC', function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res);
        console.log(table);
        connection.end();
    });
};
