const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [4, 50],
                    msg: "Title length between 4 and 50"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        end_date:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    });
}