const users = require('../controllers/user');

module.exports = async function (req, res, next) {
    console.log('WWWWWWWWWWWWWWWWWWW', req.user);
    const user = await users.getUser(req.user.id);
    if(!user.isAdmin){
        return res.status(403).send('Access denied');
    }

    next();
}
