const { usuario } = require('../models/index')
const { createJWT } = require("../middlewares/auth/createJWT");
const parseJwt = require("../utils/decodeToken");
const log = require("../utils/logger");
const { StatusCodes } = require('http-status-codes');
const { setResponseWithError } = require('../utils/setResponse');
const bcryptjs = require("bcryptjs");
const {
    INVALID_EMAIL_OR_PASSWORD,
    EMAILREGISTERED,
    USER_UPDATED,
    USER_DELETED,
    SERVER_ERROR
} = require('../messages/messages')


////register
const postUser = async (req, res) => {
    try {
        const { mail, ...body } = req.body;

        const user = await usuario.saveUser({ mail, ...body });
    
        //Create JWT
        const token = await createJWT(user);
        res
            .status(StatusCodes.CREATED)
            .json({user,token});

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }

}

const getUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const user = await usuario.getUserById(id);

        res
            .status(StatusCodes.OK)
            .json({user});

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

//           ALL USERS = GET

const getUsers = async (req, res = response) => {
    try {
        const users = await usuario.getAll();

        res
            .status(StatusCodes.OK)
            .json({ users });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};

//           UPDATE USER

const updateUser = async (req, res = response) => {
    const { id: idbody, createdAt, ...body } = req.body;
    try {
        const { id } = req.params;

        await usuario.updateUser(id, body);

        res
            .status(StatusCodes.OK)
            .json({ msg: USER_UPDATED });

    } catch (error) {
        log.error(error);
    }
};

//           DELETE USER = DELETE

const deleteUser = async (req, res = response) => {
    try {
        const { id } = req.params;

        const userDb = await usuario.delete(id);

        res
            .status(StatusCodes.OK)
            .json({ msg: USER_DELETED, userDb });

    } catch (error) {
        log.error(error);
        return setResponseWithError(res, 500, SERVER_ERROR);
    }
};


//           LOGIN USER = POST
const loginUser = async (req, res = response) => {
    const { mail, password } = req.body;

    try {
        // Check Email in database
        const user = await usuario.getUserByEmail(mail);
        if (!user) {
            log.warn(INVALID_EMAIL_OR_PASSWORD);
            return setResponseWithError(res, 401, INVALID_EMAIL_OR_PASSWORD, false);
        }

        // Check User is active
        if (user.deletedAt !== null) {
            log.warn(INVALID_EMAIL_OR_PASSWORD);
            return setResponseWithError(res, 401, INVALID_EMAIL_OR_PASSWORD, false);
        }

        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            log.warn(INVALID_EMAIL_OR_PASSWORD);
            return setResponseWithError(res, 401, INVALID_EMAIL_OR_PASSWORD, false);

        }

        //Create JWT
        const token = await createJWT(user);

        res.status(200).json({
            user,
            token,
        });

    } catch (error) {
        log.error(error);
    }
};

module.exports = {
    postUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
    ,
    loginUser
}