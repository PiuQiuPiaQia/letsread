"use strict";var _typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},globalScope=require("./global_scope");if(!globalScope._pdfjsCompatibilityChecked){globalScope._pdfjsCompatibilityChecked=!0;var isNodeJS=require("./is_node"),hasDOM="object"===("undefined"===typeof window?"undefined":_typeof(window))&&"object"===("undefined"===typeof document?"undefined":_typeof(document));(function(){!globalScope.btoa&&isNodeJS()&&(globalScope.btoa=function(e){return Buffer.from(e,"binary").toString("base64")})})(),function(){!globalScope.atob&&isNodeJS()&&(globalScope.atob=function(e){return Buffer.from(e,"base64").toString("binary")})}(),function(){hasDOM&&("currentScript"in document||Object.defineProperty(document,"currentScript",{get:function(){var e=document.getElementsByTagName("script");return e[e.length-1]},enumerable:!0,configurable:!0}))}(),function(){hasDOM&&"undefined"===typeof Element.prototype.remove&&(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})}(),function(){if(hasDOM&&!isNodeJS()){var e=document.createElement("div");if(!1!==e.classList.toggle("test",0)){var o=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e){if(arguments.length>1){var t=!!arguments[1];return this[t?"add":"remove"](e),t}return o(e)}}}}(),function(){String.prototype.includes||require("core-js/fn/string/includes")}(),function(){Array.prototype.includes||require("core-js/fn/array/includes")}(),function(){Object.assign||require("core-js/fn/object/assign")}(),function(){Math.log2||(Math.log2=require("core-js/fn/math/log2"))}(),function(){Number.isNaN||(Number.isNaN=require("core-js/fn/number/is-nan"))}(),function(){Number.isInteger||(Number.isInteger=require("core-js/fn/number/is-integer"))}(),function(){globalScope.Promise||(globalScope.Promise=require("core-js/fn/promise"))}(),function(){globalScope.WeakMap||(globalScope.WeakMap=require("core-js/fn/weak-map"))}(),function(){String.codePointAt||(String.codePointAt=require("core-js/fn/string/code-point-at"))}(),function(){String.fromCodePoint||(String.fromCodePoint=require("core-js/fn/string/from-code-point"))}(),function(){globalScope.Symbol||require("core-js/es6/symbol")}(),function(){Object.values||(Object.values=require("core-js/fn/object/values"))}()}