import express from 'express';

const router = express.Router();

router.get('/settings', (req, res) => {
    const config = DB.model('configs');
    config.find().then(data => {
        res.json(data);
    });
});

export default router;