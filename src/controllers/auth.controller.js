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
	console.log(savedUser);

	// crear token
	const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
		expiresIn: '24h',
	});

	res.status(200).json({ token });
};
export const singIn = async (req, res) => {
	res.json('singin');
};
