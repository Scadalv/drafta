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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/settings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/settings.js":
/*!*******************************!*\
  !*** ./resources/settings.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/config */ "./src/config.js");

document.addEventListener('contextmenu', function (e) {
  return e.preventDefault();
});
document.addEventListener('DOMContentLoaded', function () {
  window.postMessage('requestInitialData', null);
});

window.initialData = function (d) {
  var params = JSON.parse(d);

  if (params && params.username !== undefined) {
    document.getElementById('username').textContent = params.username;
    document.getElementById('logout').style.display = 'block';
  } else {
    document.getElementById('login').style.display = 'block';
  }
};

document.getElementById('closeWindow').addEventListener('click', function (e) {
  e.preventDefault();
  window.postMessage('closeBrowserWindow', null);
});

window.openUrl = function (e) {
  e.preventDefault();
  window.postMessage('openUrl', e.target.getAttribute('data-href'));
};

document.getElementById('loginSubmit').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('errorMessage').style.opacity = '0';
  var username = document.getElementById('formUsername').value;
  var password = document.getElementById('formPassword').value;

  if (username !== '' && password !== '') {
    var data = {
      username: username,
      password: password
    };
    document.getElementById('progressBar').classList.add('progress-bar--width-animation');
    document.getElementById('progressBarStatus').style.opacity = '1';
    document.getElementById('progressBarStatus').style.width = '50%';
    fetch("".concat(_src_config__WEBPACK_IMPORTED_MODULE_0__["default"].API_URL_HTTP, "/login"), {
      method: 'POST',
      headers: {
        'Accept': "application/json;version=".concat(_src_config__WEBPACK_IMPORTED_MODULE_0__["default"].API_VERSION),
        'Content-Type': 'application/json',
        'User-Agent': "Sketch ".concat(_src_config__WEBPACK_IMPORTED_MODULE_0__["default"].APP_VERSION)
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      document.getElementById('progressBarStatus').style.width = '100%';

      if (response.status === 200) {
        return response.json();
      }

      return Promise.reject(response);
    }).then(function (output) {
      setTimeout(function () {
        document.getElementById('progressBar').classList.remove('progress-bar--animation');
        document.getElementById('progressBarStatus').style.opacity = '0';

        if (output && output.token) {
          window.postMessage('saveUserAuthSettings', JSON.stringify({
            username: data.username,
            token: output.token
          }));
          window.postMessage('closeBrowserWindow', null);
        }
      }, 500);
    }).catch(function () {
      document.getElementById('progressBarStatus').style.width = '100%';
      setTimeout(function () {
        document.getElementById('errorMessage').style.opacity = '1';
        document.getElementById('progressBar').classList.remove('progress-bar--animation');
        document.getElementById('progressBarStatus').style.opacity = '0';
        setTimeout(function () {
          document.getElementById('progressBarStatus').style.width = '0%';
        }, 200);
      }, 500);
    });
  } else {
    document.getElementById('errorMessage').style.opacity = '1';
  }
});
document.getElementById('logoutSubmit').addEventListener('click', function (e) {
  e.preventDefault();
  window.postMessage('clearUserAuthSettings', null);
  window.postMessage('closeBrowserWindow', null);
});

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  APP_KEY: 'com.fragment.sketch.drafta',
  APP_VERSION: '1.0.3',
  API_VERSION: '1.0',
  API_URL_HTTP: 'http://drafta.co/api',
  API_URL_HTTPS: 'https://drafta.co/api'
});

/***/ })

/******/ });
//# sourceMappingURL=settings.js.map