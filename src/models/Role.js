import { Schema, model } from 'mongoose';

const ROLES = ['admin', 'moderator', 'user'];

const RoleSchema = new Schema(
	{
		name: { type: String },
	},
	{ versionKey: false }
);

export default model('Role', RoleSchema);
export { ROLES };
