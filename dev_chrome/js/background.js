/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/classes/Helpers.js":
/*!*******************************!*\
  !*** ./js/classes/Helpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Helpers {
  timeout(ms) {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  }

  blob_to_base64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
const helpers = new Helpers();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (helpers);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./js/entry/background.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/Helpers */ "./js/classes/Helpers.js");

console.log(1);

(function () {
  chrome.runtime.onMessage.addListener((msg, _sender, cb) => {
    const reason = msg.reason;
    const data = msg.data;
    if (reason === "fetch_voice") {
      console.log("fetch_voice");
      (async function () {
        const blob_response = await fetch(data.base64);
        const blob = await blob_response.blob();
        const form_data = new FormData();
        form_data.append("file", blob);
        form_data.append("type", "audio/wav");
        const response = await fetch("http://35.189.230.56/v1/command?x-api-key=k2Dyz1PF3ZrThf", {
          method: "POST",
          body: form_data,
        });
        const resp_blob = await response.blob();

        const base64_upg = await _classes_Helpers__WEBPACK_IMPORTED_MODULE_0__["default"].blob_to_base64(resp_blob);

        cb(base64_upg);
      })();

      return true;
    }
  });
})();

})();

/******/ })()
;
//# sourceMappingURL=background.js.map