const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const route = require("./routes");
const db = require("./config/db");

//connect DB
db.connect();
//http logger
app.use(express.static(path.join(__dirname, "public"))); //static files
app.use(morgan("combined"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
//template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources\\views"));

//Routes init
require("dotenv").config();
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
