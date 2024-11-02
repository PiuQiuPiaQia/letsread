"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PDFViewer=void 0;var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),_base_viewer=require("./base_viewer"),_ui_utils=require("./ui_utils"),_pdf=require("../pdf");function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var PDFViewer=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"_scrollIntoView",value:function(e){var t=e.pageDiv,i=e.pageSpot,r=void 0===i?null:i;if(!r&&!this.isInPresentationMode){var n=t.offsetLeft+t.clientLeft,o=n+t.clientWidth,s=this.container,a=s.scrollLeft,l=s.clientWidth;(this._scrollMode===_base_viewer.ScrollMode.HORIZONTAL||n<a||o>a+l)&&(r={left:0,top:0})}(0,_ui_utils.scrollIntoView)(t,r)}},{key:"_getVisiblePages",value:function(){if(!this.isInPresentationMode)return(0,_ui_utils.getVisibleElements)(this.container,this._pages,!0,this._scrollMode===_base_viewer.ScrollMode.HORIZONTAL);var e=this._pages[this._currentPageNumber-1],t=[{id:e.id,view:e}];return{first:e,last:e,views:t}}},{key:"update",value:function(){var e=this._getVisiblePages(),t=e.views,i=t.length;if(0!==i){this._resizeBuffer(i,t),this.renderingQueue.renderHighestPriority(e);for(var r=this._currentPageNumber,n=!1,o=0;o<i;++o){var s=t[o];if(s.percent<100)break;if(s.id===r){n=!0;break}}n||(r=t[0].id),this.isInPresentationMode||this._setCurrentPageNumber(r),this._updateLocation(e.first),this.eventBus.dispatch("updateviewarea",{source:this,location:this._location})}}},{key:"_setDocumentViewerElement",get:function(){return(0,_pdf.shadow)(this,"_setDocumentViewerElement",this.viewer)}},{key:"_isScrollModeHorizontal",get:function(){return!this.isInPresentationMode&&this._scrollMode===_base_viewer.ScrollMode.HORIZONTAL}}]),t}(_base_viewer.BaseViewer);exports.PDFViewer=PDFViewer;