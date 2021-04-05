import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const singUp = async (req, res) => {
	const { username, email, password, roles } = req.body;

	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password),
	});

	if (roles) {
		// Para roles enviados en request
		const foundRoles = await Role.find({ name: { $in: roles } });

		newUser.roles = foundRoles.map((role) => role._id);
	} else {
		const userRole = await Role.findOne({ name: 'user' });
		newUser.roles = [userRole._id];
	}

	const savedUser = await newUser.save();

	// crear access token
	const access_token = jwt.sign({ id: savedUser._id }, config.SECRET_ACCESS, {
		expiresIn: '24h',
	});

	// crear refresh token
	const refresh_token = jwt.sign(
		{ id: savedUser._id },
		config.SECRET_REFRESH,
		{ expiresIn: '7d' }
	);

	res.status(200).json({ access_token, refresh_token });
};

export const singIn = async (req, res) => {
	const { email, password } = req.body;

	const userFound = await User.findOne({ email }).populate('roles');

	const matchPassword = await User.comparePassword(
		password,
		userFound.password
	);

	if (!matchPassword) {
		return res
			.status(401)
			.json({ access_token: null, message: 'Invalid password' });
	}

	// crear access token
	const access_token = jwt.sign({ id: userFound._id }, config.SECRET_ACCESS, {
		expiresIn: '24h',
	});

	// crear refresh token
	const refresh_token = jwt.sign(
		{ id: userFound._id },
		config.SECRET_REFRESH,
		{ expiresIn: '7d' }
	);

	if (!userFound) {
		res.status(404).json({ message: 'User not found' });
	} else {
		res.status(200).json({ access_token, refresh_token });
	}
};
