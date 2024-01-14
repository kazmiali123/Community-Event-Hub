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
            type: DataTypes.STRING(1200),
            allowNull: false,
        },
        guidelines: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATEONLY,
            //allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        time: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            //allowNull: false,
        },
        location_name: {
            type: DataTypes.STRING(500),
            //allowNull: false,
        },
        location_lat: {
            type: DataTypes.DECIMAL(10, 6),
            //allowNull: false,
        },
        location_long: {
            type: DataTypes.DECIMAL(10, 6),
            //allowNull: false,
        },
         organizer_id: {
             type: DataTypes.INTEGER,
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