import Product from '../models/Product';

// Crear
const createProducts = async (req, res) => {
	const { name, category, price, imageUrl } = req.body;
	const newProduct = new Product({ name, category, price, imageUrl });

	const productSaved = await newProduct.save();

	res.status(201).json(productSaved); // 201= creado, json para respuestas de api
};

// Listar
const getProducts = async (req, res) => {
	const products = await Product.find();

	res.status(200).json(products);
};

// Ver individual
const getProduct = (req, res) => {};

// Actualizar
const updateProduct = (req, res) => {};

// Borrar
const deleteProduct = (req, res) => {};

export {
	createProducts,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
