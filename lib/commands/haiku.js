
module.exports = function(session) {
	var index = Math.floor(Math.random() * Math.floor(session.userData.haiku.length));
	var haiku = session.userData.haiku[index].data;
	haiku += "<br/><br/>";
	haiku += " --" + session.userData.haiku[index].author;

	return new builder.HeroCard(session)
        .title(session.userData.haiku[index].name)
        .subtitle('by: ' + session.userData.haiku[index].author)
        .text(session.userData.haiku[index].data
        .images([
            builder.CardImage.create(session, 'http://lifesupportva.org/wp-content/uploads/2016/03/haiku.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://chrishart.org', '')
        ]);

	return haiku;
};
