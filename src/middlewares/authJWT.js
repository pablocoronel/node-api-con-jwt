import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

const verifyToken = async (req, res, next) => {
	const token = req.headers['x-access-token'];

	console.log(token);

	if (!token) {
		return res.status(403).json({ message: 'No token provided' });
	} else {
		const decoded = jwt.verify(token, config.SECRET);
		req.userId = decoded.id;

		const user = await User.findById(decoded.id, { password: 0 }); // No enviar la contraseña
        console.log(user)
		if (!user) {
			return res.status(404).json({ message: 'No user found' });
		}
	}

	next();
};

export { verifyToken };
