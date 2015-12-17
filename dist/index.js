"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function initializeArray(length) {
    return Array.apply(null, Array(length));
}

exports["default"] = function (retries, promiseThunk) {
    if (retries === undefined) retries = 1;

    return function () {
        return initializeArray(retries).reduce(function (l, c) {
            return l["catch"](promiseThunk);
        }, promiseThunk());
    };
};

module.exports = exports["default"];

