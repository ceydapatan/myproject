const sql = require("./db.js");

// constructor
const Items = function(items) {
    this.name = items.name;
    this.price = items.price;
    this.stock = items.stock;
    this.date = items.date;
    this.imagePath = items.imagePath;
};

Items.create = (newItems, result) => {
    sql.query("INSERT INTO items SET ?", newItems, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created items: ", { id: res.insertId, ...newItems });
        result(null, { id: res.insertId, ...newItems });
    });
};

Items.findById = (itemsId, result) => {
    sql.query(`SELECT * FROM items WHERE id = ${itemsId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found items: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Member with the id
        result({ kind: "not_found" }, null);
    });
};

Items.getAll = result => {
    sql.query("SELECT * FROM items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("items: ", res);
        result(null, res);
    });
};

Items.updateById = (id, items, result) => {
    sql.query(
        "UPDATE items SET name = ?, price = ?, stock = ? WHERE id = ?",
        [items.name, items.price, items.stock, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated items: ", { id: id, ...items });
            result(null, { id: id, ...items });
        }
    );
};

Items.remove = (id, result) => {
    sql.query("DELETE FROM items WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Member with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted items with id: ", id);
        result(null, res);
    });
};

Items.removeAll = result => {
    sql.query("DELETE FROM items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} items`);
        result(null, res);
    });
};

module.exports = Items;
