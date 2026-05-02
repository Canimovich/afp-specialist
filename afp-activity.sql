select * from employee;

select last_name, first_name from employee;

select * from employee where last_name='Matthew' and email='jessie@gmail.com';

insert into employee (email, department_id, last_name, first_name, birthday, date_hired, created_date) values ('juan1@gmail.com', 3, 'Tamad','Juan', '1990-05-02', '2026-05-02','2026-05-02');

update employee set email = 'jessieb@gmail.com' where id=6;

update employee set salary=500 where department_id=2;

select last_name, first_name from employee where department_id ="2";

delete from employee where id=6;

select e.id, e.email, e.last_name , e.first_name, d.code , d.name   from employee e 
	inner join department d 
		on e.department_id = d.id where d.code = 'IT';

alter table employee_project drop foreign key employee_project_employee_fk;

select e.id, e.last_name, e.first_name, d.code, p.code, p.date_started from employee e 
	inner join employee_project ep 
		on e.id=ep.employee_id
	inner join project p 
		on p.id = ep.project_id
	inner join department d
		on e.department_id = d.id;
	