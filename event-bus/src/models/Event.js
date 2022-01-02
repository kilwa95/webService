const {Model,DataTypes} = require('sequelize');
const connection = require('../config/sequelize');

class Event extends Model {}
Event.init(
    {
        type:{ type: DataTypes.STRING,allowNull:false},
        data:{ type: DataTypes.JSON,allowNull:false},
    },
    {
        sequelize: connection,
        modelName: 'Event',
    }
)

Event.sync({
	alter: true
})

module.exports = Event;
