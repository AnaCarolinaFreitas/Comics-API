const herosModel = require('../models/herosModel');

const getHeros = async (req, res) => {
    try {
        const { name } = req.query;
        const heros = await herosModel.getHeros(name);
        res.status(200).json(heros);
    } catch (error) {
        res.status(404).json({ error: "Error searching Heros" });
    }
};

const getHeroById = async (req, res) => {
    try {
        const hero = await herosModel.getHeroById(req.params.id);
        if (!hero) {
            return res.status(404).json({ error: "Hero not found" });
        }
        res.status(200).json(hero);
    } catch (error) {
        res.status(404).json({ error: "Hero not found" });
    }
};

const createHero = async (req, res) => {
    try {
        const {name, publisher_id} = req.body;
        const photo = req.file ? req.file.filename : null;
        const newHero = await herosModel.createHero(name, publisher_id, photo);
        res.status(201).json(newHero);
    } catch (error) {
        if (error.code === "23505") {
            res.status(409).json({ error: "Hero already exists" });
        }
        res.status(500).json({ error: "Error creating hero" });
    }
};

const updateHero = async (req, res) => {
    try {
        const {name, publisher_id, photo} = req.body;
        const updatedHero = await herosModel.updateHero(req.params.id, name, publisher_id, photo);
        if (!updatedHero) {
            return res.status(404).json({ error: "Hero not found" });
        }
        res.status(200).json(updatedHero);
    } catch (error) {
        res.status(500).json({ error: "Error updating hero" });
    }
};

const deleteHero = async (req, res) => {
    try {
        const deletedHero = await herosModel.deleteHero(req.params.id);
        res.status(200).json(deletedHero);
    } catch (error) {
        res.status(404).json({ error: "Error deleting hero" });
    }
};

module.exports = { getHeros, getHeroById, createHero, updateHero, deleteHero };

