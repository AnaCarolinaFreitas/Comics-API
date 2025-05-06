CREATE DATABASE comics;
\c comics

CREATE TABLE publishers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    founder VARCHAR(100) NOT NULL,
    year_founded INT NOT NULL
);

CREATE TABLE heros(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    publisher_id INTEGER REFERENCES publishers(id) ON DELETE SET NULL,
    photo TEXT
);

INSERT INTO publishers (name, founder, year_founded) VALUES
('Marvel Comics', 'Martin Goodman', 1939),
('DC Comics', 'Malcolm Wheeler-Nicholson', 1934);

INSERT INTO heros (name, publisher_id, photo) VALUES
('Spider-man', 1, 'https://m.media-amazon.com/images/I/71aKvYqyBpL._AC_UF1000,1000_QL80_.jpg'),
('Iron Man', 1, 'https://majorspoilers.com/wp-content/uploads/2022/12/Invincible-Iron-Man-1-Cover-scaled.jpg'),
('Batman', 2, 'https://static.wikia.nocookie.net/dccomics/images/0/08/Batman_Vol_3_131_Textless_Fabok_Variant.jpg/revision/latest?cb=20240221225901&path-prefix=pt'),
('Wonder Woman', 2, 'https://baudashqs.com/wp-content/uploads/2023/09/large-1912390-450x682.jpg'),
('Black Widow', 1, 'https://sanctumsanctorumcomics.com/cdn/shop/products/23719-hr.jpg?v=1635186937'),
('Winter Soldier', 1, 'https://comicsrus.com.au/cdn/shop/files/IMG_7600_1024x1024.jpg?v=1723178619'),
('Flash', 2, 'https://m.media-amazon.com/images/I/81xPL0TBbNL._AC_UF1000,1000_QL80_.jpg'),
('Superman', 2, 'https://www.yourdecoration.com/cdn/shop/files/abystyle-abydco754-dc-comics-superman-poster-61x91-5cm_2e22d54f-c92d-4acb-a8f3-efc49d9ec202.jpg?v=1721810611');

