
module.exports = function(session) {
	var index = Math.floor(Math.random() * Math.floor(session.userData.haiku.length));
	var haiku = session.userData.haiku[index].data;
	haiku += "<br/><br/>";
	haiku += " --" + session.userData.haiku[index].author;

	return haiku;
};
