"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NetworkPdfManager=exports.LocalPdfManager=void 0;var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_util=require("../shared/util"),_chunked_stream=require("./chunked_stream"),_document=require("./document"),_stream=require("./stream");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise((function(e,r){function n(a,u){try{var o=t[a](u),s=o.value}catch(i){return void r(i)}if(!o.done)return Promise.resolve(s).then((function(e){n("next",e)}),(function(e){n("throw",e)}));e(s)}return n("next")}))}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var BasePdfManager=function(){function e(){_classCallCheck(this,e),this.constructor===e&&(0,_util.unreachable)("Cannot initialize BasePdfManager.")}return _createClass(e,[{key:"onLoadedStream",value:function(){(0,_util.unreachable)("Abstract method `onLoadedStream` called")}},{key:"ensureDoc",value:function(e,t){return this.ensure(this.pdfDocument,e,t)}},{key:"ensureXRef",value:function(e,t){return this.ensure(this.pdfDocument.xref,e,t)}},{key:"ensureCatalog",value:function(e,t){return this.ensure(this.pdfDocument.catalog,e,t)}},{key:"getPage",value:function(e){return this.pdfDocument.getPage(e)}},{key:"cleanup",value:function(){return this.pdfDocument.cleanup()}},{key:"ensure",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(t,r,n){return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:(0,_util.unreachable)("Abstract method `ensure` called");case 1:case"end":return e.stop()}}),e,this)})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"requestRange",value:function(e,t){(0,_util.unreachable)("Abstract method `requestRange` called")}},{key:"requestLoadedStream",value:function(){(0,_util.unreachable)("Abstract method `requestLoadedStream` called")}},{key:"sendProgressiveData",value:function(e){(0,_util.unreachable)("Abstract method `sendProgressiveData` called")}},{key:"updatePassword",value:function(e){this._password=e}},{key:"terminate",value:function(){(0,_util.unreachable)("Abstract method `terminate` called")}},{key:"docId",get:function(){return this._docId}},{key:"password",get:function(){return this._password}},{key:"docBaseUrl",get:function(){var e=null;if(this._docBaseUrl){var t=(0,_util.createValidAbsoluteUrl)(this._docBaseUrl);t?e=t.href:(0,_util.warn)('Invalid absolute docBaseUrl: "'+this._docBaseUrl+'".')}return(0,_util.shadow)(this,"docBaseUrl",e)}}]),e}(),LocalPdfManager=function(e){function t(e,r,n,a,u){_classCallCheck(this,t);var o=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));o._docId=e,o._password=n,o._docBaseUrl=u,o.evaluatorOptions=a;var s=new _stream.Stream(r);return o.pdfDocument=new _document.PDFDocument(o,s),o._loadedStreamPromise=Promise.resolve(s),o}return _inherits(t,e),_createClass(t,[{key:"ensure",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(t,r,n){var a;return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t[r],"function"!==typeof a){e.next=3;break}return e.abrupt("return",a.apply(t,n));case 3:return e.abrupt("return",a);case 4:case"end":return e.stop()}}),e,this)})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"requestRange",value:function(e,t){return Promise.resolve()}},{key:"requestLoadedStream",value:function(){}},{key:"onLoadedStream",value:function(){return this._loadedStreamPromise}},{key:"terminate",value:function(){}}]),t}(BasePdfManager),NetworkPdfManager=function(e){function t(e,r,n,a,u){_classCallCheck(this,t);var o=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._docId=e,o._password=n.password,o._docBaseUrl=u,o.msgHandler=n.msgHandler,o.evaluatorOptions=a,o.streamManager=new _chunked_stream.ChunkedStreamManager(r,{msgHandler:n.msgHandler,url:n.url,length:n.length,disableAutoFetch:n.disableAutoFetch,rangeChunkSize:n.rangeChunkSize}),o.pdfDocument=new _document.PDFDocument(o,o.streamManager.getStream()),o}return _inherits(t,e),_createClass(t,[{key:"ensure",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark((function e(t,r,n){var a;return _regenerator2.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,a=t[r],"function"!==typeof a){e.next=4;break}return e.abrupt("return",a.apply(t,n));case 4:return e.abrupt("return",a);case 7:if(e.prev=7,e.t0=e["catch"](0),e.t0 instanceof _util.MissingDataException){e.next=11;break}throw e.t0;case 11:return e.next=13,this.requestRange(e.t0.begin,e.t0.end);case 13:return e.abrupt("return",this.ensure(t,r,n));case 14:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"requestRange",value:function(e,t){return this.streamManager.requestRange(e,t)}},{key:"requestLoadedStream",value:function(){this.streamManager.requestAllChunks()}},{key:"sendProgressiveData",value:function(e){this.streamManager.onReceiveData({chunk:e})}},{key:"onLoadedStream",value:function(){return this.streamManager.onLoadedStream()}},{key:"terminate",value:function(){this.streamManager.abort()}}]),t}(BasePdfManager);exports.LocalPdfManager=LocalPdfManager,exports.NetworkPdfManager=NetworkPdfManager;