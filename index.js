const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, "public")))
  .use(bodyParser.urlencoded({ extended: true }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/about", (req, res) => res.render("pages/about"))
  .get("/contact", (req, res) => res.render("pages/contact"))
  .post("/submit", (req, res) => {
    const { fullName, phone, email, items } = req.body;
    const body = req.body;
    console.log("Going to db", { fullName, phone, email, items });
    res.redirect(`/?test=success`);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
