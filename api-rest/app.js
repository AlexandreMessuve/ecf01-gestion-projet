require('dotenv/config');
const express = require('express');
const DB = require('./config/db');
const allRoutes = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()).use(cors()).use('/', allRoutes);


DB.sequelize
    .authenticate()
    .then(() => console.log('Connexion à la base de données réussie'))
    .then(() => {
        app.listen(port, () => {
            console.log(`Serveur sur écoute sur le port: ${port}`);
        });
    })
    .catch((err) => {
        console.log(
            'Erreur lors de la connexion à la base de données',
            err.message
        );
    });