const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const url = require('url');

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
  .get("/", (req, res) => {
    fs.readFile(db, (err, data) => {
      var json = JSON.parse(data);
      console.log(json.location);
      return res.render("pages/index", {
        locations: json.location,
        stores: json.store
      })
    })
  })
  .get("/about", (req, res) => res.render("pages/about"))
  .get("/order_success", (req, res) => {
    return res.render("pages/order_success", {
      orderNumber: req.query['order_number'],
      name: req.query['name']
    })
  })
  .get("/contact", (req, res) => res.render("pages/contact"))
  .post("/submit", (req, res) => {
    const {
      name,
      phone,
      email,
      items
    } = req.body;
    console.log("Going to db...", {
      name,
      phone,
      email,
      items,
    });
    fs.readFile(db, (err, data) => {
      var json = JSON.parse(data);
      console.log("Db.json", json);
      var orderNumber = json.order.length + 1;
      json.order.push({
        "id": orderNumber,
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
      res.redirect(url.format({
        pathname: `/order_success`,
        query: {
          "order_number": orderNumber,
          "name": name
        }
      }));
    });
  })
  .get("/admin", (req, res) => {
    fs.readFile(db, (err, data) => {
      var json = JSON.parse(data);
      return res.render("pages/admin", {
        orders: json.order
      })
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));