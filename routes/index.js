const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);


router.use(function (res, req) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;