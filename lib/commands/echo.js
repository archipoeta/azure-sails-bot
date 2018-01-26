
module.exports = function(session) {
	return session.userData.message.replace(/echo\s?/, '');
};
