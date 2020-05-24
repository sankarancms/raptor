import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.get('/test', (req, res, next) => {
    res.status(200).json(helpers.toJSON(true, 'working', {}, {}));
});

router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json(helpers.toJSON(false, '', {}, { email: 'Email already exists' }));
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
                                return res.status(200).json(helpers.toJSON(
                                    true,
                                    'Registered successfully',
                                    {
                                        user: user
                                    },
                                    {},
                                ));
                            }).catch(err => {
                                log.error(err);
                                return res.status(500).json(helpers.toJSON(false, 'Internal Server Error', {}, {}));
                            });
                    });
                });
            }
        }).catch(err => {
            log.error(err);
            return res.status(500).json(helpers.toJSON(false, 'Internal Server Error', {}, {}));
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
            errors = {};
            errors.email = 'User not found';
            return res.status(404).json(helpers.toJSON(false, 'User not found', {}, errors));
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
                        res.json(helpers.toJSON(true, '', { token: 'Bearer ' + token }, {}));
                    }
                );
            } else {
                errors = errors || {};
                errors.password = 'Password incorrect';
                return res.status(400).json(helpers.toJSON(false, 'Password incorrect', {}, errors));
            }
        });
    });
});

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(helpers.toJSON(true, '', {
            id: req.user.id,
            firstName: req.user.firstName,
            email: req.user.email
        }, {}));
    }
);

router.get('/all', async (req, res, next) => {
    let user = DB.model('users');
    user.find().then(data => {
        res.json(data);
    });
});


export default router;