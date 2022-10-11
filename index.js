const express = require("express");
const cors = require("cors");

const keys = require("./src/config/keys");

require("./src/utils/database");

const app = express();

app.use(express.json());
app.use(cors());

// Import all routes
app.get("/ping", async (_, res) => {
  res.json({ message: "pong", success: true, data: {} });
});

app.use("/api", require("./src/routes"));

app.use((err, _, res, _a) => {
  console.log("err =>", err);

  if (
    process.env.NODE_ENV === "production" &&
    typeof err.message === "string" &&
    err.message.startsWith("request to http")
  ) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }

  res.status(err.status || 400).json({
    message: err.message.original
      ? err.message.original.errors[0].message
      : err.message,
    success: false,
  });
});

app.listen(keys.PORT, () => {
  console.log("Server is running on PORT " + keys.PORT);
});
