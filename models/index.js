const Event = require('./event');
const User = require('./User');
const Image = require('./image');

// new comment
Event.hasOne(Image, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE',
});

Image.belongsTo(Event, {
    foreignKey: 'event_id',
});

User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(User, {
    foreignKey: 'user_id',
});

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { Event, User, Image };