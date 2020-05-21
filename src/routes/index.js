import express from 'express';

import users from '../api/users';

const router = express.Router();

router.get('/test', (req, res, next) => {
    res.status(200).json({ success: true, message: 'working', data: [] });
});

router.use('/api/users', users);

export default router;