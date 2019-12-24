const router = require("express").Router();
const charactersController = require("../../controllers/APILogic/characters");

router.route("/")
    .get(charactersController.find)
    .post(charactersController.update)
    .post(charactersController.create)

router.route("/:id").delete(charactersController.remove);

module.exports = router;