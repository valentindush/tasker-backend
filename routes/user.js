const { Signup, Login } = require('../controllers/userController');

const router = require('express').Router();

router.post('/signup', Signup)
router.post('/login',Login)


module.exports.usersRoute = router