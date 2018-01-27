
module.exports = function(session) {
	var builder = session.userData.builder;
	var index = Math.floor(Math.random() * Math.floor(session.userData.haiku.length));
	var haiku = session.userData.haiku[index].data;
	haiku += "<br/><br/>";
	haiku += " --" + session.userData.haiku[index].author;

	var hero = new builder.HeroCard(session);
    hero.title(session.userData.haiku[index].name);
    hero.subtitle('by: ' + session.userData.haiku[index].author);
    hero.text(session.userData.haiku[index].data);
    hero.images([
            builder.CardImage.create(session, 'http://lifesupportva.org/wp-content/uploads/2016/03/haiku.jpg')
        ]);
    hero.buttons([
            builder.CardAction.openUrl(session, 'https://chrishart.org', 'x')
        ]);

	return hero;
};
