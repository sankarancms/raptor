import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { resJSON } from '../helpers';


const router = express.Router();


router.get('/test', (req, res, next) => {
    res.status(200).json(resJSON(true, 'working', {}, {}));
});

router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json(resJSON(false, '', {}, { email: 'Email already exists' }));
            } else {
                let newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            log.error(err)
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                return res.status(200).json({
                                    success: true,
                                    message: 'Registered successfully',
                                    errors: {},
                                    data: {
                                        user: user
                                    }
                                });
                            }).catch(err => {
                                log.error(err);
                                return res.status(500).json({
                                    success: false,
                                    message: 'Internal Server Error',
                                    errors: {},
                                    data: {}
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            log.error(err);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                errors: {},
                data: {}
            });
        });
});

router.post('/login', (req, res) => {

    // Check Validation
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                    username: user.username
                }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    getConfig('secretOrKey'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            errors: {},
                            data: { token: 'Bearer ' + token }
                        });
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            firstName: req.user.firstName,
            email: req.user.email
        });
    }
);


export default router;