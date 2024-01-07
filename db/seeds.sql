-- Pre-populate database for department table
INSERT INTO department (id, name) 
VALUES  (1, 'Sales & Marketing'),
        (2, 'Human Resource & Management'),
        (3, 'Research & Development'),
        (4, 'Production management'),
        (5, 'Legal');

-- Pre-populate database for role table
INSERT INTO role (id, title, salary, department_id) 
VALUES  (1, 'Sales Manager', 160000, 1),
        (2, 'Sales Team Leader', 120000, 1),
        (3, 'Sales Personnel', 80000, 1),        
        (4, 'H&R Manager', 140000, 2),
        (5, 'H&R Supervisor', 100000, 2),
        (6, 'Head Hunter', 60000, 2),
        (7, 'Plant Manager', 150000, 3),
        (8, 'R&D Team Leader', 115000, 3),
        (9, 'Lead Researcher', 80000, 3),                
        (10, 'Production Manager', 100000, 4),
        (11, 'Production Supervisor', 70000, 4),
        (12, 'Corporate Lawyer', 150000, 5),
        (13, 'Articling Student', 55000, 5);

-- Pre-populate database for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES  (1, 'Jude', 'Bellingham', 1, NULL),
        (2, 'Harry', 'Kane', 2, 1),
        (3, 'Jack', 'Grealish', 3, 1),
        (4, 'Kylian', 'Mbappe', 4, NULL),
        (5, 'Ousmane', 'Dembele', 5, 4),
        (6, 'Warren', 'Zaire-Emery', 6, 4),
        (7, 'Bernardo', 'Silva', 7, NULL),
        (8, 'Bruno', 'Fernandez', 8, 7),
        (9, 'Rafael', 'Leao', 9, 7),              
        (10, 'Erling', 'Haaland', 10, NULL),
        (11, 'Martin', 'Odegaard', 11, 10),
        (12, 'Jamal', 'Musiala', 12, NULL),
        (13, 'Florian', 'Wirtz', 13, 12);
