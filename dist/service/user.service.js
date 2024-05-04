import { Role } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client.js';
import ApiError from '../utils/ApiError.js';
import { encryptPassword } from '../utils/encryption.js';
const createUser = async (email, password, name, role = Role.USER, phoneNumber, whatsapp) => {
    if (await getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return prisma.user.create({
        data: {
            email,
            name,
            password: await encryptPassword(password),
            role,
            phoneNumber,
            whatsapp
        }
    });
};
const queryUsers = async (filter, options, keys = [
    'id',
    'email',
    'name',
    'password',
    'phoneNumber',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
]) => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const users = await prisma.user.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return users;
};
const getUserById = async (id, keys = [
    'id',
    'email',
    'name',
    'password',
    'phoneNumber',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.user.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
const getUserByEmail = async (email, keys = [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.user.findUnique({
        where: { email },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
const updateUserById = async (userId, updateBody, keys = ['id', 'email', 'name', 'role']) => {
    const user = await getUserById(userId, ['id', 'email', 'name']);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await getUserByEmail(updateBody.email))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedUser;
};
const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await prisma.user.delete({ where: { id: user.id } });
    return user;
};
export default {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById
};
