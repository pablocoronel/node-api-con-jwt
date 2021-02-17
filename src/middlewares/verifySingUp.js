import { ROLES } from '../models/Role';
import User from '../models/User';

const checkRolesExisted = (req, res, next) => {
	const { roles } = req.body;

	if (roles) {
		let noRole = '';
		const existRoles = roles.every((item) => {
			const inArray = ROLES.includes(item);

			if (!inArray) {
				noRole = item;
			}

			return inArray;
		});

		if (!existRoles) {
			return res
				.status(400)
				.json({ message: `Role ${noRole} no exists` });
		}
	}

	return next();
};

const checkIfUsernameOrEmailIsUnique = async (req, res, next) => {
	const { username, email } = req.body;

	const existsUsername = await User.findOne({ username });
	const existEmail = await User.findOne({ email });

	if (existsUsername) {
		return res.status(400).json({ message: 'Username already registered' });
	} else if (existEmail) {
		return res.status(400).json({ message: 'Email already registered' });
	}

	return next();
};

export { checkRolesExisted, checkIfUsernameOrEmailIsUnique };
