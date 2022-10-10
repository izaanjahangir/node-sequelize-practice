const path = require("path");
const fse = require("fs-extra");

exports.loadSQLQuery = async () => {
  const queryPath = path.resolve(
    path.join(process.cwd(), "src", "sqlQueries", "getUsers.sql")
  );

  console.log("queryPath =>", queryPath);
  
  const data = await fse.readFile(queryPath, {encoding: "utf-8"});

  console.log(data);
  
  return data;
};
