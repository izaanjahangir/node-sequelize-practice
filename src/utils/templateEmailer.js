const fs = require("fs");
const path = require("path");

exports.loadTemplateAndSend = async function (templateName, args) {
  try {
    let htmlContent = fs
      .readFileSync(
        path.join(__dirname, "../emailTemplates/", templateName, "/body.html")
      )
      .toString();

    let txtContent = "Text version is not available";
    let subject = "No Subject";
    let to = "";

    txtContent = fs
      .readFileSync(
        path.join(__dirname, "../emailTemplates/", templateName, "/body.txt")
      )
      .toString();

    subject = fs
      .readFileSync(
        path.join(__dirname, "../emailTemplates/", templateName, "/subject.txt")
      )
      .toString();

    to = args["to"];
    htmlContent = replaceArgs(htmlContent, args);
    txtContent = replaceArgs(txtContent, args);
    subject = replaceArgs(subject, args);

    return {
      to,
      subject,
      txtContent,
      htmlContent,
    };
  } catch (e) {
    throw e;
  }
};

function replaceArgs(source, args) {
  if (!args) {
    return source;
  }

  const tags = Object.keys(args);
  for (const tag of tags) {
    source = source.replace(new RegExp(`{{${tag}}}`, "gi"), args[tag]);
  }

  return source;
}
