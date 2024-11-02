"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CMapFactory=exports.IdentityCMap=exports.CMap=void 0;var _createClass=function(){function e(e,r){for(var n=0;n<r.length;n++){var a=r[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(r,n,a){return n&&e(r.prototype,n),a&&e(r,a),r}}(),_util=require("../shared/util"),_primitives=require("./primitives"),_parser=require("./parser"),_stream=require("./stream");function _possibleConstructorReturn(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!==typeof r&&"function"!==typeof r?e:r}function _inherits(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var BUILT_IN_CMAPS=["Adobe-GB1-UCS2","Adobe-CNS1-UCS2","Adobe-Japan1-UCS2","Adobe-Korea1-UCS2","78-EUC-H","78-EUC-V","78-H","78-RKSJ-H","78-RKSJ-V","78-V","78ms-RKSJ-H","78ms-RKSJ-V","83pv-RKSJ-H","90ms-RKSJ-H","90ms-RKSJ-V","90msp-RKSJ-H","90msp-RKSJ-V","90pv-RKSJ-H","90pv-RKSJ-V","Add-H","Add-RKSJ-H","Add-RKSJ-V","Add-V","Adobe-CNS1-0","Adobe-CNS1-1","Adobe-CNS1-2","Adobe-CNS1-3","Adobe-CNS1-4","Adobe-CNS1-5","Adobe-CNS1-6","Adobe-GB1-0","Adobe-GB1-1","Adobe-GB1-2","Adobe-GB1-3","Adobe-GB1-4","Adobe-GB1-5","Adobe-Japan1-0","Adobe-Japan1-1","Adobe-Japan1-2","Adobe-Japan1-3","Adobe-Japan1-4","Adobe-Japan1-5","Adobe-Japan1-6","Adobe-Korea1-0","Adobe-Korea1-1","Adobe-Korea1-2","B5-H","B5-V","B5pc-H","B5pc-V","CNS-EUC-H","CNS-EUC-V","CNS1-H","CNS1-V","CNS2-H","CNS2-V","ETHK-B5-H","ETHK-B5-V","ETen-B5-H","ETen-B5-V","ETenms-B5-H","ETenms-B5-V","EUC-H","EUC-V","Ext-H","Ext-RKSJ-H","Ext-RKSJ-V","Ext-V","GB-EUC-H","GB-EUC-V","GB-H","GB-V","GBK-EUC-H","GBK-EUC-V","GBK2K-H","GBK2K-V","GBKp-EUC-H","GBKp-EUC-V","GBT-EUC-H","GBT-EUC-V","GBT-H","GBT-V","GBTpc-EUC-H","GBTpc-EUC-V","GBpc-EUC-H","GBpc-EUC-V","H","HKdla-B5-H","HKdla-B5-V","HKdlb-B5-H","HKdlb-B5-V","HKgccs-B5-H","HKgccs-B5-V","HKm314-B5-H","HKm314-B5-V","HKm471-B5-H","HKm471-B5-V","HKscs-B5-H","HKscs-B5-V","Hankaku","Hiragana","KSC-EUC-H","KSC-EUC-V","KSC-H","KSC-Johab-H","KSC-Johab-V","KSC-V","KSCms-UHC-H","KSCms-UHC-HW-H","KSCms-UHC-HW-V","KSCms-UHC-V","KSCpc-EUC-H","KSCpc-EUC-V","Katakana","NWP-H","NWP-V","RKSJ-H","RKSJ-V","Roman","UniCNS-UCS2-H","UniCNS-UCS2-V","UniCNS-UTF16-H","UniCNS-UTF16-V","UniCNS-UTF32-H","UniCNS-UTF32-V","UniCNS-UTF8-H","UniCNS-UTF8-V","UniGB-UCS2-H","UniGB-UCS2-V","UniGB-UTF16-H","UniGB-UTF16-V","UniGB-UTF32-H","UniGB-UTF32-V","UniGB-UTF8-H","UniGB-UTF8-V","UniJIS-UCS2-H","UniJIS-UCS2-HW-H","UniJIS-UCS2-HW-V","UniJIS-UCS2-V","UniJIS-UTF16-H","UniJIS-UTF16-V","UniJIS-UTF32-H","UniJIS-UTF32-V","UniJIS-UTF8-H","UniJIS-UTF8-V","UniJIS2004-UTF16-H","UniJIS2004-UTF16-V","UniJIS2004-UTF32-H","UniJIS2004-UTF32-V","UniJIS2004-UTF8-H","UniJIS2004-UTF8-V","UniJISPro-UCS2-HW-V","UniJISPro-UCS2-V","UniJISPro-UTF8-V","UniJISX0213-UTF32-H","UniJISX0213-UTF32-V","UniJISX02132004-UTF32-H","UniJISX02132004-UTF32-V","UniKS-UCS2-H","UniKS-UCS2-V","UniKS-UTF16-H","UniKS-UTF16-V","UniKS-UTF32-H","UniKS-UTF32-V","UniKS-UTF8-H","UniKS-UTF8-V","V","WP-Symbol"],CMap=function(){function e(){var r=arguments.length>0&&void 0!==arguments[0]&&arguments[0];_classCallCheck(this,e),this.codespaceRanges=[[],[],[],[]],this.numCodespaceRanges=0,this._map=[],this.name="",this.vertical=!1,this.useCMap=null,this.builtInCMap=r}return _createClass(e,[{key:"addCodespaceRange",value:function(e,r,n){this.codespaceRanges[e-1].push(r,n),this.numCodespaceRanges++}},{key:"mapCidRange",value:function(e,r,n){while(e<=r)this._map[e++]=n++}},{key:"mapBfRange",value:function(e,r,n){var a=n.length-1;while(e<=r)this._map[e++]=n,n=n.substring(0,a)+String.fromCharCode(n.charCodeAt(a)+1)}},{key:"mapBfRangeToArray",value:function(e,r,n){var a=0,i=n.length;while(e<=r&&a<i)this._map[e]=n[a++],++e}},{key:"mapOne",value:function(e,r){this._map[e]=r}},{key:"lookup",value:function(e){return this._map[e]}},{key:"contains",value:function(e){return void 0!==this._map[e]}},{key:"forEach",value:function(e){var r=this._map,n=r.length;if(n<=65536)for(var a=0;a<n;a++)void 0!==r[a]&&e(a,r[a]);else for(var i in r)e(i,r[i])}},{key:"charCodeOf",value:function(e){var r=this._map;if(r.length<=65536)return r.indexOf(e);for(var n in r)if(r[n]===e)return 0|n;return-1}},{key:"getMap",value:function(){return this._map}},{key:"readCharCode",value:function(e,r,n){for(var a=0,i=this.codespaceRanges,t=0,o=i.length;t<o;t++){a=(a<<8|e.charCodeAt(r+t))>>>0;for(var s=i[t],u=0,c=s.length;u<c;){var p=s[u++],d=s[u++];if(a>=p&&a<=d)return n.charcode=a,void(n.length=t+1)}}n.charcode=0,n.length=1}},{key:"length",get:function(){return this._map.length}},{key:"isIdentityCMap",get:function(){if("Identity-H"!==this.name&&"Identity-V"!==this.name)return!1;if(65536!==this._map.length)return!1;for(var e=0;e<65536;e++)if(this._map[e]!==e)return!1;return!0}}]),e}(),IdentityCMap=function(e){function r(e,n){_classCallCheck(this,r);var a=_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return a.vertical=e,a.addCodespaceRange(n,0,65535),a}return _inherits(r,e),_createClass(r,[{key:"mapCidRange",value:function(e,r,n){(0,_util.unreachable)("should not call mapCidRange")}},{key:"mapBfRange",value:function(e,r,n){(0,_util.unreachable)("should not call mapBfRange")}},{key:"mapBfRangeToArray",value:function(e,r,n){(0,_util.unreachable)("should not call mapBfRangeToArray")}},{key:"mapOne",value:function(e,r){(0,_util.unreachable)("should not call mapCidOne")}},{key:"lookup",value:function(e){return Number.isInteger(e)&&e<=65535?e:void 0}},{key:"contains",value:function(e){return Number.isInteger(e)&&e<=65535}},{key:"forEach",value:function(e){for(var r=0;r<=65535;r++)e(r,r)}},{key:"charCodeOf",value:function(e){return Number.isInteger(e)&&e<=65535?e:-1}},{key:"getMap",value:function(){for(var e=new Array(65536),r=0;r<=65535;r++)e[r]=r;return e}},{key:"length",get:function(){return 65536}},{key:"isIdentityCMap",get:function(){(0,_util.unreachable)("should not access .isIdentityCMap")}}]),r}(CMap),BinaryCMapReader=function(){function e(e,r){for(var n=0,a=0;a<=r;a++)n=n<<8|e[a];return n>>>0}function r(e,r){return 1===r?String.fromCharCode(e[0],e[1]):3===r?String.fromCharCode(e[0],e[1],e[2],e[3]):String.fromCharCode.apply(null,e.subarray(0,r+1))}function n(e,r,n){for(var a=0,i=n;i>=0;i--)a+=e[i]+r[i],e[i]=255&a,a>>=8}function a(e,r){for(var n=1,a=r;a>=0&&n>0;a--)n+=e[a],e[a]=255&n,n>>=8}var i=16,t=19;function o(e){this.buffer=e,this.pos=0,this.end=e.length,this.tmpBuf=new Uint8Array(t)}function s(t,s,u){return new Promise((function(c,p){var d=new o(t),f=d.readByte();s.vertical=!!(1&f);var m,C,l=null,b=new Uint8Array(i),h=new Uint8Array(i),U=new Uint8Array(i),v=new Uint8Array(i),S=new Uint8Array(i);while((C=d.readByte())>=0){var g=C>>5;if(7!==g){var H=!!(16&C),y=15&C;if(y+1>i)throw new Error("processBinaryCMap: Invalid dataSize.");var _,B=1,V=d.readNumber();switch(g){case 0:for(d.readHex(b,y),d.readHexNumber(h,y),n(h,b,y),s.addCodespaceRange(y+1,e(b,y),e(h,y)),_=1;_<V;_++)a(h,y),d.readHexNumber(b,y),n(b,h,y),d.readHexNumber(h,y),n(h,b,y),s.addCodespaceRange(y+1,e(b,y),e(h,y));break;case 1:for(d.readHex(b,y),d.readHexNumber(h,y),n(h,b,y),d.readNumber(),_=1;_<V;_++)a(h,y),d.readHexNumber(b,y),n(b,h,y),d.readHexNumber(h,y),n(h,b,y),d.readNumber();break;case 2:for(d.readHex(U,y),m=d.readNumber(),s.mapOne(e(U,y),m),_=1;_<V;_++)a(U,y),H||(d.readHexNumber(S,y),n(U,S,y)),m=d.readSigned()+(m+1),s.mapOne(e(U,y),m);break;case 3:for(d.readHex(b,y),d.readHexNumber(h,y),n(h,b,y),m=d.readNumber(),s.mapCidRange(e(b,y),e(h,y),m),_=1;_<V;_++)a(h,y),H?b.set(h):(d.readHexNumber(b,y),n(b,h,y)),d.readHexNumber(h,y),n(h,b,y),m=d.readNumber(),s.mapCidRange(e(b,y),e(h,y),m);break;case 4:for(d.readHex(U,B),d.readHex(v,y),s.mapOne(e(U,B),r(v,y)),_=1;_<V;_++)a(U,B),H||(d.readHexNumber(S,B),n(U,S,B)),a(v,y),d.readHexSigned(S,y),n(v,S,y),s.mapOne(e(U,B),r(v,y));break;case 5:for(d.readHex(b,B),d.readHexNumber(h,B),n(h,b,B),d.readHex(v,y),s.mapBfRange(e(b,B),e(h,B),r(v,y)),_=1;_<V;_++)a(h,B),H?b.set(h):(d.readHexNumber(b,B),n(b,h,B)),d.readHexNumber(h,B),n(h,b,B),d.readHex(v,y),s.mapBfRange(e(b,B),e(h,B),r(v,y));break;default:return void p(new Error("processBinaryCMap: Unknown type: "+g))}}else switch(31&C){case 0:d.readString();break;case 1:l=d.readString();break}}c(l?u(l):s)}))}function u(){}return o.prototype={readByte:function(){return this.pos>=this.end?-1:this.buffer[this.pos++]},readNumber:function(){var e,r=0;do{var n=this.readByte();if(n<0)throw new _util.FormatError("unexpected EOF in bcmap");e=!(128&n),r=r<<7|127&n}while(!e);return r},readSigned:function(){var e=this.readNumber();return 1&e?~(e>>>1):e>>>1},readHex:function(e,r){e.set(this.buffer.subarray(this.pos,this.pos+r+1)),this.pos+=r+1},readHexNumber:function(e,r){var n,a=this.tmpBuf,i=0;do{var t=this.readByte();if(t<0)throw new _util.FormatError("unexpected EOF in bcmap");n=!(128&t),a[i++]=127&t}while(!n);var o=r,s=0,u=0;while(o>=0){while(u<8&&a.length>0)s=a[--i]<<u|s,u+=7;e[o]=255&s,o--,s>>=8,u-=8}},readHexSigned:function(e,r){this.readHexNumber(e,r);for(var n=1&e[r]?255:0,a=0,i=0;i<=r;i++)a=(1&a)<<8|e[i],e[i]=a>>1^n},readString:function(){for(var e=this.readNumber(),r="",n=0;n<e;n++)r+=String.fromCharCode(this.readNumber());return r}},u.prototype={process:s},u}(),CMapFactory=function(){function e(e){for(var r=0,n=0;n<e.length;n++)r=r<<8|e.charCodeAt(n);return r>>>0}function r(e){if(!(0,_util.isString)(e))throw new _util.FormatError("Malformed CMap: expected string.")}function n(e){if(!Number.isInteger(e))throw new _util.FormatError("Malformed CMap: expected int.")}function a(n,a){while(1){var i=a.getObj();if((0,_primitives.isEOF)(i))break;if((0,_primitives.isCmd)(i,"endbfchar"))return;r(i);var t=e(i);i=a.getObj(),r(i);var o=i;n.mapOne(t,o)}}function i(n,a){while(1){var i=a.getObj();if((0,_primitives.isEOF)(i))break;if((0,_primitives.isCmd)(i,"endbfrange"))return;r(i);var t=e(i);i=a.getObj(),r(i);var o=e(i);if(i=a.getObj(),Number.isInteger(i)||(0,_util.isString)(i)){var s=Number.isInteger(i)?String.fromCharCode(i):i;n.mapBfRange(t,o,s)}else{if(!(0,_primitives.isCmd)(i,"["))break;i=a.getObj();var u=[];while(!(0,_primitives.isCmd)(i,"]")&&!(0,_primitives.isEOF)(i))u.push(i),i=a.getObj();n.mapBfRangeToArray(t,o,u)}}throw new _util.FormatError("Invalid bf range.")}function t(a,i){while(1){var t=i.getObj();if((0,_primitives.isEOF)(t))break;if((0,_primitives.isCmd)(t,"endcidchar"))return;r(t);var o=e(t);t=i.getObj(),n(t);var s=t;a.mapOne(o,s)}}function o(a,i){while(1){var t=i.getObj();if((0,_primitives.isEOF)(t))break;if((0,_primitives.isCmd)(t,"endcidrange"))return;r(t);var o=e(t);t=i.getObj(),r(t);var s=e(t);t=i.getObj(),n(t);var u=t;a.mapCidRange(o,s,u)}}function s(r,n){while(1){var a=n.getObj();if((0,_primitives.isEOF)(a))break;if((0,_primitives.isCmd)(a,"endcodespacerange"))return;if(!(0,_util.isString)(a))break;var i=e(a);if(a=n.getObj(),!(0,_util.isString)(a))break;var t=e(a);r.addCodespaceRange(a.length,i,t)}throw new _util.FormatError("Invalid codespace range.")}function u(e,r){var n=r.getObj();Number.isInteger(n)&&(e.vertical=!!n)}function c(e,r){var n=r.getObj();(0,_primitives.isName)(n)&&(0,_util.isString)(n.name)&&(e.name=n.name)}function p(e,r,n,p){var f,m;e:while(1)try{var C=r.getObj();if((0,_primitives.isEOF)(C))break;if((0,_primitives.isName)(C))"WMode"===C.name?u(e,r):"CMapName"===C.name&&c(e,r),f=C;else if((0,_primitives.isCmd)(C))switch(C.cmd){case"endcmap":break e;case"usecmap":(0,_primitives.isName)(f)&&(m=f.name);break;case"begincodespacerange":s(e,r);break;case"beginbfchar":a(e,r);break;case"begincidchar":t(e,r);break;case"beginbfrange":i(e,r);break;case"begincidrange":o(e,r);break}}catch(l){if(l instanceof _util.MissingDataException)throw l;(0,_util.warn)("Invalid cMap data: "+l);continue}return!p&&m&&(p=m),p?d(e,n,p):Promise.resolve(e)}function d(e,r,n){return f(n,r).then((function(r){if(e.useCMap=r,0===e.numCodespaceRanges){for(var n=e.useCMap.codespaceRanges,a=0;a<n.length;a++)e.codespaceRanges[a]=n[a].slice();e.numCodespaceRanges=e.useCMap.numCodespaceRanges}return e.useCMap.forEach((function(r,n){e.contains(r)||e.mapOne(r,e.useCMap.lookup(r))})),e}))}function f(e,r){return"Identity-H"===e?Promise.resolve(new IdentityCMap(!1,2)):"Identity-V"===e?Promise.resolve(new IdentityCMap(!0,2)):BUILT_IN_CMAPS.includes(e)?r?r(e).then((function(e){var n=e.cMapData,a=e.compressionType,i=new CMap(!0);if(a===_util.CMapCompressionType.BINARY)return(new BinaryCMapReader).process(n,i,(function(e){return d(i,r,e)}));if(a===_util.CMapCompressionType.NONE){var t=new _parser.Lexer(new _stream.Stream(n));return p(i,t,r,null)}return Promise.reject(new Error("TODO: Only BINARY/NONE CMap compression is currently supported."))})):Promise.reject(new Error("Built-in CMap parameters are not provided.")):Promise.reject(new Error("Unknown CMap name: "+e))}return{create:function(e){var r=e.encoding,n=e.fetchBuiltInCMap,a=e.useCMap;if((0,_primitives.isName)(r))return f(r.name,n);if((0,_primitives.isStream)(r)){var i=new CMap,t=new _parser.Lexer(r);return p(i,t,n,a).then((function(e){return e.isIdentityCMap?f(e.name,n):e}))}return Promise.reject(new Error("Encoding required."))}}}();exports.CMap=CMap,exports.IdentityCMap=IdentityCMap,exports.CMapFactory=CMapFactory;