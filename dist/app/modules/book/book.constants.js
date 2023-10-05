"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSortOrders = exports.bookSortableFields = exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookFilterableFields = [
    'search',
    'minPrice',
    'maxPrice',
    'category',
];
exports.bookSortableFields = ['title', 'author', 'price'];
exports.bookSortOrders = ['asc', 'desc'];
