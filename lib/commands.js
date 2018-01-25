
module.exports = {

	'echo': function(session) {
		return session.message;
	},

	'haiku': function(session) {
		return "Test haiku!";
	}

};
