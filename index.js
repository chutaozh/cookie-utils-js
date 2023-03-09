"use strict";

var _support = false;
var _cookieEnabled = false;

(function () {
    if (!!(window || document)) {
        _support = true;
        _cookieEnabled = window.navigator.cookieEnabled;

        if (!_cookieEnabled) {
            console.error('Cookie Error: Your browser has disabled cookie, please enable it in settings.');
        }
    } else {
        console && console.error('Cookie Error: Server side does not support.');
    }
})()

function object2CookiesStr(obj) {
    if (Object.keys(obj).length === 0) {
        return '';
    }

    var _arr = [];
    _arr.push(obj.name + '=' + encodeURIComponent(obj.value));
    _arr.push('Path=' + (obj.path || '/'));

    if (!!obj.domain) {
        _arr.push('Domain=' + obj.domain);
    }

    if (!!obj.expires) {
        var _expiresType = Object.prototype.toString.call(obj.expires);

        if (_expiresType === '[object Date]') {
            _arr.push('Expires=' + obj.expires.toUTCString());
        }

        if (_expiresType === '[object Number]') {
            var _expires = (new Date()).getTime() + obj.expires;
            _arr.push('Expires=' + (new Date(_expires)).toUTCString());
        }
    }

    if (!!obj.sameSite) {
        _arr.push('SameSite=' + obj.sameSite);
    }

    if (!!obj.secure) {
        _arr.push('Secure');
    }

    return _arr.join('; ');
}

function cookiesStr2Object(cookiesStr) {
    var _obj = {};

    if (!!cookiesStr) {
        var _tempArr = cookiesStr.split('; ').filter(item => !!item).map(item => item.split('='));

        _tempArr.forEach(item => {
            _obj[item[0]] = item[1] || '';
        });
    }

    return _obj;
}

module.exports = {
    browserEnabled: _cookieEnabled,

    set: function () {
        if (!_support || !_cookieEnabled) { return; }

        if (arguments.length === 1) {
            var _args = arguments[0];

            if (Object.prototype.toString.call(_args) === '[object Object]') {
                document.cookie = object2CookiesStr(_args);
            }

            if (Object.prototype.toString.call(_args) === '[object Array]') {
                _args.forEach(item => {
                    document.cookie = object2CookiesStr(item);
                });
            }
        }

        if (arguments.length > 1) {
            var _obj = arguments[2] || {};
            _obj.name = arguments[0];
            _obj.value = arguments[1];
            document.cookie = object2CookiesStr(_obj);
        }
    },

    get: function () {
        if (!_support || !_cookieEnabled) { return; }

        var _obj = cookiesStr2Object(decodeURIComponent(document.cookie));

        if (arguments.length === 0) {
            return _obj;
        }

        if (arguments.length > 0) {
            var _args = arguments[0];
            var _argsType = Object.prototype.toString.call(_args);

            if (_argsType === '[object String]') {
                return _obj[_args] || '';
            }

            if (_argsType === '[object Array]' && _args.length > 0) {
                var _result = {};
                var _dataType = Object.prototype.toString.call(_args[0]);

                _args.forEach(item => {
                    if (_dataType === '[object String]') {
                        _result[item] = _obj[item] || '';
                    }

                    if (_dataType === '[object Object]') {
                        _result[item.alias || item.name] = _obj[item.name] || '';
                    }
                });

                return _result;
            }
        }

        return {};
    },

    remove: function () {
        if (!_support || !_cookieEnabled) { return; }

        if (arguments.length > 0) {
            var _args = arguments[0];
            var _argsType = Object.prototype.toString.call(_args);

            if (_argsType === '[object String]') {
                document.cookie = object2CookiesStr({ name: _args, value: '', path: arguments[1] || '', expires: new Date() });
            }

            if (_argsType === '[object Array]' && _args.length > 0) {
                var _dataType = Object.prototype.toString.call(_args[0]);

                _args.forEach(item => {
                    if (_dataType === '[object String]') {
                        document.cookie = object2CookiesStr({ name: item, value: '', expires: new Date() });
                    }

                    if (_dataType === '[object Object]') {
                        var _cookie = item;
                        _cookie.value = '';
                        _cookie.expires = new Date();
                        document.cookie = object2CookiesStr(_cookie);
                    }
                });
            }
        }
    },

    clear: function () {
        if (!_support || !_cookieEnabled) { return; }

        var _obj = cookiesStr2Object(decodeURIComponent(document.cookie));

        Object.keys(_obj).forEach(name => {
            document.cookie = object2CookiesStr({ name, value: '', expires: new Date() });
        });
    }
}
