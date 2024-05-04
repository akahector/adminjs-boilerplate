import httpStatus from 'http-status';
import tokenService from './token.service.js';
import userService from './user.service.js';
import ApiError from '../utils/ApiError.js';
import { TokenType } from '@prisma/client';
import prisma from '../client.js';
import { encryptPassword, isPasswordMatch } from '../utils/encryption.js';
import exclude from '../utils/exclude.js';
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email, [
        'id',
        'email',
        'name',
        'password',
        'role',
        'phoneNumber',
        'whatsapp',
        'isEmailVerified',
        'createdAt',
        'updatedAt'
    ]);
    if (!user || !(await isPasswordMatch(password, user.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return exclude(user, ['password']);
};
const logout = async (refreshToken) => {
    const refreshTokenData = await prisma.token.findFirst({
        where: {
            token: refreshToken,
            type: TokenType.REFRESH,
            blacklisted: false
        }
    });
    if (!refreshTokenData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
};
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
        const { userId } = refreshTokenData;
        await prisma.token.delete({ where: { id: refreshTokenData.id } });
        return tokenService.generateAuthTokens({ id: userId });
    }
    catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenData = await tokenService.verifyToken(resetPasswordToken, TokenType.RESET_PASSWORD);
        const user = await userService.getUserById(resetPasswordTokenData.userId);
        if (!user) {
            throw new Error();
        }
        const encryptedPassword = await encryptPassword(newPassword);
        await userService.updateUserById(user.id, { password: encryptedPassword });
        await prisma.token.deleteMany({ where: { userId: user.id, type: TokenType.RESET_PASSWORD } });
    }
    catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
};
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenData = await tokenService.verifyToken(verifyEmailToken, TokenType.VERIFY_EMAIL);
        await prisma.token.deleteMany({
            where: { userId: verifyEmailTokenData.userId, type: TokenType.VERIFY_EMAIL }
        });
        await userService.updateUserById(verifyEmailTokenData.userId, { isEmailVerified: true });
    }
    catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
};
export default {
    loginUserWithEmailAndPassword,
    isPasswordMatch,
    encryptPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail
};
