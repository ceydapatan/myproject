const Items = require("../model/items.model.js");

// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Member
    const items = new Items({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        imagePath: req.body.imagePath
    });

    // Save Customer in the database
    Items.create(items, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Items."
            });
        else res.send(data);
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Items.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving members."
            });
        else res.send(data);
    });
};
// Find a single Member with a memberId
exports.findOne = (req, res) => {
    Items.findById(req.params.itemsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Items with id ${req.params.itemsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Items with id " + req.params.itemsId
                });
            }
        } else res.send(data);
    });
};

// Update a Member identified by the memberId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Items.updateById(
        req.params.itemsId,
        new Items(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Member with id ${req.params.itemsId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Member with id " + req.params.itemsId
                    });
                }
            } else
                res.send(data);
        }
    );
};

// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
    Items.remove(req.params.itemsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.itemsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Member with id " + req.params.itemsId
                });
            }
        } else res.send({ message: `Member was deleted successfully!` });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    exports.deleteAll = (req, res) => {
        Items.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all members."
                });
            else res.send({ message: `All Members were deleted successfully!` });
        });
    };

};
