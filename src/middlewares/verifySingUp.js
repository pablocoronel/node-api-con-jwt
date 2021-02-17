import { ROLES } from '../models/Role';

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

export { checkRolesExisted };
