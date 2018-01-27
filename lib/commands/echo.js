
module.exports = function(session, builder) {
	return session.userData.message.replace('echo ', '');
};
