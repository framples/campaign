const router = require("express").Router();
const npcsController = require("../../controllers/APILogic/npcs");

router.route("/npcs")
    .get(npcsController.find)
    .post(npcsController.update)
    .post(npcsController.create);

router.route("/:id").delete(npcsController.remove);

module.exports = router;