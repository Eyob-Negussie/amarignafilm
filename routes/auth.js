const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.post('/', async (req, res) => {
    try {
        const result = await auth.authUser(req.body);
        res.header('x-auth-token', result.token).send(result.user);
    }catch (error) {
        console.log('DDDDDDDDDDDDDDD error', error);
        if(error === 'Invalid email or password'){
            res.status(400).send(error)
        }else {
            res.status(500).send(error);
        }
    }
});

module.exports = router;