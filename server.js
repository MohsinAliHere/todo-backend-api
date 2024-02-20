require("dotenv").config();

const express = require("express");
const ConnectDb = require("./database");
const jsonResponseMiddleware = require("./middleware/responseApi");
const AuthRoutes = require("./routes/auth");
const TodoRoutes = require("./routes/todo");

const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

// connect to database
ConnectDb();

// middleware

app.use(cors("*"));
app.use(
  express.json({
    urlenscode: true,
  })
);
app.use(jsonResponseMiddleware);

//login - register - check auth routes
app.use("/api/v1/", AuthRoutes);

//create - read - delete - edit - delete all  todo routes
app.use("/api/v1/", TodoRoutes);

app.listen(PORT, () => console.log("Port listening on " + PORT));
