let express = require("express");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let morgan = require("morgan");

let app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


/////////////////CODE I'M NOT FAMILIAR WITH//////////////////////////////////////

app.use(morgan("dev"));

app.use(session({
    key: "user_sid",
    secret: "somerandomstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));




///////////////////////////////////////////////////////////////////////////////////////////////



app.use(express.static("app/public"));

require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
