const { orders, products, usuario } = require('../models/index')
const log = require('../utils/logger');
const { StatusCodes } = require('http-status-codes');


//           POST PRODUCT
const postOrders = async (req, res) => {

    try {
        const { id, payment_method, user_id } = req.body

        const firstName = await usuario.getUserById(id);
        const product = await products.getProductById(id);

        newOrder = {
            payment_method: payment_method,
            total: product.price,
            user_id: user_id
        }

        const order = await orders.createOrder(newOrder)
        res
            .status(StatusCodes.CREATED)
            .json({ message: "product_CREATED", data: order });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);

    }
}
//           GET PRODUCT

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orders.getOrderById(id);

        res
            .status(StatusCodes.OK)
            .json({ message: "product_CREATED", data: order });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

//           GET ALL orders

const getAllOrders = async (req, res) => {
    try {
        const Allorders = await orders.getAll();

        res
            .status(StatusCodes.OK)
            .json({ msg: "product_CREATED", Allorders });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

//           UPDATE PRODUCT

const updateOrder = async (req, res) => {
    const { id: idbody, createdAt, ...body } = req.body;
    try {
        const { id } = req.params;

        await orders.updateOrder(id, body);

        res
            .status(StatusCodes.OK)
            .json({ msg: 'USER_UPDATED' });

    } catch (error) {
        log.error(error);
    }
};

//           DELETE PRODUCT

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await orders.delete(id);

        res
            .status(StatusCodes.OK)
            .json({ msg: 'USER_DELETED', order });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

module.exports = {
    postOrders,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder

}