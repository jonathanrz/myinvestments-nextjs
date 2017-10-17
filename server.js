const express = require("express");
const next = require("next");
const cookie = require("js-cookie");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const production = !dev;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    server.get("/p/:id", (req, res) => {
      const actualPage = "/post";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/", (req, res) => {
      console.log("Cookies: ", req.cookies);
      if (req.cookies["token"]) {
        return handle(req, res);
      } else {
        res.redirect("/login");
      }
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
