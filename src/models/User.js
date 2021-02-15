import { Schema, model } from 'mongoose';
import bcryp from 'bcryptjs';

const UserSchema = new Schema(
	{
		username: { type: String, unique: true },
		email: { type: String, unique: true },
		password: { type: String, unique: true },
		roles: [
			{
				ref: 'Role',
				type: Schema.Types.ObjectId,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Funciones para el modelo
// Encripta las contraseña
UserSchema.statics.encryptPassword = async (password) => {
	// Salt sirve para indicar la cantidad de veces a ejecutar el algoritmo de encriptación
	return await bcryp.hash(password, bcryp.genSaltSync(10));
};

// Compara una la contraseña del modelo ante un string recibido
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcryp.compare(password, receivedPassword);
};

export default model('User', UserSchema);
