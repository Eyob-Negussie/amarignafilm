const express = require('express');
const router = express.Router();
const genre = require('../controllers/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res, next) => {
    const result = await genre.getGenre();
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const result = await genre.addGenre(req.body);
    res.send(result);
});

router.put('/:id', auth, async (req, res) => {
    const result = await genre.updateGenre(req.params.id, req.body);
    res.send(result);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const result = await genre.deleteGenre(req.params.id);
    res.send(result);
});

module.exports = router;