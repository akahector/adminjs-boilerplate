import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import config from '../config/config.js';
import userService from './user.service.js';
import ApiError from '../utils/ApiError.js';
import { TokenType } from '@prisma/client';
import prisma from '../client.js';
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
};
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const createdToken = prisma.token.create({
        data: {
            token,
            userId: userId,
            expires: expires.toDate(),
            type,
            blacklisted
        }
    });
    return createdToken;
};
const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const userId = payload.sub.toString();
    const tokenData = await prisma.token.findFirst({
        where: { token, type, userId, blacklisted: false }
    });
    if (!tokenData) {
        throw new Error('Token not found');
    }
    return tokenData;
};
const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS);
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
};
const generateResetPasswordToken = async (email) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const resetPasswordToken = generateToken(user.id, expires, TokenType.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user.id, expires, TokenType.RESET_PASSWORD);
    return resetPasswordToken;
};
const generateVerifyEmailToken = async (user) => {
    const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
    const verifyEmailToken = generateToken(user.id, expires, TokenType.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL);
    return verifyEmailToken;
};
export default {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken
};
