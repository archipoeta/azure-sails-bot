
module.exports = function(session, libs) {
	var index = Math.floor(Math.random() * Math.floor(session.userData.haiku.length));

	return new libs.builder.HeroCard(session)
    	.title(session.userData.haiku[index].name)
    	.subtitle('by: ' + session.userData.haiku[index].author)
    	.text(session.userData.haiku[index].data)
    	.images([
            builder.CardImage.create(session, 'https://thumb7.shutterstock.com/mosaic_250/623251/272061365/stock-vector-simple-quill-and-inkwell-black-vector-image-272061365.jpg')
        ]);
};
