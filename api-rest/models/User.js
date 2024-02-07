const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [4, 50],
                    msg: "Username length between 4 and 50"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    });
}