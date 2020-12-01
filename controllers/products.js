const Products = require('../models/products');

exports.add = (req, res) =>
{
    new Products({ ...req.body }).save()
        .then(product => res.status(201).json({ message: "Produit ajouté.", product: product }))
        .catch(error => res.status(400).json({ message: "Echec de l'ajout.", error: error }));
};

exports.delete = (req, res) =>
{
    Products.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Produit supprimé." }))
        .catch(error => res.status(400).json({ error: error }));
};

exports.getAll = (req, res) =>
{
    Products.find()
        .then(products => res.status(200).json(products.length ? { products: products } : { products: null }))
        .catch(error => res.status(500).json({ error: error }));
};

exports.getOne = (req, res) =>
{
    Products.findOne({ _id: req.params.id })
        .then(product =>
        {
            if (!product)
                return res.status(404).json({ message: "Ce produit n'existe pas ou a été retiré." });

            res.status(200).json({ product: product });
        })
        .catch(() => res.status(500).json({ message: "Ce produit n'existe pas ou a été retiré." }));
};

exports.set = (req, res) =>
{
    Products.updateOne({ _id: req.params.id }, { ...req.body })
        .then(() => res.status(201).json({ message: "Produit mis à jour." }))
        .catch(error => res.status(400).json({ error: error }));
};