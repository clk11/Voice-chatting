const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res
			.status(401)
			.json({ err: 'Access denied , no token provided ...' });
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.userInfo = decoded.userInfo;
		next();
	} catch (err) {
		res.status(401).json({ err: 'Token is not valid ' });
	}
};
