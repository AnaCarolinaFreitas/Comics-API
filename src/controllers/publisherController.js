const publisherModel = require("../models/publisherModel");

const getPublishers = async (req, res) => {
    try {
        const publishers = await publisherModel.getPublishers();
        res.status(200).json(publishers);
    } catch (error) {
        console.error("Error fetching publishers:", error);
        res.status(500).json({ error: "Internal server error" });
    };
};

const getPublisherById = async (req, res) => {
    try {
        const publisher = await publisherModel.getPublisherById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ error: "Publisher not found" });
        }
        res.status(200).json(publisher);
    } catch (error) {
        res.status(404).json({ error: "Publisher not found" });
    }
};

const createPublisher = async (req, res) => {
    try {
        const {name, founder, year_founded} = req.body;
        const newPublisher = await publisherModel.createPublisher(name, founder, year_founded);
        res.status(201).json(newPublisher);
    } catch (error) {
        if (error.code === "23505") {
            res.status(409).json({ error: "Publisher already exists" });
        }
        res.status(404).json({ error: "Publisher not found" });
    }
};

const updatePublisher = async (req, res) => {
    try {
        const {name, founder, year_founded} = req.body;
        const updatedPublisher = await publisherModel.updatePublisher(req.params.id, name, founder, year_founded);
        if (!updatedPublisher) {
            return res.status(404).json({ error: "Publisher not found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Publisher not found" });
    }
};

const deletePublisher = async (req, res) => {
    try {
        const deletedPublisher = await publisherModel.deletePublisher(req.params.id);
        res.status(200).json(deletedPublisher);
    } catch (error) {
        res.status(404).json({ error: "Error on deleting" });
    }
};

module.exports = { getPublishers, getPublisherById, createPublisher, updatePublisher, deletePublisher };