const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const pics = require("./routes/api/pics");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

// Initialize Express
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the Mongo database
const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/pics", pics);
app.use("/api/profile", profile);

// Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client", "build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
