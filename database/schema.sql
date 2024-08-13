CREATE TABLE characters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    base_stats JSON
);
CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    stats JSON
);
CREATE TABLE builds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    character_id INT,
    item_ids JSON,
    stats JSON,
    FOREIGN KEY (character_id) REFERENCES characters(id)
);