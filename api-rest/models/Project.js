const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Project', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [4, 50],
                    msg: "Username length between 4 and 50"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
}