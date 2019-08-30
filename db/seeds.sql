DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(5000),
password VARCHAR(5000),
profile_pic text 
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
title VARCHAR(5000),
img text,
content text,
author_id INTEGER REFERENCES users(id)
);

INSERT INTO users(username,password,profile_pic)
VALUES ('DCRAZYLEGS', 'asdf','https://robohash.org/rrewrew' ),
 ('LEGSCRAZYD', 'fdsa','https://robohash.org/dingo' ),
 ('LEGSDCRAZY', 'sadf','https://robohash.org/ADFAFDS' );

INSERT INTO posts(title,img,content,author_id)
VALUES ('WOHOHO', 'https://i743.photobucket.com/albums/xx80/KenomeChan/676334108CAZSIESR.png?width=250&height=250&crop=1:1,smart', 'LOOKOUT FOOLS',1  ),
 ('WOHOHO', 'https://i65.photobucket.com/albums/h214/L_The_Legend/DeathNoteS01E09E.png?width=250&height=250&crop=1:1,smart', 'THOUGHT ABOUT THEN WAS LIKE NAH',2  ),
 ('ULYSSES', 'https://i217.photobucket.com/albums/cc312/mastersig/Avitars/For%20Me/DAngel.png?width=250&height=250&crop=1:1,smart', 'EFERYONE LOOKIN CRUNK',3  );
