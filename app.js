const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const rootDir = require("/util/path");
const app = express();
const tableRoutes = require("./routes/samples");
// const indexRoutes = require("./routes/index");
const indexData = require("./routes/index");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use("/index", indexData.routes);
app.use("/api", tableRoutes);
// app.use((req, res, next) => {
//   res.status(404).sendfile(path.join(__dirname, "views", "404.html"));
// });
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});
app.use(express.static(path.join(__dirname + "public")));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.listen(3000, (req, res) => {
  console.log("PORT 3000 is running");
});
