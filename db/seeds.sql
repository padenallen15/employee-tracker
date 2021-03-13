INSERT INTO departments (department_name)
    VALUES
        ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Marketing'),
        ('Executive')
;

INSERT INTO roles (title, salary, department_id)
    VALUES
        ('Sales Person', 70000.00, 1),
        ('Lead Sales Person', 90000.00, 1),
        ('Engineer', 75000.00, 2),
        ('Lead Engineer', 95000.00, 2),
        ('Accountant', 60000.00, 3),
        ('Lead Accountant', 75000.00, 3),
        ('Lawyer', 85000.00, 4),
        ('Lead Lawyer', 105000.00, 4),
        ('Advertising Agent', 55000.00, 5),
        ('Lead Advertising Agent', 70000.00, 5),
        ('President of Operations', 500000.00, 6),
        ('CEO', 1500000.00, 6)
;

INSERT INTO managers (name, department_id)
    VALUES
        ('Abby Ferris', 1),
        ('Niklaus Mikkaelson', 2),
        ('Reggie Wayne', 3),
        ('Tyler Forest', 4),
        ('Regina Davis', 5),
        ('Paula Fields', 6),
        ('Paden Allen', 6)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
        ('Abby', 'Ferris', 2, 6),
        ('Niklaus', 'Mikkaelson', 4, 6),
        ('Reggie', 'Wayne', 6, 6),
        ('Tyler', 'Forest', 8, 6),
        ('Regina', 'Davis', 10, 6),
        ('Paula', 'Fields', 11, 7),
        ('Paden', 'Allen', 12, NULL),
        ('James', 'Fraser', 1, 1),
        ('Jack', 'London', 1, 1),
        ('Robert', 'Bruce', 3, 2),
        ('Peter', 'Greenaway', 3, 2),
        ('Derek', 'Jarman', 5, 3),
        ('Paolo', 'Pasolini', 5, 3),
        ('Heathcote', 'Williams', 7, 4),
        ('Sandy', 'Powell', 7, 4),
        ('Emily', 'Zola', 9, 5),
        ('Susan', 'Coalpits', 9, 5),
        ('Antoinette', 'Capet', 1, 1),
        ('Samuel', 'Delany', 1, 1),
        ('Tony', 'Duvert', 3, 2),
        ('Dennis', 'Cooper', 5, 3),
        ('Monica', 'Bellucci', 7, 4),
        ('Samuel', 'Johnson', 9, 5),
        ('John', 'Dryden', 1, 1),
        ('Alexander', 'Pope', 1, 1),
        ('Lionel', 'Johnson', 3, 2),
        ('Aubrey', 'Beardsley', 3, 2),
        ('Tulse', 'Luper', 5, 3),
        ('Greg', 'Jones', 7, 4)
;