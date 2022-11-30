const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/authControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12),
    password: Joi.string().min(6).max(12),
    mail: Joi.string().email(),
});

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(12),
    password: Joi.string().min(6).max(12),
});

router.post('/register',
            validator.body(registerSchema),
            authControllers.controllers.postRegister);
router.post('/login',
            validator.body(loginSchema),
            authControllers.controllers.postLogin); 

//testing route to verify the 
router.get('/test', auth, (req, res) => {
    res.send('request passed');
});

module.exports = router;

