"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GenericL10n=void 0;var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_createClass=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}();function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise((function(e,n){function t(a,u){try{var o=r[a](u),i=o.value}catch(c){return void n(c)}if(!o.done)return Promise.resolve(i).then((function(e){t("next",e)}),(function(e){t("throw",e)}));e(i)}return t("next")}))}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}require("../external/webL10n/l10n");var webL10n=document.webL10n,GenericL10n=function(){function e(r){_classCallCheck(this,e),this._lang=r,this._ready=new Promise((function(e,n){webL10n.setLanguage(r,(function(){e(webL10n)}))}))}return _createClass(e,[{key:"getLanguage",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(){var r;return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._ready;case 2:return r=e.sent,e.abrupt("return",r.getLanguage());case 4:case"end":return e.stop()}}),e,this)})));function r(){return e.apply(this,arguments)}return r}()},{key:"getDirection",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(){var r;return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._ready;case 2:return r=e.sent,e.abrupt("return",r.getDirection());case 4:case"end":return e.stop()}}),e,this)})));function r(){return e.apply(this,arguments)}return r}()},{key:"get",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(r,n,t){var a;return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._ready;case 2:return a=e.sent,e.abrupt("return",a.get(r,n,t));case 4:case"end":return e.stop()}}),e,this)})));function r(r,n,t){return e.apply(this,arguments)}return r}()},{key:"translate",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(r){var n;return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._ready;case 2:return n=e.sent,e.abrupt("return",n.translate(r));case 4:case"end":return e.stop()}}),e,this)})));function r(r){return e.apply(this,arguments)}return r}()}]),e}();exports.GenericL10n=GenericL10n;