const sql = require("./db.js");

// constructor
const Cart = function(cart) {
    this.id = cart.id;
    this.anzahl = cart.anzahl;
    this.userid = cart.userid;
};

Cart.create = (newCart, result) => {
    sql.query("INSERT INTO cart SET ?", newCart, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created cart: ", { id: res.insertId, ...newCart });
        result(null, { id: res.insertId, ...newCart });
    });
};

Cart.findById = (cartId, result) => {
    sql.query(`SELECT * FROM cart WHERE id = ${cartId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found cart: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Cart with the id
        result({ kind: "not_found" }, null);
    });
};

Cart.getAll = result => {
    sql.query("SELECT * FROM cart", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("carts: ", res);
        result(null, res);
    });
};

Cart.updateById = (id, cart, result) => {
    sql.query(
        "UPDATE cart SET anzahl = ? WHERE id = ?",
        [cart.anzahl,id],
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

            console.log("updated cart: ", { id: id, ...cart });
            result(null, { id: id, ...cart });
        }
    );
};

Cart.remove = (id, result) => {
    sql.query("DELETE FROM cart WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Cart with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted cart with id: ", id);
        result(null, res);
    });
};

Cart.removeAll = result => {
    sql.query("DELETE FROM cart", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} carts`);
        result(null, res);
    });
};

module.exports = Cart;
