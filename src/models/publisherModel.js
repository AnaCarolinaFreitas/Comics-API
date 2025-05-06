const pool = require("../config/database");

const getPublishers = async () => {
    const result = await pool.query("SELECT * FROM publishers");
    return result.rows;
};

const getPublisherById = async (id) => {
    const result = await pool.query("SELECT * FROM publishers WHERE id = $1", [id]);
    return result.rows[0];
};

const createPublisher = async (name, founder, year_founded) => {
    const result = await pool.query(
        "INSERT INTO publishers (name, founder, year_founded) VALUES ($1, $2, $3) RETURNING *",
        [name, founder, year_founded]
    );
    return result.rows[0];
};

const updatePublisher = async (id, name, founder, year_founded) => {
    const result = await pool.query(
        "UPDATE publishers SET name = $1, founder = $2, year_founded = $3 WHERE id = $4 RETURNING *",
        [name, founder, year_founded, id]
    );
    return result.rows[0];
};

const deletePublisher = async (id) => {
    const result = await pool.query("DELETE FROM publishers WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        throw new Error("Publisher not found");
    }
    return result.rows[0];
};


module.exports = {getPublishers, getPublisherById, createPublisher, updatePublisher, deletePublisher};