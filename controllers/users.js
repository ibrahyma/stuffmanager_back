const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

exports.login = (req, res) =>
{
    Users.findOne().or([{ login: req.body.login }, { email: req.body.email }])
        .then(user =>
        {
            if (!user)
                return res.status(401).json({ message: "Pas d'utilisateur avec ce login ou cet email." });

            bcrypt.compare(req.body.password, user.password)
                .then(valid =>
                {
                    if (!valid)
                        return res.status(401).json({ message: "Mot de passe incorrect." });

                    res.status(200).json({
                        message: "Connecté",
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            "RANDOM_SECRET_KEY",
                            { expiresIn: 60000 }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: "Une erreur inattendue est survenue.", error: error }));
        })
        .catch(error => res.status(500).json({ error: error}));
};

exports.register = (req, res) =>
{
    bcrypt.hash(req.body.password, 10)
        .then(hash =>
        {
            new Users({ ...req.body, password: hash }).save()
                .then(() => res.status(201).json({ message: "Inscrit avec succès." }))
                .catch(error => res.status(400).json({ message: "Echec de l'inscription.", error: error }));
        })
        .catch(error => res.status(500).json({ message: "Une erreur inattendue est survenue.", error: error }));
};