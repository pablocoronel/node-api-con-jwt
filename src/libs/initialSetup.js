import Role from '../models/Role';

// Crear roles al iniciar la aplicacion
const createRoles = async () => {
	try {
		// Devuelve la cantidad de documentos del modelo
		const count = await Role.estimatedDocumentCount();

		// Si ya hay roles, salir
		if (count > 0) {
			return;
		}

		// Crear los roles en db
		const values = await Promise.all([
			new Role({ name: 'admin' }).save(),
			new Role({ name: 'moderator' }).save(),
			new Role({ name: 'user' }).save(),
		]);

		console.log(values);
	} catch (error) {
		console.error(error);
	}
};

export { createRoles };
