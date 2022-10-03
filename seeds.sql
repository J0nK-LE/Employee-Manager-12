insert into employees(`firstName`,`lastName`,`role_id`,`manager_id`) 
values 

('Diane','Murphy','2','1'),

('Mary','Patterson','1','1'),

('Jeff', 'Firrelli','3','1'),

('William','Patterson','4','6'),

('Gerard', 'Bondur','5','4'),

('George','Vanauf','6','4'),


insert into department(name)
values
('sales'),
('finance'),
('marketing'),
('human resources'),
('operations'),
('it');

insert into roles(`title`, `salary`, `department_id`)
value
('CRO', '160486.50', '1'),
('CFO', '230145.65', '2'),
('CMO','159135.26', '3'),
('CHRO','153784.97', '4'),
('COO','272354.26', '5'),
('CTO','180654.48', '6');
