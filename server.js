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
    welcome();
};

// What do you want to do?
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
        // Do ... depending on user's answer
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

// Do you want to do something else?
continueFun = async () => {
    // Waiting for the tables to be displayed before asking the continue question
    setTimeout(async function(){
        await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: "Is there anything else you would like to do?",
            }
        ])
        .then(function(data){
            if (data.continue) {
                welcome();
            } else {
                connection.end();
            }
        })
    }, 1000)
}

// Departments
viewDepartments = async () => {
    connection.query('SELECT * FROM departments ORDER BY department_name', function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res);
        console.log(table);
    });
    
    // Viewing departments
    setTimeout(async function(){
        if (action === "view") {
            continueFun();
        }
    })

    // Adding a department
    setTimeout(async function(){
        if (action === "add") {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "What is the name of the department you would like to add?",
                }
            ])
            .then(function(data){
                connection.query("INSERT INTO departments (department_name) VALUES ('" + data.name + "')", function(err, res) {
                    if (err) throw err;
                    console.log("A new department has been added");
                    var table = cTable.getTable(res);
                    console.log(table);
                });
            })
            continueFun();
        }
    }, 1000);
    
};

// Roles
viewRoles = async () => {
    connection.query('SELECT roles.id, title, salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY salary DESC', function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res);
        console.log(table);
    });
     
    // Viewing roles
    setTimeout(async function(){
        if (action === "view") {
            continueFun();
        }
    })

    // Adding a role
    setTimeout(async function(){
        if (action === "add") {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "What is the title of the role?",
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is the salary of the role?",
                },
                {
                    type: 'list',
                    name: 'dept',
                    message: "Which department does the role belong to?",
                    choices: ["Sales", "Engineering", "Finance", "Legal", "Marketing", "Executive"]
                }
            ])
            .then(function(data){
                var deptId = "";
                switch (data.dept) {
                    case "Sales":
                        deptId = 1;
                    break;
                    case "Engineering":
                        deptId = 2;
                    break;
                    case "Finance":
                        deptId = 3;
                    break;
                    case "Legal":
                        deptId = 4;
                    break;
                    case "Marketing":
                        deptId = 5;
                    break;
                    case "Executive":
                        deptId = 6;
                    break;

                }
                connection.query("INSERT INTO roles (title, salary, department_id) VALUES ('" + data.title + "', '" + data.salary + "', '" + deptId + "')", function(err, res) {
                    if (err) throw err;
                    console.log("A new role has been added");
                    var table = cTable.getTable(res);
                    console.log(table);
                });
            })
            continueFun();
        }
    }, 1000);
};

// Employees
viewEmployees = async () => {
    connection.query('SELECT employees.id, first_name, last_name, roles.title, roles.salary, managers.name AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN managers ON employees.manager_id = managers.id ORDER BY salary DESC', function(err, res) {
        if (err) throw err;
        var table = cTable.getTable(res);
        console.log(table);
    });
    
    // Viewing employees
    setTimeout(async function(){
        if (action === "view") {
            continueFun();
        }
    })
    
    // Adding an employee
    setTimeout(async function(){
        if (action === "add") {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the first name of the employee?",
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the last name of the employee?",
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the role of the employee?",
                    choices: ["Sales Person", "Engineer", "Accountant", "Lawyer", "Advertising Agent"]
                },
            ])
            .then(function(data){
                var roleId = "";
                var managerId = "";
                switch (data.role) {
                    case "Sales Person":
                        roleId = 1;
                        managerId = 1;
                    break;
                    case "Engineer":
                        roleId = 3;
                        managerId = 2;
                    break;
                    case "Accountant":
                        roleId = 5;
                        managerId = 3;
                    break;
                    case "Lawyer":
                        roleId = 7;
                        managerId = 4;
                    break;
                    case "Advertising Agent":
                        roleId = 9;
                        managerId = 5;
                    break;
                }
                
                connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('" + data.firstName + "', '" + data.lastName + "', '" + roleId + "', '" + managerId + "')", function(err, res) {
                    if (err) throw err;
                    console.log("The new employee has been added");
                    var table = cTable.getTable(res);
                    console.log(table);
                });
            })
            continueFun();
        }
    }, 1000);

    // Updating an employee
    setTimeout(async function(){
        if (action === "update") {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: "What is the id number of the employee you want to update?",
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the new role of the employee?",
                    choices: ["Sales Person", "Engineer", "Accountant", "Lawyer", "Advertising Agent"]
                }
            ])
            .then(function(data){
                var roleId = "";
                switch (data.role) {
                    case "Sales Person":
                        roleId = 1;
                        managerId = 1;
                    break;
                    case "Engineer":
                        roleId = 3;
                        managerId = 2;
                    break;
                    case "Accountant":
                        roleId = 5;
                        managerId = 3;
                    break;
                    case "Lawyer":
                        roleId = 7;
                        managerId = 4;
                    break;
                    case "Advertising Agent":
                        roleId = 9;
                        managerId = 5;
                    break;
                }
                
                connection.query('UPDATE employees SET ?, ? WHERE ?',
                [
                  {
                    role_id: roleId
                  },
                  {
                    manager_id: managerId
                  },
                  {
                    id: data.id 
                  }
                ], function(err, res) {
                    if (err) throw err;
                    console.log("The employee's role and manager have been updated");
                    var table = cTable.getTable(res);
                    console.log(table);
                });
            })
            continueFun();
        }
    }, 1000);
};
