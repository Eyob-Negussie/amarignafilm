const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await users.getUsers();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const result = await users.getUser(req.params.id);
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const result = await users.addUsers(req.body);
    res.header('x-auth-token', result.token).send(result.id);
});

router.put('/:id', auth, async (req, res) => {
    const result = await users.updateUsers(req.params.id, req.body);
    res.send(result);
});

router.delete('/:id', auth, async (req, res) => {
    const result = await users.deleteUsers(req.params.id);
    res.send(result);
});

module.exports = router;