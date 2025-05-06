const express = require('express');
const router = express.Router();
const herosController = require('../controllers/herosController');
const upload = require('../config/upload');
const apiKeyMiddleware = require('../config/apiKey');

router.use(apiKeyMiddleware);

router.get('/', herosController.getHeros);
router.get('/:id', herosController.getHeroById);
router.post('/', herosController.createHero);
router.put('/:id', herosController.updateHero);
router.delete('/:id', herosController.deleteHero);

module.exports = router;