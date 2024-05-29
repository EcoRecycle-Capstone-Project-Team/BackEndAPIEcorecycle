const express = require("express");
const http = require("http");
const router = require("./routes/api.routes.js");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();

const { APP_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
    sameSite: "strict",
  })
);

app.use(express.json());
app.use(express.static("public"));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const server = http.createServer(app);

app.use(router);

server.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);
