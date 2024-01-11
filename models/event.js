const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model { }

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guidelines: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_lat: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        location_long: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        organizer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports = Event;