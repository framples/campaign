let express = require("express");
let session = require("express-session");

let app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(session( {
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));


app.use(express.static("app/public"));

require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
