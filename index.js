const express = require("express");
const { loadSQLQuery } = require("./src/utils/sqlHelpers");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Import all routes
app.get("/api/ping", async (req, res) => {
  try {
    const data = await loadSQLQuery();
    res.json({ message:data });
  } catch (e) {}
});

app.listen(port, () => {
  console.log("Server is running on PORT " + port);
});
