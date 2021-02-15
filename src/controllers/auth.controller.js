import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

export const singUp = async (req, res) => {
	const { username, email, password } = req.body;

	const user = new User({
		username,
		email,
		password: await User.encryptPassword(password),
	});

	const savedUser = await user.save();

	// crear token
	const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
		expiresIn: '24h',
	});

	res.status(200).json({ token });
};
export const singIn = async (req, res) => {
	res.json('singin');
};
