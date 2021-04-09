module.exports = app => {
    const items = require("../controller/items.controller.js");

    // Create a new Member
    app.post("/items", items.create);

    // GET all Members
    app.get("/items", items.findAll);

    // GET one single Member with memberId
    app.get("/items/:itemsId", items.findOne);

    // Update one Member with memberId
    app.put("/items/:itemsId", items.update);

    // Delete the Member with memberId
    app.delete("/items/:itemsId", items.delete);

    // Delete all members
    app.delete("/items", items.deleteAll);
};
