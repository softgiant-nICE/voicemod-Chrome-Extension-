/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/chromane/js/Log.js":
/*!******************************************!*\
  !*** ../node_modules/chromane/js/Log.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Log)
/* harmony export */ });
class Log {
  constructor(config) {
    this.config = config;
  }
  write() {
    if (this.config !== "prod") {
      console.log(Array.from(arguments));
    }
  }
  write_method_call({
    obj,
    class_name,
    method_name,
    args,
    output,
    error,
    stub,
    stack,
    ignore,
  }) {
    if (!ignore && this.config !== "prod") {
      let log_color = "eggshell";
      if (stub) {
        log_color = "yellow";
      } else if (error) {
        log_color = "red";
      } else {
        log_color = "white";
      }

      console.groupCollapsed(
        "%c " + class_name + "." + method_name,
        `color: ${log_color}`
      );
      console.log("this:");
      console.log(obj);
      console.log("input:");
      for (var i = 0; i < args.length; i++) {
        console.log(args[i]);
      }
      console.log(args);
      console.log("output:");
      console.log(output);

      if (error) {
        console.log(stack);
      }

      console.groupEnd();
    }
  }
  do_not_log() {}
  do_log() {}
}


/***/ }),

/***/ "../node_modules/chromane/js/Util.js":
/*!*******************************************!*\
  !*** ../node_modules/chromane/js/Util.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log */ "../node_modules/chromane/js/Log.js");


class Util {
  // dig
  // utility function for finding strings in global variables
  dig(seen_objects, path, src) {
    seen_objects.add(src);
    let keys = Object.keys(src);
    for (let len = keys.length, i = 0; i < len; i++) {
      let key = keys[i];
      let v = src[key];
      if (!v || seen_objects.has(v)) {
        continue;
      }
      if (typeof v === "string") {
        console.log(path.join("."), key, v);
      } else if (typeof v === "object") {
        let new_path = JSON.parse(JSON.stringify(path));
        new_path.push(key);
        dig(seen_objects, new_path, v);
      }
    }
  }

  // !NOT FINISHED
  detect_changes(target, interval, callback) {
    let last_change_ts = 0;
    let last_callback_call_ts = 0;
    let observer = new MutationObserver(() => {
      let now_ts = Date.now();
      if (now_ts - last_change_ts > intervalc) {
      }
      last_change_ts = Date.now();
    });
    observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    setInterval(() => {}, interval);
    callback();
  }
  //
  inject_js() {
    let script = document.createElement("script");
    script.src = chrome.runtime.getURL("/js/injected.js");
    document.documentElement.append(script);
  }
  async inject_css() {
    var css = await this.fetch_text(this.get_url("/css/content.css"));
    document.documentElement.append(
      this.html_to_element(`<style>${css}</style>`)
    );
  }
  get_iframe_src() {
    if (this.config.mode === "dev") {
      return "http://localhost:2010/";
    } else {
      return chrome.runtime.getURL("/pages/app/index.html");
    }
  }
  find_text_input(element) {
    let text_input = Array.from(
      element.querySelectorAll("input, textarea")
    ).filter((input) => {
      return (
        input.type === "text" ||
        input.type === "textarea" ||
        input.type === "number" ||
        input.type === "email"
      );
    })[0];
    return text_input;
  }
  constructor(config) {
    this.config = config;
    this.log = new _Log__WEBPACK_IMPORTED_MODULE_0__["default"](config);
  }
  get_url(url) {
    return chrome.runtime.getURL(url);
  }
  get_value(selector) {
    let el = $(selector).get(0);

    if (el) {
      if (el.tagName === "META") {
        return el.getAttribute("content").trim();
      } else {
        return el.textContent.trim();
      }
    } else {
      return "Not available";
    }
  }
  async wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  decode_json(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return null;
    }
  }
  clone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      return null;
    }
  }
  is_undefined(value) {
    return typeof value === "undefined";
  }

  list_is_empty(list) {
    return list.length === 0;
  }

  object_is_empty(object) {
    return Object.keys(object).length === 0;
  }
  async fetch_json(url, data) {
    let r = await fetch(url, data);
    let text = await r.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.log("error");
      console.log(e);
      return null;
    }
  }
  async fetch_text(url) {
    let r = await fetch(url);
    let text = await r.text();
    return text;
  }
  async wait_for_ready_state_complete() {
    while (true) {
      if (document.readyState === "complete") {
        return;
      } else {
        await this.wait(200);
      }
    }
  }
  async wait_for_element(selector) {
    for (let i = 0; i < 1000; i++) {
      let element = document.querySelector(selector);
      if (element) {
        return element;
      } else {
        await this.wait(100);
      }
    }
  }
  simulate(element, event_name) {
    element.dispatchEvent(new Event(event_name, { bubbles: true }));
  }
  html_to_element(html) {
    // var doc = new DOMParser().parseFromString(html, "text/html");
    // this.deps.log.write("doc", doc);
    // return doc.body.firstChild;

    let div = document.createElement("div");
    div.innerHTML = html;
    return div.firstElementChild;
  }
  // complex selectors
  run_complex_selector(selector) {
    // init root_element
    if (selector.root_css) {
      var root_element = document.querySelector(selector.root_css);

      if (!root_element) {
        root_element = document;
      }
    } else if (selector.root_element) {
      var root_element = selector.root_element;
    } else {
      var root_element = document;
    }

    // this.deps.log.write("root_element", root_element);

    // init element_arr
    if (selector.css) {
      var element_arr = Array.from(root_element.querySelectorAll(selector.css));
    } else {
      var element_arr = Array.from(root_element.querySelectorAll("*"));
    }

    // this.deps.log.write("element_arr", element_arr);

    // filter by inner_text

    if (selector.inner_text) {
      for (var i = element_arr.length; i--; ) {
        if (element_arr[i].innerText !== selector.inner_text) {
          element_arr.splice(i, 1);
        }
      }
    }

    if (selector.inner_text_includes) {
      for (var i = element_arr.length; i--; ) {
        if (
          element_arr[i].innerText
            .toLowerCase()
            .includes(selector.inner_text_includes) === false
        ) {
          element_arr.splice(i, 1);
        }
      }
    }

    // filter by style
    if (selector.style) {
      var key_arr = Object.keys(selector.style);
      var style = null;

      loop_1: for (var i = element_arr.length; i--; ) {
        style = window.getComputedStyle(element_arr[i]);

        loop_2: for (var j = key_arr.length; j--; ) {
          if (selector.style[key_arr[j]] !== style[key_arr[j]]) {
            element_arr.splice(i, 1);
            continue loop_1;
          }
        }
      }
    }

    //filter by min_area
    if (selector.min_area) {
      for (let i = element_arr.length; i--; ) {
        let rect = element_arr[i].getBoundingClientRect();
        let area = rect.width * rect.height;
        if (area < selector.min_area) {
          element_arr.splice(i, 1);
        }
      }
    }

    // return
    return element_arr;
  }
  find_element(complex_selector_arr) {
    var element = null;

    for (var i = 0; i < complex_selector_arr.length; i++) {
      var element_arr = this.run_complex_selector(complex_selector_arr[i]);

      if (element_arr && element_arr.length > 0) {
        return element_arr[0];
      }
    }

    return null;
  }
  find_elements(complex_selector_arr) {
    var element = null;

    for (var i = 0; i < complex_selector_arr.length; i++) {
      var element_arr = this.run_complex_selector(complex_selector_arr[i]);

      if (element_arr && element_arr.length > 0) {
        return element_arr;
      } else {
        return [];
      }
    }

    return null;
  }
  bg_fetch(url, data) {
    return new Promise((r) => {
      chrome.runtime.sendMessage(
        {
          name: "fetch_json",
          data: { url, data },
        },
        (result) => {
          r(result);
        }
      );
    });
  }
  // window api
  create_iframe_wrap(iframe) {
    let promise = new Promise((r) => {
      let listener = (event) => {
        if (
          event.data &&
          event.data.name === "iframe_ready" &&
          iframe.contentWindow === event.source
        ) {
          console.log("iframe_ready", event.source);
          let iframe_window = event.source;
          window.removeEventListener("message", listener);
          r(this.create_window_wrap(window, iframe_window));
        }
      };
      window.addEventListener("message", listener);
    });
    return {
      exec: (name, data) => {
        return promise.then((wrap) => {
          return wrap.exec(name, data);
        });
      },
    };
  }

  create_window_wrap(window, target_window) {
    //
    let _resolvers = [];
    window.addEventListener("message", async (event) => {
      if (event.data) {
        let name = event.data.name;
        let meta = event.data.meta;
        let data = event.data.data;
        if (
          name === "exec_result" &&
          meta &&
          meta.response &&
          _resolvers[meta.request_id]
        ) {
          _resolvers[meta.request_id](data.result);
        }
      }
    });
    return {
      exec: (name, data) => {
        return new Promise((r) => {
          let request_id = _resolvers.length;
          _resolvers.push(r);
          let meta = { request_id, request: true };
          target_window.postMessage({ name, meta, data }, "*");
        });
      },
    };
  }
  create_window_api(methods) {
    window.addEventListener("message", async (event) => {
      if (event.data) {
        let name = event.data.name;
        let meta = event.data.meta;
        let data = event.data.data;
        if (methods[name]) {
          let result = await methods[name](data);
          event.source.postMessage(
            {
              name: "exec_result",
              meta: {
                response: true,
                request_id: meta,
                request_id: meta.request_id,
              },
              data: { result },
            },
            "*"
          );
        }
      }
    });
  }
  // runtime api ( background )
  create_runtime_api(methods) {
    chrome.runtime.onMessage.addListener(function (message, sender, callback) {
      console.log(methods, message);
      if (methods[message.name]) {
        if (message.data && message.data._sender) {
          message.data._sender = sender;
        }
        methods[message.name](message.data).then(callback);
      } else {
        callback(null);
      }
      return true;
    });
  }
  runtime_exec(name, data) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          name,
          data,
        },
        resolve
      );
    });
  }
  // google sheets helper
  parse_rows(rows) {
    var data_arr = [];
    var data = null;

    // assume that the first row defines the property names of each object
    var property_name_arr = rows[0];

    for (var i = 1; i < rows.length; i++) {
      data = {};

      for (var j = 0; j < property_name_arr.length; j++) {
        data[property_name_arr[j]] = rows[i][j];
      }

      data_arr.push(data);
    }

    return data_arr;
  }
  // class wrapper
  get_methods(obj) {
    return Object.getOwnPropertyNames(obj).filter((item) => {
      return typeof obj[item] === "function";
    });
  }
  wrap_class(item, ignore) {
    ignore = ignore || [];
    let util = this;
    let class_name = item.name;
    let methods = this.get_methods(item.prototype);
    methods.forEach((method_name) => {
      let original = item.prototype[method_name];
      item.prototype[method_name] = function () {
        let log = {
          ignore: ignore.includes(method_name),
          obj: this,
          class_name,
          method_name,
          args: Array.from(arguments),
        };
        let stubs = util.stubs;
        if (
          stubs &&
          stubs[0] &&
          stubs[0].class_name === class_name &&
          stubs[0].method_name === method_name
        ) {
          log.stub = true;
          log.output = stubs[0].output;
          stubs.splice(0, 1);
          util.log.write_method_call(log);
          return log.output;
        } else {
          try {
            log.output = original.apply(this, arguments);
          } catch (e) {
            log.error = true;
            log.stack = e.stack;
            log.output = null;
          }
          if (log.output && log.output.then) {
            log.output = new Promise((resolve) => {
              log.output
                .then((result) => {
                  log.output = result;
                  util.log.write_method_call(log);
                  resolve(result);
                })
                .catch((e) => {
                  log.error = true;
                  log.stack = e.stack;
                  log.output = null;
                  util.log.write_method_call(log);
                  resolve(null);
                });
            });
          } else {
            util.log.write_method_call(log);
          }
          return log.output;
        }
      };
    });
  }
  set_stubs(stubs) {
    this.stubs = stubs;
  }
  // Old Common
  post_window_message(target, name, data) {
    target.postMessage({ name, data }, "*");
  }

  blob_to_base64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  download_string(str, name) {
    var blob = new Blob([str], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");

    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = name;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  download_blob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");

    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  find(arr, key, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === value) {
        return arr[i];
      }
    }
    return null;
  }

  update_object(object, new_object) {
    Object.keys(new_object).forEach((key) => {
      if (object[key] !== null && typeof object[key] === "object") {
        this.update_object(object[key], new_object[key]);
      } else {
        object[key] = new_object[key];
      }
    });
  }

  rows_to_data_arr(rows) {
    var data_arr = [];
    var data = null;
    // assume that the first row defines the property names of each object
    var property_name_arr = rows[0];
    for (var i = 1; i < rows.length; i++) {
      data = {};
      for (var j = 0; j < property_name_arr.length; j++) {
        data[property_name_arr[j]] = rows[i][j];
      }
      data_arr.push(data);
    }
    return data_arr;
  }

  to_data_url(url) {
    return new Promise((resolve) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };

      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }
}


/***/ }),

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


/***/ }),

/***/ "./js/classes/IframeController.js":
/*!****************************************!*\
  !*** ./js/classes/IframeController.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helpers */ "./js/classes/Helpers.js");


class IframesController {
  constructor() {
    this.mini_popup = null;
  }

  async append_mini_popup() {
    if (this.mini_popup) {
      const msg = { reason: "go_to", data: { page_name: "init" } };
      this.send_msg_to_mini_popup(msg);
      await _Helpers__WEBPACK_IMPORTED_MODULE_0__["default"].timeout(0);
      this.show_mini_popup();
      return;
    }

    const iframe = this._create_iframe("mini-popup", "soundboard-mini-popup");
    iframe.classList.add("chromane-hide");
    this.mini_popup = iframe;
    document.body.append(iframe);
    await _Helpers__WEBPACK_IMPORTED_MODULE_0__["default"].timeout(100);
    iframe.classList.remove("chromane-hide");
  }

  hide_mini_popup() {
    if (!this.mini_popup) return;
    this.mini_popup.classList.add("chromane-hide");
  }
  show_mini_popup() {
    if (!this.mini_popup) return;
    if (this.mini_popup.classList.contains("chromane-hide")) {
      this.mini_popup.classList.remove("chromane-hide");
    }
  }

  send_msg_to_mini_popup(msg) {
    if (!this.mini_popup) return;
    this.mini_popup.contentWindow.postMessage(msg, "*");
  }

  _create_iframe(context, id) {
    const iframe = document.createElement("iframe");
    const ext_id = chrome.runtime.id;
    iframe.src = `chrome-extension://${ext_id}/pages/popup/index.html`;
    const name_data = { context };
    iframe.name = JSON.stringify(name_data);
    iframe.id = id;
    return iframe;
  }
}

const iframes_controller = new IframesController();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (iframes_controller);


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
/*!*****************************!*\
  !*** ./js/entry/content.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var chromane_js_Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chromane/js/Util.js */ "../node_modules/chromane/js/Util.js");
/* harmony import */ var _classes_Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/Helpers */ "./js/classes/Helpers.js");
/* harmony import */ var _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/IframeController */ "./js/classes/IframeController.js");




// Append script in the DOM

let script = document.createElement("script");
script.src = chrome.runtime.getURL("/js/injected.js");
document.documentElement.prepend(script);

// console.log()

(async function () {
  const _state = {
    is_record_active: false,
    record_state: "init", //generete|init|play|record
    is_e_key_pressed: false,
    is_combination_pressed: false,
  };

  const util = new chromane_js_Util_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  util.create_window_api({
    fetch_voice: async (base64) => {
      console.log("fetch_voice");
      const resp_base64 = await chrome.runtime.sendMessage({ reason: "fetch_voice", data: { base64 } });
      console.log("resp_base64", resp_base64);
      return resp_base64;
    },

    start_record: async (data) => {
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].append_mini_popup();
      _state.record_state = "record";
    },

    generete_record: async () => {
      const msg = { reason: "go_to", data: { page_name: "generete" } };
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].send_msg_to_mini_popup(msg);
      await _classes_Helpers__WEBPACK_IMPORTED_MODULE_1__["default"].timeout(0);
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].show_mini_popup();
      _state.record_state = "generete";
      return true;
    },

    play_record: async () => {
      const msg = { reason: "go_to", data: { page_name: "play" } };
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].send_msg_to_mini_popup(msg);
      await _classes_Helpers__WEBPACK_IMPORTED_MODULE_1__["default"].timeout(0);
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].show_mini_popup();
      _state.record_state = "play";
      return true;
    },
    stop_record_playing: async () => {
      const msg = { reason: "go_to", data: { page_name: "stop-playing" } };
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].send_msg_to_mini_popup(msg);
      await _classes_Helpers__WEBPACK_IMPORTED_MODULE_1__["default"].timeout(0);
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].show_mini_popup();
      _state.record_state = "init";
      await _classes_Helpers__WEBPACK_IMPORTED_MODULE_1__["default"].timeout(1000);
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].hide_mini_popup();
      return true;
    },
    mini_popup_ok_click: async () => {
      _classes_IframeController__WEBPACK_IMPORTED_MODULE_2__["default"].hide_mini_popup();
      return true;
    },
  });

  function handle_keydown(event) {
    if (event.code === "KeyE") {
      _state.is_e_key_pressed = true;
    }
    if (_state.is_e_key_pressed && event.ctrlKey && event.shiftKey) {
      _state.is_combination_pressed = true;
      if (_state.record_state === "init") {
        window.postMessage({ reason: "key_press" }, "*");
      }
    }
  }
  function handle_keyup(event) {
    if (event.code === "KeyE") {
      _state.is_e_key_pressed = false;
    }
    if (!_state.is_e_key_pressed || !event.ctrlKey || !event.shiftKey) {
      if (_state.is_combination_pressed) {
        _state.is_combination_pressed = false;
        window.postMessage({ reason: "key_up" }, "*");
      }
    }
  }
  document.addEventListener("keydown", (event) => {
    handle_keydown(event);
  });
  document.addEventListener("keyup", (event) => {
    handle_keyup(event);
  });
})();

})();

/******/ })()
;
//# sourceMappingURL=content.js.map