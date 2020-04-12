const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const fs = require("fs");

const db = "./store/db.json";
express()
  .use(express.static(path.join(__dirname, "public")))
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/about", (req, res) => res.render("pages/about"))
  .get("/order_success", (req, res) => res.render("pages/order_success"))
  .get("/contact", (req, res) => res.render("pages/contact"))
  .post("/submit", (req, res) => {
    const { name, phone, email, items } = req.body;
    console.log("Going to db...", {
      name,
      phone,
      email,
      items,
    });
    fs.readFile(db, (err, data) => {
      var json = JSON.parse(data);
      console.log("Db.json", json);
      json.order.push({
        "id": json.order.length + 1,
        name,
        phone,
        email,
        items,
        "store_id": 1
      });
      fs.writeFile(db, JSON.stringify(json), (err) => {
        if (err) {
          console.log("Cannot write to file");
        }
      })
    });
    res.redirect(`/order_success`);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
