const user = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const postRegister = async (req, res) => {
    try {
        const {username, mail, password} = req.body;

        // check if the user exists
        const userExists = await user.exists({mail:mail.toLowerCase()});
        
            if (userExists) {
                return res.status(409).send('Email already in use.');
            }

        // hashing the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //create user doc and save in our DB
        const user = await user.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword
        });

        //create JWT token -> can enter protected routes
        const token = jwt.sign(
            {
                userID: user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h',
            }
        );

        //send response to client
        res.send(201).json({
            mail: user.mail, 
            token: token,
            username: user.username,
        });

    } catch(err) {
        return res.status(500).send('Error occured. Please try again.');
    } 
};


module.exports = postRegister;