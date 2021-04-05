import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

// Verifica el access token
const verifyToken = async (req, res, next) => {
	try {
		const access_token = req.headers['x-access-token'];

		if (!access_token) {
			return res.status(403).json({ message: 'No token provided' });
		} else {
			const decoded = jwt.verify(access_token, config.SECRET_ACCESS);
			req.userId = decoded.id;

			const user = await User.findById(decoded.id, { password: 0 }); // No enviar la contraseña

			if (!user) {
				return res.status(404).json({ message: 'No user found' });
			}
		}

		next();
	} catch (error) {
		// Expiró el access token
		if (error instanceof jwt.TokenExpiredError) {
			return verifyRefreshToken(req, res);
		}

		return res.status(401).json({ message: 'Unauthorized' });
	}
};

// Verifica el refresh token
const verifyRefreshToken = async (req, res) => {
	try {
		const refresh = req.headers['x-refresh-token'];
		const decoded = jwt.verify(refresh, config.SECRET_REFRESH);

		const user = await User.findById(decoded.id, { password: 0 }); // No enviar la contraseña

		if (!user) {
			return res.status(404).json({ message: 'No user found' });
		}

		// crear access token
		const access_token = jwt.sign({ id: user._id }, config.SECRET_ACCESS, {
			expiresIn: '24h',
		});

		// crear refresh token
		const refresh_token = jwt.sign(
			{ id: user._id },
			config.SECRET_REFRESH,
			{
				expiresIn: '7d',
			}
		);

		return res.status(200).json({ access_token, refresh_token });
	} catch (error) {
		// Expiró el access token
		if (error instanceof jwt.TokenExpiredError) {
			return res
				.status(401)
				.json({ message: 'Debe volver a autenticarse' });
		}

		return res.status(401).json({ message: 'Unauthorized' });
	}
};

const isAdmin = async (req, res, next) => {
	const user = await User.findById(req.userId);

	const roles = await Role.find({ _id: { $in: user.roles } }); // buscar los roles del usuario

	// Usa un for en lugar de streams, por no ser asincrono el forEach
	for (let i = 0; i < roles.length; i++) {
		// Si el usurio tiene el rol Admin, avanza al controller
		if (roles[i].name === 'admin') {
			return next();
		}
	}

	// Si no hay rol Moderador
	return res.status(403).json({ message: 'Admin role required' });
};

const isModerator = async (req, res, next) => {
	const user = await User.findById(req.userId);

	const roles = await Role.find({ _id: { $in: user.roles } }); // buscar los roles del usuario

	// Usa un for en lugar de streams, por no ser asincrono el forEach
	for (let i = 0; i < roles.length; i++) {
		// Si el usurio tiene el rol Moderador, avanza al controller
		if (roles[i].name === 'moderator') {
			return next();
		}
	}

	// Si no hay rol Moderador
	return res.status(403).json({ message: 'Moderator role required' });
};

export { verifyToken, isAdmin, isModerator };
