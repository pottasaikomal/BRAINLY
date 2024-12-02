"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = function (len) {
    const hash = "abcdefgdjkhefujri832r748wguhwrbyvgrf389rwf";
    const hash_sz = hash.length;
    let req = "";
    for (let i = 0; i < len; i++) {
        req += hash[Math.floor(Math.random() * hash_sz)];
    }
    return req;
};
exports.random = random;
