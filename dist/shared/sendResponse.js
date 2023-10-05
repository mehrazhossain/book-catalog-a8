"use strict";
// import { Response } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSendResponse = void 0;
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
const signInSendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        token: data.data || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.signInSendResponse = signInSendResponse;
exports.default = sendResponse;
