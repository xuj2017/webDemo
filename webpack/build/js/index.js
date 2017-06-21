/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);
__webpack_require__(8);
var text3 = function () {
    var body = document.body;
    var div = document.createElement('div');
    div.innerHTML = '这是测试3';
    body.appendChild(div);
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var test1 = __webpack_require__(3);
var test2 = __webpack_require__(4);
var cookie = __webpack_require__(2);
test1();
test2();
var app = document.getElementById("app");
app.innerHTML = test1.tpl;

cookie.set('name', 'xujun', 2);
cookie.set('caneer', 'developer', 1);
console.log(cookie.get("name"));
cookie.del("name");
console.log(cookie.get("name"));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * cookie功能库
 * 提供增加，修改，删除cookie功能
 */

var cookie = {
  get: function get(name) {
    var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (xarr != null) return decodeURIComponent(xarr[2]);
    return null;
  },
  set: function set(key, value, expiredays) {

    var cookieText = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";";
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    cookieText += "expires=" + exdate.toGMTString() + ";path=/;";
    document.cookie = cookieText;
  },
  del: function del(key) {
    var value = this.get(key);
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);

    if (value && value != '') {
      document.cookie = encodeURIComponent(key) + '=' + escape(value) + ';path=/;expires=' + exdate.toGMTString();
    }
  }

};

module.exports = cookie;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);
var tpl = __webpack_require__(9);
function text1() {
    var body = document.body;
    var div = document.createElement('div');
    div.innerHTML = '这是测试1';
    body.appendChild(div);
    // var app = document.getElementById("app")
    // app.innerHTML = tpl;
    return {
        tpl: tpl
    };
}

module.exports = text1;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);
function text2() {
    var body = document.body;
    var span = document.createElement('span');
    span.innerHTML = '这是测试2';
    body.appendChild(span);
}

module.exports = text2;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n    <title>webpack demo</title>\r\n</head>\r\n<body>\r\n    <div id=\"app\"></div>\r\n    <div class=\"parent\">\r\n        <div class=\"child\">qweqwrqrw</div>\r\n    </div>\r\n    <div class=\"a\">\r\n        <div class=\"b\">\r\n            <div class=\"c\">\r\n                qweasdqweasd\r\n            </div>\r\n        </div>\r\n    </div>\r\n </body>\r\n</html>";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrap\">\r\n    this is a modeles html\r\n</div>";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);