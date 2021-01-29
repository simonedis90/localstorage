"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
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
                    //throw {msg: 'DATA IMPROPERLY STORED'};
                }
            }
            return null;
        };
        Object.defineProperty(target, propertyKey, props);
    };
}
exports.LocalStorage = LocalStorage;
