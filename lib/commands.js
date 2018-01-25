
exports.echo = function(session) {
	return session.message;
};

exports.haiku = function(session) {
	return "Test haiku!";
};
