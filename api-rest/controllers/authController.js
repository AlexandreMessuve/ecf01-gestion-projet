const { User } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    register: async (req, res) => {
        try {
            const {username, password, firstname, lastname} = req.body;
            if (username && password) {
                const hashPassword = await bcrypt.hashSync(password, 10);
                const user = {
                    username: username,
                    password: hashPassword,
                    firstname: firstname ? firstname : null,
                    lastname: lastname ? lastname : null
                };
                await User.create(user);
                res.status(201).json({message: "Utilisateur créé avec succés"});
            } else {
                res.status(400).json({message: "Les champs requis ne sont pas remplis"});
            }

        } catch (error) {
            res.status(500).json(error);
        }
    },

    authenticate: async (req, res) => {
        try {
            const {username, password} = req.body;
            if (username && password) {
                const user = await User.findOne({where: {username: username}})
                if (!user) {
                    res.status(400).json({message: "Email ou mot de passe incorrect"});
                    return;
                }
                if (bcrypt.compareSync(password, user.password)) {
                    const payload = {
                        userId: user.id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname
                    }
                    const token = jwt.sign(payload, process.env.JWT_PASSPHRASE, {expiresIn: "1d"});
                    res.status(200).json({token: token});
                } else {
                    res.status(400).json({message: "Email ou mot de passe incorrect"});
                }
            } else {
                res.status(400).json({message: "Tous les champs sont requis !"});
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}