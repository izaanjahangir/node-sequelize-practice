const express = require("express");
const router = express.Router();

require("./user")(router);

module.exports = router;
