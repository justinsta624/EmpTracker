-- Pre-populate database for department table
INSERT INTO department (id, name) 
VALUES  (0, 'Sales & Marketing'),
        (1, 'Human Resource & Management'),
        (2, 'Research & Development'),
        (3, 'Production management'),
        (4, 'Legal');

-- Pre-populate database for role table
INSERT INTO roles (id, title, salary, department_id)
VALUES  (0, 'Sales Manager', 160000, 0),
        (1, 'Sales Team Leader', 120000, 0),
        (2, 'Sales Personnel', 80000, 0),        
        (3, 'H&R Manager', 140000, 1),
        (4, 'H&R Supervisor', 100000, 1),
        (5, 'Head Hunter', 60000, 1),
        (6, 'Plant Manager', 150000, 2),
        (7, 'R&D Team Leader', 115000, 2),
        (8, 'Lead Researcher', 80000, 2),                
        (9, 'Production Manager', 100000, 3),
        (10, 'Production Supervisor', 70000, 3),
        (11, 'Corporate Lawyer', 150000, 4),
        (12, 'Articling Student', 55000, 4);

-- Pre-populate database for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES  (0, 'Jude', 'Bellingham', 0, NULL),
        (1, 'Harry', 'Kane', 1, 0),
        (2, 'Jack', 'Grealish', 2, 0),
        (3, 'Kylian', 'Mbappe', 3, NULL),
        (4, 'Ousmane', 'Dembele', 4, 3),
        (5, 'Warren', 'Zaire-Emery', 5, 3),
        (6, 'Bernardo', 'Silva', 6, NULL),
        (7, 'Bruno', 'Fernandez', 7, 6),
        (8, 'Rafael', 'Leao', 8, 6),              
        (9, 'Erling', 'Haaland', 9, NULL),
        (10, 'Martin', 'Odegaard', 10, 9),
        (11, 'Jamal', 'Musiala', 11, NULL),
        (12, 'Florian', 'Wirtz', 12, 11);
