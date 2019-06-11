const users = require('../controllers/user');

module.exports = async function (req, res, next) {
    const user = await users.getUser(req.user.id);
    if(!user.isAdmin){
        return res.status(403).send('Access denied');
    }

    next();
}
