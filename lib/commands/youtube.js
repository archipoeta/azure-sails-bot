
module.exports = function(session, libs) {

	var url =  "https://www.googleapis.com/customsearch/v1";
		url += "?key=AIzaSyDZ5YKoigrWWS67RKzUKsbSfAD_4vMF1M8";
		url += "&cx=018002558847257048675:_kbfn7okfnu";
		url += "&q=";

	var query = encodeURIComponent(session.userData.parameters.join(' '));

	url += query;

	libs.https.get(url, function(res) {
		res.setEncoding("utf8");
		var body = "";
		var cards = [];
		res.on("data", function(data) {
			body += data;
		});
		res.on("end", function() {
			body = JSON.parse(body);

			session.send(body.items[0].pagemap.videoobject[0].name);

			if (body.items) {

				for (var i=0; i<5; i++) {
					if (body.items[i]) {
						var _obj = body.items[i].pagemap.videoobject[0];
						var card = new libs.builder.VideoCard(session)
							.title( _obj.name )
							.subtitle( _obj.url + ' ' + _obj.datepublished)
							.text( _obj.description )
							.image(libs.builder.CardImage.create(session, _obj.thumbnailurl))
							.media([
								{ url: _obj.embedurl }
							])
							.buttons([
								libs.builder.CardAction.openUrl(session, _obj.url, 'Go To Video ...')
							]);

						cards.push(card);
					}
				}

				var _s = new libs.builder.Message(session)
					.attachmentLayout(libs.builder.AttachmentLayout.carousel)
					.attachments(cards);
				session.send(_s).endDialog();
			}
		});
	});

	return;
};
