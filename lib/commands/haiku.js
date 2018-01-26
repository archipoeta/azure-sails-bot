
module.exports = function(session) {
	var fs = require("fs");
	var content = JSON.parse(fs.readFileSync("./haiku.json"));
	var index = Math.floor(Math.random() * Math.floor(content.length));

	var haiku = content[index].data;
	haiku += "\n";
	haiku += " --" + content[index].author;

	return haiku;
};
