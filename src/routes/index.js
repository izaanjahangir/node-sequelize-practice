const express = require("express");
const router = express.Router();

require("./user")(router);
require("./cuisine")(router);

module.exports = router;
