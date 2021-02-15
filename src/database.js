import mongoose from 'mongoose';

mongoose
	.connect('mongodb://localhost/companydb', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((db) => {
		console.log('Conectado a la BD', db.connection.name);
	})
	.catch((error) => {
		console.error(error);
	});
