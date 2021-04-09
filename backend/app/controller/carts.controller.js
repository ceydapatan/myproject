const Cart = require("../model/carts.model.js");

// Create and Save a new Cart
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Cart
    const cart = new Cart({
        id: req.body.id,
        anzahl: req.body.anzahl,
        userid: req.body.userid
    });

    // Save Customer in the database
    Cart.create(cart, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cart."
            });
        else res.send(data);
    });

};

// Retrieve all Carts from the database.
exports.findAll = (req, res) => {
    Cart.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving carts."
            });
        else res.send(data);
    });

};

// Find a single Cart with a cartId
exports.findOne = (req, res) => {
    Cart.findById(req.params.cartId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cart with id ${req.params.cartId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Cart with id " + req.params.cartId
                });
            }
        } else res.send(data);
    });

};

// Update a Cart identified by the cartId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cart.updateById(
        req.params.cartId,
        new Cart(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Cart with id ${req.params.cartId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Cart with id " + req.params.cartId
                    });
                }
            } else res.send(data);
        }
    );

};

// Delete a Cart with the specified cartId in the request
exports.delete = (req, res) => {
    Cart.remove(req.params.cartId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cart with id ${req.params.cartId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Cart with id " + req.params.cartId
                });
            }
        } else res.send({ message: `Cart was deleted successfully!` });
    });

};

// Delete all Carts from the database.
exports.deleteAll = (req, res) => {
    Cart.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all carts."
            });
        else res.send({ message: `All Carts were deleted successfully!` });
    });

};
