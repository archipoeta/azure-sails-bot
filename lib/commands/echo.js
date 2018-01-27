
module.exports = function(session, libs) {
	return session.userData.parameters.join(' ');
};
