insert into employees(firstName,lastName,role_id,manager_id) 
values 

('Diane','Murphy','1','0'),
('Mary','Patterson','2','1'),
('Jeff', 'Firrelli','3','1'),
('William','Patterson','4','1'),
('Gerard', 'Bondur','5','1'),
('George','Vanauf','6','1'),
('Joe','Gorga','7','5'),
('Karen','Huger','8','2'),
('Shep', 'Rose','9','4'),
('Cathryn','Calhoun','10','6'),
('Kyle', 'Richards','11','5'),
('Andy', 'Cohen','12','3');

insert into department(names)
values
('operations'),
('finance'),
('marketing'),
('human resources'),
('sales'),
('it');

insert into roles(title, salary, department_id)
value
('CEO', '22360486', '1'),
('CFO', '230145', '2'),
('CMO','159135', '3'),
('CHRO','153784', '4'),
('CRO','272354', '5'),
('CTO','180654', '6'),
('sales associate', '52486', '5'),
('accountant', '93215', '2'),
('HR manager','61984', '4'),
('technician','75784', '6'),
('sales manager','72354', '5'),
('marketing manager','58054', '3');
