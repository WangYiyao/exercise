create database auth;
use auth;
create table authorized_users (name varchar(20),
							   password varchar(40),
							   primary key(name));
insert into authorized_users values('username','passeord');
insert into authorized_users values('tustuser',sha1('password'));