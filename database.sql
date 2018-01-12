CREATE TABLE authors ( 
	id SERIAL PRIMARY KEY,
    whoseJoke VARCHAR(50) NOT NULL

);

CREATE TABLE jokes (
    id SERIAL PRIMARY KEY,
    jokeQuestion VARCHAR(255) NOT NULL,
    punchLine VARCHAR(255) NOT NULL,
    funniness INT DEFAULT 1,
	authors_id INT REFERENCES authors
);



INSERT INTO jokes (jokeQuestion, punchLine, authors_id)
VALUES ('Why do scuba divers fall backwards out of boats?','If they fell forwards they''d still be in the boat!', 1), 
('Twofish are in a tank. What did one fish say to the other?','Do you know how to drive this thing?', 2),
('What do you call a pile of cats?','A meowntain!', 3 ),
( 'Why should you not play cards in the forest?', 'Too many Cheetahs!', 4 ),
('I went to the zoo the other day, it had one dog...','It was a shih tzu.', 5);

INSERT INTO authors (whoseJoke) 
VALUES ('Danny'), ('Luke'), ('Millie'),('dEv'), ('Scott') ;

DROP TABLE jokes, authors;

SELECT * 
FROM jokes 
JOIN authors ON authors.id = authors_id;