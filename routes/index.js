const path = require("path");
const router = require("router");
const apiRoutes = require("./api");
const dndRoutes = require("./dndapi");

router.use("/api", apiRoutes);

router.use("/dndRoutes", dndRoutes);

router.use(function (res, req) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"))
});

module.exports = router;