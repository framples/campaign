const router = require("express").Router();
const userRoutes = require("./Users");
const npcRoutes = require("./Npcs");
const characterRoutes = require("./Characters");

router.use("/users", userRoutes);
router.use("/characters", characterRoutes);
router.use("/npcs", npcRoutes);

module.exports = router;