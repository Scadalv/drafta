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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/export.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/export.js":
/*!*****************************!*\
  !*** ./resources/export.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/config */ "./src/config.js");

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
document.addEventListener('DOMContentLoaded', function () {
  window.postMessage('requestInitialData', null);
  document.getElementById('uploadSubmit').disabled = false;
  document.getElementById('exportCancel').disabled = false;
});

window.initialData = function (d) {
  var params = JSON.parse(d);

  if (params && params.exportCount) {
    document.getElementById('exportTitle').innerHTML = "<span class=\"icon-file\"></span>".concat(params.exportCount, " ").concat(params.exportCount > 1 ? 'artboards' : 'artboard');
  }

  if (params && params.token) {
    document.getElementById('progressBar').classList.add('progress-bar--width-animation');
    document.getElementById('progressBarStatus').style.opacity = '1';
    document.getElementById('progressBarStatus').style.width = '50%';
    fetch("".concat(_src_config__WEBPACK_IMPORTED_MODULE_0__["default"].API_URL_HTTP, "/projects"), {
      method: 'GET',
      headers: {
        'Accept': "application/json;version=".concat(_src_config__WEBPACK_IMPORTED_MODULE_0__["default"].API_VERSION),
        'Content-Type': 'application/json',
        'User-Agent': "Sketch ".concat(_src_config__WEBPACK_IMPORTED_MODULE_0__["default"].APP_VERSION),
        'X-AUTH-TOKEN': params.token
      }
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

        if (output.length) {
          document.getElementById('exportBeforeUploadActions').style.display = 'flex';
          document.getElementById('export').style.opacity = '1';
          document.getElementById('export').style.visibility = 'visible';
          var selectElement = document.getElementById('project');
          output.forEach(function (item) {
            var optionElement = document.createElement('option');
            optionElement.value = item.id;
            optionElement.innerHTML = item.name;
            selectElement.appendChild(optionElement);
          });

          if (params && params.selectedProject) {
            selectElement.value = params.selectedProject;
          }
        }
      }, 500);
    }).catch(function () {
      setTimeout(function () {
        document.getElementById('progressBar').classList.remove('progress-bar--animation');
        document.getElementById('progressBarStatus').style.opacity = '0';
      }, 500);
    });
  }

  var sizeElement = document.getElementById('size');

  if (params && params.selectedSize) {
    sizeElement.value = params.selectedSize;
  }
};

document.getElementById('uploadSubmit').addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.disabled) {
    e.target.disabled = true;
    setTimeout(function () {
      document.getElementById('closeWindow').style.display = 'none';
      document.getElementById('progressBarStatus').style.width = '0%';
      document.getElementById('exportTitle').innerHTML = '<span class="icon-file"></span>Uploading...';
      document.getElementById('exportForm').classList.add('export__form-wrapper--disabled');
      document.getElementById('exportBeforeUploadActions').style.display = 'none';
      document.getElementById('exportWhenUploadingActions').style.display = 'flex';
      setTimeout(function () {
        document.getElementById('progressBar').classList.add('progress-bar--width-animation');
        document.getElementById('progressBarStatus').style.opacity = '1';
        window.postMessage('upload', JSON.stringify({
          selectedProject: document.getElementById('project').value,
          selectedSize: document.getElementById('size').value
        }));
      }, 500);
      window.postMessage('saveSettingsForProject', JSON.stringify({
        selectedProject: document.getElementById('project').value,
        selectedSize: document.getElementById('size').value
      }));
    }, 100);
  }
});

window.exportStatus = function (d) {
  var params = JSON.parse(d);

  if (!params.status && params.progress > 0 && parseInt(document.getElementById('progressBarStatus').style.width, 10) < params.progress) {
    document.getElementById('progressBar').classList.add('progress-bar--width-animation');
    document.getElementById('progressBarStatus').style.opacity = '1';
    document.getElementById('progressBarStatus').style.width = "".concat(params.progress, "%");
  }
};

window.authError = function () {
  document.getElementById('export').style.opacity = '0';
  document.getElementById('export').style.visibility = 'hidden';
  document.getElementById('cancelling').style.opacity = '0';
  document.getElementById('cancelling').style.visibility = 'hidden';
  setTimeout(function () {
    document.getElementById('alert').style.opacity = '1';
    document.getElementById('alert').style.visibility = 'visible';
    document.getElementById('closeWindow').style.display = 'block';
    document.getElementById('progressBarStatus').style.opacity = '0';
  }, 100);
};

window.success = function (d) {
  var params = JSON.parse(d);

  if (params.title && params.projectUrl) {
    document.getElementById('exportTitle').innerHTML = "<span class=\"icon-check\"></span>".concat(params.title);
    document.getElementById('exportForm').style.display = 'none';
    document.getElementById('exportWhenUploadingActions').style.display = 'none';
    document.getElementById('openProject').setAttribute('data-href', params.projectUrl);
    document.getElementById('exportAfterUploadActions').style.display = 'flex';
    document.getElementById('closeWindow').style.display = 'block';
    setTimeout(function () {
      document.getElementById('progressBarStatus').style.opacity = '0';
    }, 100);
  }
};

window.openUrl = function (e) {
  e.preventDefault();
  window.postMessage('openUrl', e.target.getAttribute('data-href'));
};

document.getElementById('exportCancel').addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.disabled) {
    e.target.disabled = true;
    document.getElementById('progressBarStatus').style.opacity = '0';
    setTimeout(function () {
      window.postMessage('cancelUploading', null);
      window.postMessage('closeBrowserWindow', null);
    }, 100);
  }
});
document.getElementById('closeWindow').addEventListener('click', function (e) {
  e.preventDefault();
  window.postMessage('closeBrowserWindow', null);
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
  APP_VERSION: '1.0.4',
  API_VERSION: '1.0',
  API_URL_HTTP: 'http://drafta.co/api',
  API_URL_HTTPS: 'https://drafta.co/api'
});

/***/ })

/******/ });
//# sourceMappingURL=export.js.map