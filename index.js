const express = require("express");
const cors = require("cors");
const path = require("path");

const keys = require("./src/config/keys");
const { handleSequelizeError } = require("./src/utils/globalHelpers");
require("./src/utils/database");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "uploads")));

// Import all routes
app.get("/ping", async (_, res) => {
  res.json({ message: "pong", success: true, data: {} });
});

app.use("/api", require("./src/routes"));

app.use((err, _, res, _a) => {
  const error = { ...err, message: handleSequelizeError(err.message) };

  if (
    process.env.NODE_ENV === "production" &&
    typeof err.message === "string" &&
    err.message.startsWith("request to http")
  ) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }

  res.status(error.status || 400).json({
    message: error.message,
    success: false,
  });
});

app.listen(keys.PORT, () => {
  console.log("Server is running on PORT " + keys.PORT);
});
