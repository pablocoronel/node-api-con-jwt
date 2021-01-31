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
const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	res.status(200).json(product);
};

// Actualizar
const updateProduct = async (req, res) => {
	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true, // Devuelve el producto actualizado
		}
	);

	res.status(204).json(updatedProduct);
};

// Borrar
const deleteProduct = async (req, res) => {};

export {
	createProducts,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
