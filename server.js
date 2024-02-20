require("dotenv").config();

const express = require("express");
const ConnectDb = require("./database");
const jsonResponseMiddleware = require("./middleware/responseApi");
const app = express();
const PORT = process.env.PORT || 3000;
const AuthRoutes = require("./routes/auth")

// connect to database
ConnectDb()

// middleware
app.use(
  express.json({
    urlenscode: true,
  })
);
app.use(jsonResponseMiddleware);


//login - register - check auth routes
app.use(AuthRoutes)

app.listen(PORT, () => console.log("Port listening on " + PORT));
