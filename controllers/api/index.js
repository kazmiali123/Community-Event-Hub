const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const imageRoutes = require('./imageRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/images', imageRoutes);

module.exports = router;