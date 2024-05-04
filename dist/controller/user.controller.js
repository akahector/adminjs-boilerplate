import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import userService from '../service/user.service.js';
const createUser = catchAsync(async (req, res) => {
    const { email, password, name, role, whatsapp, phoneNumber } = req.body;
    const user = await userService.createUser(email, password, name, role, phoneNumber, whatsapp);
    res.status(httpStatus.CREATED).send(user);
});
const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});
const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});
export default {
    createUser,
    getUser,
    updateUser,
};
