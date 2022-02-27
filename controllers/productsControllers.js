const { products } = require('../models/index')
const log = require('../utils/logger');
const { StatusCodes } = require('http-status-codes');

//           POST PRODUCT
const postProducts = async (req, res) => {

    try {
        const data = req.body;
        const product = await products.createProduct(data)
        
      //  log.info(product_CREATED)

        res
            .status(StatusCodes.CREATED)
            .json({message:"product_CREATED", data:product});

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);

    }
}
//           GET PRODUCT

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product= await products.getProductById(id);

        res
            .status(StatusCodes.OK)
            .json({message:"product_CREATED", data:product});

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

//           GET ALL PRODUCTS

const getAllProducts = async (req, res) => {
    try {
        const Allproducts = await products.getAll();

        res
            .status(StatusCodes.OK)
            .json({msg:"product_CREATED", Allproducts});

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

//           UPDATE PRODUCT

const updateProduct = async (req, res) => {
    const { id: idbody, createdAt, ...body } = req.body;
    try {
        const { id } = req.params;

        await products.updateProduct(id, body);

        res
            .status(StatusCodes.OK)
            .json({ msg: 'USER_UPDATED' });

    } catch (error) {
        log.error(error);
    }
};

//           DELETE PRODUCT

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productDb = await products.delete(id);

        res
            .status(StatusCodes.OK)
            .json({ msg: 'USER_DELETED', productDb });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

module.exports = {
    postProducts,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}