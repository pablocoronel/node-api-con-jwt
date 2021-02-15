import User from '../models/User';

export const singUp = async (req, res) => {
	const { username, email, password } = req.body;

	const user = new User({
		username,
		email,
		password: await User.encryptPassword(password),
	});

	await user.save();

	res.json('singup');
};
export const singIn = async (req, res) => {
	res.json('singin');
};
