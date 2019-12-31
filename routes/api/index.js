const router = require("express").Router();
const userRoutes = require("./users");
//const npcRoutes = require("./npcs");
//const characterRoutes = require("./Characters");

router.use("/users", userRoutes);
//router.use("/characters", characterRoutes);
//router.use("/npcs", npcRoutes);

module.exports = router;