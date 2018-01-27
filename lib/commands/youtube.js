
module.exports = function(session, libs) {

	var url =  "https://www.googleapis.com/customsearch/v1";
		url += "?key=AIzaSyDZ5YKoigrWWS67RKzUKsbSfAD_4vMF1M8";
		url += "&cx=018002558847257048675:_kbfn7okfnu";
		url += "&q=";

	var query = encodeURIComponent(session.userData.parameters.join(' '));

	url += query;

	https.get(url, function(res) {
		res.setEncoding("utf8");
		var body = "";
		res.on("data", data => {
			body += data;
		});
		res.on("end", () => {
			body = JSON.parse(body);
			session.send(JSON.stringify(body.items));
		});
	});

	return;
};
