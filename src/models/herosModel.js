const pool = require("../config/database.js");

const getHeros = async () => {
    const result = await pool.query(`SELECT heros.*, publishers.name AS publisher_name
        FROM heros
        LEFT JOIN publishers ON heros.publisher_id = publishers.id`);
    return result.rows;
};

const getHeroById = async (id) => {
    const result = await pool.query(`SELECT heros.*, publishers.name AS publisher_name
        FROM heros
        LEFT JOIN publishers ON heros.publisher_id = publishers.id
        WHERE heros.id = $1`, [id]);
    return result.rows[0];
};

const createHero = async (name, publisher_id, photo) => {
    const result = await pool.query(
        "INSERT INTO heroes (name, publisher_id, photo) VALUES ($1, $2, $3) RETURNING *",
        [name, publisher_id, photo]
    );
    return result.rows[0];
};

const updateHero = async (id, name, publisher_id, photo) => {
    const result = await pool.query(
        "UPDATE heros SET name = $1, publisher_id = $2, photo = $3 WHERE id = $4 RETURNING *",
        [name, publisher_id, photo, id]
    );
    return result.rows[0];
};

const deleteHero = async (id) => {
    const result = await pool.query("DELETE FROM heros WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        throw new Error("Hero not found");
    }
    return result.rows[0];
};

module.exports = {
    getHeros,
    getHeroById,
    createHero,
    updateHero,
    deleteHero,
};