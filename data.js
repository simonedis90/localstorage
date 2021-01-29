"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStorage = exports.LocalStorage = void 0;
/**
 * @param localstorageKey name for store data
 * @param cacheTime milliseconds of cache time
 * @param convert function to convert stored item
 */
function LocalStorage(localstorageKey, cacheTime, convert) {
    if (cacheTime === void 0) { cacheTime = 0; }
    if (convert === void 0) { convert = function (value) { return value; }; }
    return function (target, propertyKey) {
        var props = {};
        props.set = function (value) {
            if (value === null || value === undefined) {
                localStorage.removeItem(localstorageKey);
                return;
            }
            localStorage.setItem(localstorageKey, JSON.stringify({
                value: value,
                cacheTime: cacheTime,
                storedAt: new Date().getTime() + cacheTime
            }));
        };
        props.get = function () {
            var store = localStorage.getItem(localstorageKey);
            if (store) {
                try {
                    var parsed = JSON.parse(store);
                    var value = parsed.value;
                    var cacheTime_ = parsed.cacheTime;
                    if (cacheTime_ && parsed.storedAt < new Date().getTime()) {
                        localStorage.removeItem(localstorageKey);
                        return null;
                    }
                    return convert(value);
                }
                catch (erro) {
                    localStorage.removeItem(localstorageKey);
                    return null;
                }
            }
            return null;
        };
        Object.defineProperty(target, propertyKey, props);
    };
}
exports.LocalStorage = LocalStorage;
/**
 * @param sessionStorageKey name for store data
 * @param cacheTime milliseconds of cache time
 * @param convert function to convert stored item
 */
function SessionStorage(sessionStorageKey, cacheTime, convert) {
    if (cacheTime === void 0) { cacheTime = 0; }
    if (convert === void 0) { convert = function (value) { return value; }; }
    return function (target, propertyKey) {
        var props = {};
        props.set = function (value) {
            if (value === null || value === undefined) {
                sessionStorage.removeItem(sessionStorageKey);
                return;
            }
            sessionStorage.setItem(sessionStorageKey, JSON.stringify({
                value: value,
                cacheTime: cacheTime,
                storedAt: new Date().getTime() + cacheTime
            }));
        };
        props.get = function () {
            var store = sessionStorage.getItem(sessionStorageKey);
            if (store) {
                try {
                    var parsed = JSON.parse(store);
                    var value = parsed.value;
                    var cacheTime_ = parsed.cacheTime;
                    if (cacheTime_ && parsed.storedAt < new Date().getTime()) {
                        sessionStorage.removeItem(sessionStorageKey);
                        return null;
                    }
                    return convert(value);
                }
                catch (erro) {
                    sessionStorage.removeItem(sessionStorageKey);
                    return null;
                }
            }
            return null;
        };
        Object.defineProperty(target, propertyKey, props);
    };
}
exports.SessionStorage = SessionStorage;
