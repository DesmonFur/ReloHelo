SELECT * FROM users u 
JOIN posts p ON u.id = p.author_id  
WHERE title LIKE $1
