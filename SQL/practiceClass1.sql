CREATE DATABASE college;
CREATE DATABASE IF NOT EXISTS instagram;

USE instagram;
CREATE TABLE user (
	id INT,
    age INT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE,
    followers INT,
    following INT,
    CONSTRAINT age_check CHECK (age>=13),
    PRIMARY KEY (id)
    );
 
 INSERT INTO user 
 (id, age, name, email, followers, following)
 VALUES
 (1 , 14 , "adam" , "adam@yahoo.com" , 123 , 45),
 (2 , 15 , "bob" , "bob@yahoo.com" , 145 , 233),
 (3 , 16 , "casy" , "casy@email.com" , 142 , 322),
 (4 , 17 , "donald" , "donald@gmail.com" , 452 , 232);
 
INSERT INTO user 
 (id, age, name, email, followers, following)
 VALUES
 (5 , 14 , "farah" , "farah@yahoo.com" , 230 , 452),
 (6 , 16 , "naina" , "naina@yahoo.com" , 320 , 120);
 
SELECT name,age,followers 
FROM user
ORDER BY followers DESC;

SELECT max(followers)
FROM user;
 
SELECT age , max(followers)
FROM user
GROUP BY age
HAVING max(followers) > 200
ORDER BY age DESC;

UPDATE user
SET followers = 600
WHERE age = 16;

DELETE FROM user
WHERE age = 14;

SET SQL_SAFE_UPDATES = 0;
SELECT * FROM user;





SELECT DISTINCT age FROM user;

 
CREATE TABLE post (
	id INT PRIMARY KEY,
    content VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO post
(id, content, user_id)
VALUES
(101, "Hello World", 3),
(102, "Bye Bye", 1),
(103, "Hello Delta", 3);

SELECT * FROM post;