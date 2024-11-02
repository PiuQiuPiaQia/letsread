"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.loadScript=exports.DummyStatTimer=exports.StatTimer=exports.DOMSVGFactory=exports.DOMCMapReaderFactory=exports.DOMCanvasFactory=exports.DEFAULT_LINK_REL=exports.LinkTarget=exports.getFilenameFromUrl=exports.addLinkAttributes=exports.RenderingCancelledException=exports.PageViewport=void 0;var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_util=require("../shared/util");function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var DEFAULT_LINK_REL="noopener noreferrer nofollow",SVG_NS="http://www.w3.org/2000/svg",DOMCanvasFactory=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"create",value:function(e,t){if(e<=0||t<=0)throw new Error("invalid canvas size");var r=document.createElement("canvas"),n=r.getContext("2d");return r.width=e,r.height=t,{canvas:r,context:n}}},{key:"reset",value:function(e,t,r){if(!e.canvas)throw new Error("canvas is not specified");if(t<=0||r<=0)throw new Error("invalid canvas size");e.canvas.width=t,e.canvas.height=r}},{key:"destroy",value:function(e){if(!e.canvas)throw new Error("canvas is not specified");e.canvas.width=0,e.canvas.height=0,e.canvas=null,e.context=null}}]),e}(),DOMCMapReaderFactory=function(){function e(t){var r=t.baseUrl,n=void 0===r?null:r,a=t.isCompressed,i=void 0!==a&&a;_classCallCheck(this,e),this.baseUrl=n,this.isCompressed=i}return _createClass(e,[{key:"fetch",value:function(e){var t=this,r=e.name;return this.baseUrl?r?new Promise((function(e,n){var a=t.baseUrl+r+(t.isCompressed?".bcmap":""),i=new XMLHttpRequest;i.open("GET",a,!0),t.isCompressed&&(i.responseType="arraybuffer"),i.onreadystatechange=function(){if(i.readyState===XMLHttpRequest.DONE){if(200===i.status||0===i.status){var r=void 0;if(t.isCompressed&&i.response?r=new Uint8Array(i.response):!t.isCompressed&&i.responseText&&(r=(0,_util.stringToBytes)(i.responseText)),r)return void e({cMapData:r,compressionType:t.isCompressed?_util.CMapCompressionType.BINARY:_util.CMapCompressionType.NONE})}n(new Error("Unable to load "+(t.isCompressed?"binary ":"")+"CMap at: "+a))}},i.send(null)})):Promise.reject(new Error("CMap name must be specified.")):Promise.reject(new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.'))}}]),e}(),DOMSVGFactory=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"create",value:function(e,t){(0,_util.assert)(e>0&&t>0,"Invalid SVG dimensions");var r=document.createElementNS(SVG_NS,"svg:svg");return r.setAttribute("version","1.1"),r.setAttribute("width",e+"px"),r.setAttribute("height",t+"px"),r.setAttribute("preserveAspectRatio","none"),r.setAttribute("viewBox","0 0 "+e+" "+t),r}},{key:"createElement",value:function(e){return(0,_util.assert)("string"===typeof e,"Invalid SVG element type"),document.createElementNS(SVG_NS,e)}}]),e}(),PageViewport=function(){function e(t){var r=t.viewBox,n=t.scale,a=t.rotation,i=t.offsetX,s=void 0===i?0:i,o=t.offsetY,l=void 0===o?0:o,c=t.dontFlip,u=void 0!==c&&c;_classCallCheck(this,e),this.viewBox=r,this.scale=n,this.rotation=a,this.offsetX=s,this.offsetY=l;var d=(r[2]+r[0])/2,p=(r[3]+r[1])/2,f=void 0,v=void 0,h=void 0,m=void 0;switch(a%=360,a=a<0?a+360:a,a){case 180:f=-1,v=0,h=0,m=1;break;case 90:f=0,v=1,h=1,m=0;break;case 270:f=0,v=-1,h=-1,m=0;break;default:f=1,v=0,h=0,m=-1;break}u&&(h=-h,m=-m);var y=void 0,g=void 0,C=void 0,b=void 0;0===f?(y=Math.abs(p-r[1])*n+s,g=Math.abs(d-r[0])*n+l,C=Math.abs(r[3]-r[1])*n,b=Math.abs(r[2]-r[0])*n):(y=Math.abs(d-r[0])*n+s,g=Math.abs(p-r[1])*n+l,C=Math.abs(r[2]-r[0])*n,b=Math.abs(r[3]-r[1])*n),this.transform=[f*n,v*n,h*n,m*n,y-f*n*d-h*n*p,g-v*n*d-m*n*p],this.width=C,this.height=b}return _createClass(e,[{key:"clone",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.scale,n=void 0===r?this.scale:r,a=t.rotation,i=void 0===a?this.rotation:a,s=t.dontFlip,o=void 0!==s&&s;return new e({viewBox:this.viewBox.slice(),scale:n,rotation:i,offsetX:this.offsetX,offsetY:this.offsetY,dontFlip:o})}},{key:"convertToViewportPoint",value:function(e,t){return _util.Util.applyTransform([e,t],this.transform)}},{key:"convertToViewportRectangle",value:function(e){var t=_util.Util.applyTransform([e[0],e[1]],this.transform),r=_util.Util.applyTransform([e[2],e[3]],this.transform);return[t[0],t[1],r[0],r[1]]}},{key:"convertToPdfPoint",value:function(e,t){return _util.Util.applyInverseTransform([e,t],this.transform)}}]),e}(),RenderingCancelledException=function(){function e(e,t){this.message=e,this.type=t}return e.prototype=new Error,e.prototype.name="RenderingCancelledException",e.constructor=e,e}(),LinkTarget={NONE:0,SELF:1,BLANK:2,PARENT:3,TOP:4},LinkTargetStringMap=["","_self","_blank","_parent","_top"];function addLinkAttributes(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.url,n=t.target,a=t.rel;if(e.href=e.title=r?(0,_util.removeNullCharacters)(r):"",r){var i=Object.values(LinkTarget),s=i.includes(n)?n:LinkTarget.NONE;e.target=LinkTargetStringMap[s],e.rel="string"===typeof a?a:DEFAULT_LINK_REL}}function getFilenameFromUrl(e){var t=e.indexOf("#"),r=e.indexOf("?"),n=Math.min(t>0?t:e.length,r>0?r:e.length);return e.substring(e.lastIndexOf("/",n)+1,n)}var StatTimer=function(){function e(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];_classCallCheck(this,e),this.enabled=!!t,this.started=Object.create(null),this.times=[]}return _createClass(e,[{key:"time",value:function(e){this.enabled&&(e in this.started&&(0,_util.warn)("Timer is already running for "+e),this.started[e]=Date.now())}},{key:"timeEnd",value:function(e){this.enabled&&(e in this.started||(0,_util.warn)("Timer has not been started for "+e),this.times.push({name:e,start:this.started[e],end:Date.now()}),delete this.started[e])}},{key:"toString",value:function(){for(var e=this.times,t="",r=0,n=0,a=e.length;n<a;++n){var i=e[n]["name"];i.length>r&&(r=i.length)}for(var s=0,o=e.length;s<o;++s){var l=e[s],c=l.end-l.start;t+=l["name"].padEnd(r)+" "+c+"ms\n"}return t}}]),e}(),DummyStatTimer=function(){function e(){_classCallCheck(this,e),(0,_util.unreachable)("Cannot initialize DummyStatTimer.")}return _createClass(e,null,[{key:"time",value:function(e){}},{key:"timeEnd",value:function(e){}},{key:"toString",value:function(){return""}}]),e}();function loadScript(e){return new Promise((function(t,r){var n=document.createElement("script");n.src=e,n.onload=t,n.onerror=function(){r(new Error("Cannot load script at: "+n.src))},(document.head||document.documentElement).appendChild(n)}))}exports.PageViewport=PageViewport,exports.RenderingCancelledException=RenderingCancelledException,exports.addLinkAttributes=addLinkAttributes,exports.getFilenameFromUrl=getFilenameFromUrl,exports.LinkTarget=LinkTarget,exports.DEFAULT_LINK_REL=DEFAULT_LINK_REL,exports.DOMCanvasFactory=DOMCanvasFactory,exports.DOMCMapReaderFactory=DOMCMapReaderFactory,exports.DOMSVGFactory=DOMSVGFactory,exports.StatTimer=StatTimer,exports.DummyStatTimer=DummyStatTimer,exports.loadScript=loadScript;