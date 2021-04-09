module.exports = app => {
    const carts = require("../controller/carts.controller.js");

    // Create a new Member
    app.post("/carts", carts.create);

    // GET all Members
    app.get("/carts", carts.findAll);

    // GET one single Member with memberId
    app.get("/carts/:cartId", carts.findOne);

    // Update one Member with memberId
    app.put("/carts/:cartId", carts.update);

    // Delete the Member with memberId
    app.delete("/carts/:cartId", carts.delete);

    // Delete all members
    app.delete("/carts", carts.deleteAll);
};
