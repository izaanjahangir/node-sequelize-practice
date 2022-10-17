const express = require("express");
const router = express.Router();

require("./user")(router);
require("./cuisine")(router);
require("./upload")(router);
require("./item")(router);
require("./inventoryItem")(router);

module.exports = router;
