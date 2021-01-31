import pkg from '../../package.json';

const index = (req, res) => {
	res.json({
		name: pkg.name,
		author: pkg.author,
		description: pkg.description,
		version: pkg.version,
	});
};

export { index };
