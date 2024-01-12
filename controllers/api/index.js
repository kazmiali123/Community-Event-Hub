const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./eventRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;