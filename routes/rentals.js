const express = require('express');
const router = express.Router();
const rentals = require('../controllers/rental');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await rentals.getRentals();
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const result = await rentals.addRentals(req.body);
    res.send(result);
});

router.put('/:id', auth, async (req, res) => {
    const result = await rentals.updateRentals(req.params.id, req.body);
    res.send(result);
});

router.delete('/:id', auth, async (req, res) => {
    const result = await rentals.deleteRentals(req.params.id);
    res.send(result);
});

module.exports = router;