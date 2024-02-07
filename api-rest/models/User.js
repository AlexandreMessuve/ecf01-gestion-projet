const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
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
                    args: [4,50],
                    msg: "Username length between 4 and 50"
                }
            }
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [8,50],
                    msg: "Password length between 8 and 50"
                }
            }
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    })
    return User;
}