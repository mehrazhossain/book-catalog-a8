"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const order_constants_1 = require("./order.constants");
const createOrder = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exist");
    }
    const { orderedBooks } = payload;
    const newOrder = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: { userId: user.id },
        });
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to palce order');
        }
        for (const orderedBook of orderedBooks) {
            yield transactionClient.orderedBook.create({
                data: {
                    orderId: order.id,
                    bookId: orderedBook.bookId,
                    quantity: orderedBook.quantity,
                },
            });
        }
        return order;
    }));
    const data = yield prisma_1.default.order.findUnique({
        where: { id: newOrder.id },
        include: {
            user: true,
            orderedBooks: {
                include: { book: true },
            },
        },
    });
    if (!data) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to place your order!');
    }
    return data;
});
const getAllOrders = (pagination, orderFilter, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(pagination);
    const andCondition = [];
    // Filter
    if (Object.keys(orderFilter).length) {
        andCondition.push({
            AND: Object.keys(orderFilter).map((field) => {
                if (order_constants_1.orderRelationalFields.includes(field)) {
                    return {
                        [order_constants_1.orderRelationalFieldsMapper[field]]: {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            id: orderFilter[field],
                        },
                    };
                }
                else {
                    return {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        [field]: orderFilter[field],
                    };
                }
            }),
        });
    }
    const whereCondition = andCondition.length
        ? { AND: andCondition }
        : {};
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.ENUM_USER_ROLE.CUSTOMER) {
        whereCondition.user = { id: user.userId };
    }
    const data = yield prisma_1.default.order.findMany({
        where: whereCondition,
        include: {
            user: true,
            orderedBooks: {
                include: {
                    book: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.default.order.count({ where: whereCondition });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data,
    };
});
const getOrderForSpecificCustomer = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const whereCondition = { id };
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.ENUM_USER_ROLE.CUSTOMER) {
        whereCondition.user = { id: user.userId };
    }
    const data = yield prisma_1.default.order.findUnique({
        where: whereCondition,
        include: {
            user: true,
            orderedBooks: {
                include: {
                    book: true,
                },
            },
        },
    });
    return data;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrderForSpecificCustomer,
};
