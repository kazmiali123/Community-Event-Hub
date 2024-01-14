const sequelize = require('../config/connection');
const { User, Event, Image } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const imageData = require('./imageData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const events = await Event.bulkCreate(eventData);

    const images = await Image.bulkCreate(imageData);

    process.exit(0);
};

seedDatabase();