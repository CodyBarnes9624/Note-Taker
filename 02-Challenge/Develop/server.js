const express = require("express");
const path = require("path");

const app = express();
let PORT = process.env.PORT || 3000;

//initializing express 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("./public/routes/apiRoutes")(app);
require("./public/routes/htmlRoutes")(app);


//listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});







