use development;
CREATE TABLE `addresses` (
	`id` varchar(40) NOT NULL PRIMARY KEY,
    	`userId` int,
	`street` varchar(100) NOT NULL,
	`aptno` varchar(100),
	`city` varchar(100) NOT NULL,
	`zipcodde` int(5) NOT NULL
);

use development;
CREATE TABLE `orders` (
	`id` varchar(100) NOT NULL PRIMARY KEY,
	`userId` int,
    `storeId` int,
	`status` varchar(100) NOT NULL,
    `total` decimal NOT NULL,
	`paymentId` varchar(100),
	`type` varchar(20) NOT NULL,
	`orderDate` datetime NOT NULL,
    `completionDate` datetime
);
drop table if exists orderItem;
CREATE TABLE `orderItem` (
	`orderId` varchar(100) NOT NULL,
	`itemId` varchar(20) NOT NULL,
    `quantity` int
);

ALTER TABLE products MODIFY id varchar(100) 
ALTER TABLE services MODIFY id varchar(100) 

use development;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(45) NOT NULL,
  `user_last_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `auth_token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

ALTER TABLE orders MODIFY storeId varchar(100);

create view WeeklyRevenue as
select week(orderDate) as week , storeId,avg(total) as total from orders group by week(orderDate), storeId;

Create view ProductCount as
select p.title, p.id, a.quantity, a.storeId  from
(select oi.itemId, sum(oi.quantity) as quantity, o.storeId  from orderItem oi
Left Join orders o on oi.orderId = o.id
Group by o.storeId, oi.itemId) as a
Inner Join products p on a.itemId = p.id

Create view ProductCount as
select oi.itemId, sum(oi.quantity) as quantity, o.storeId  from orderItem oi
Left Join orders o on oi.orderId = o.id
Group by o.storeId, oi.itemId

Create view ItemCount as
select oi.itemId, sum(oi.quantity) as quantity, o.storeId  from orderItem oi
Left Join orders o on oi.orderId = o.id
Group by o.storeId, oi.itemId