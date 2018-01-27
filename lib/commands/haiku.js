
module.exports = function(session, builder) {
	var index = Math.floor(Math.random() * Math.floor(session.userData.haiku.length));
//	var haiku = session.userData.haiku[index].data;
//	haiku += "<br/><br/>";
//	haiku += " --" + session.userData.haiku[index].author;

	return new builder.HeroCard(session)
    	.title(session.userData.haiku[index].name)
    	.subtitle('by: ' + session.userData.haiku[index].author)
    	.text(session.userData.haiku[index].data)
    	.images([
            builder.CardImage.create(session, 'https://thumb7.shutterstock.com/mosaic_250/623251/272061365/stock-vector-simple-quill-and-inkwell-black-vector-image-272061365.jpg')
        ])
//    	.buttons([
//            builder.CardAction.openUrl(session, 'https://chrishart.org', 'x')
//        ]);

//	return hero;
};
