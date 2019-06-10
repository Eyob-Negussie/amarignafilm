const express = require('express');
const router = express.Router();
const customer = require('../controllers/customer');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await customer.getCustomer();
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const result = await customer.addCustomer(req.body);
    res.send(result);
});

router.put('/:id', auth, async (req, res) => {
    const result = await customer.updateCustomer(req.params.id, req.body);
    res.send(result);
});

router.delete('/:id', auth, async (req, res) => {
    const result = await customer.deleteCustomer(req.params.id);
    res.send(result);
});

module.exports = router;