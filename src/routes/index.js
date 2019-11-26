const router = require('express').Router();

router.get('/', (req, res, next) => {
    return res.status(200).json({ success: true, message: 'Application working' });
});

module.exports = router;