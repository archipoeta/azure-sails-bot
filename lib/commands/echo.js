
module.exports = function(session, builder) {
	return session.userData.parameters.join(' ');
};
