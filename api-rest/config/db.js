const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'project-gestion',
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    });

const User = require('../models/User')(sequelize);
const Project = require('../models/Project')(sequelize);
const Task = require('../models/Task')(sequelize);
User.hasMany(Project);
Project.hasMany(Task);


sequelize
    .sync({force: false})
    .then(() => console.log('La base de données à bien été synchronisée'))
    .catch((err) => console.error("Problème de synchronisation :", err.message)
    );
module.exports = {
    sequelize,
    User,
    Project,
    Task
}