"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.IdentityCMap=exports.CMapFactory=exports.CMap=void 0;var _util=require("../shared/util.js"),_primitives=require("./primitives.js"),_parser=require("./parser.js"),_core_utils=require("./core_utils.js"),_stream=require("./stream.js");const BUILT_IN_CMAPS=["Adobe-GB1-UCS2","Adobe-CNS1-UCS2","Adobe-Japan1-UCS2","Adobe-Korea1-UCS2","78-EUC-H","78-EUC-V","78-H","78-RKSJ-H","78-RKSJ-V","78-V","78ms-RKSJ-H","78ms-RKSJ-V","83pv-RKSJ-H","90ms-RKSJ-H","90ms-RKSJ-V","90msp-RKSJ-H","90msp-RKSJ-V","90pv-RKSJ-H","90pv-RKSJ-V","Add-H","Add-RKSJ-H","Add-RKSJ-V","Add-V","Adobe-CNS1-0","Adobe-CNS1-1","Adobe-CNS1-2","Adobe-CNS1-3","Adobe-CNS1-4","Adobe-CNS1-5","Adobe-CNS1-6","Adobe-GB1-0","Adobe-GB1-1","Adobe-GB1-2","Adobe-GB1-3","Adobe-GB1-4","Adobe-GB1-5","Adobe-Japan1-0","Adobe-Japan1-1","Adobe-Japan1-2","Adobe-Japan1-3","Adobe-Japan1-4","Adobe-Japan1-5","Adobe-Japan1-6","Adobe-Korea1-0","Adobe-Korea1-1","Adobe-Korea1-2","B5-H","B5-V","B5pc-H","B5pc-V","CNS-EUC-H","CNS-EUC-V","CNS1-H","CNS1-V","CNS2-H","CNS2-V","ETHK-B5-H","ETHK-B5-V","ETen-B5-H","ETen-B5-V","ETenms-B5-H","ETenms-B5-V","EUC-H","EUC-V","Ext-H","Ext-RKSJ-H","Ext-RKSJ-V","Ext-V","GB-EUC-H","GB-EUC-V","GB-H","GB-V","GBK-EUC-H","GBK-EUC-V","GBK2K-H","GBK2K-V","GBKp-EUC-H","GBKp-EUC-V","GBT-EUC-H","GBT-EUC-V","GBT-H","GBT-V","GBTpc-EUC-H","GBTpc-EUC-V","GBpc-EUC-H","GBpc-EUC-V","H","HKdla-B5-H","HKdla-B5-V","HKdlb-B5-H","HKdlb-B5-V","HKgccs-B5-H","HKgccs-B5-V","HKm314-B5-H","HKm314-B5-V","HKm471-B5-H","HKm471-B5-V","HKscs-B5-H","HKscs-B5-V","Hankaku","Hiragana","KSC-EUC-H","KSC-EUC-V","KSC-H","KSC-Johab-H","KSC-Johab-V","KSC-V","KSCms-UHC-H","KSCms-UHC-HW-H","KSCms-UHC-HW-V","KSCms-UHC-V","KSCpc-EUC-H","KSCpc-EUC-V","Katakana","NWP-H","NWP-V","RKSJ-H","RKSJ-V","Roman","UniCNS-UCS2-H","UniCNS-UCS2-V","UniCNS-UTF16-H","UniCNS-UTF16-V","UniCNS-UTF32-H","UniCNS-UTF32-V","UniCNS-UTF8-H","UniCNS-UTF8-V","UniGB-UCS2-H","UniGB-UCS2-V","UniGB-UTF16-H","UniGB-UTF16-V","UniGB-UTF32-H","UniGB-UTF32-V","UniGB-UTF8-H","UniGB-UTF8-V","UniJIS-UCS2-H","UniJIS-UCS2-HW-H","UniJIS-UCS2-HW-V","UniJIS-UCS2-V","UniJIS-UTF16-H","UniJIS-UTF16-V","UniJIS-UTF32-H","UniJIS-UTF32-V","UniJIS-UTF8-H","UniJIS-UTF8-V","UniJIS2004-UTF16-H","UniJIS2004-UTF16-V","UniJIS2004-UTF32-H","UniJIS2004-UTF32-V","UniJIS2004-UTF8-H","UniJIS2004-UTF8-V","UniJISPro-UCS2-HW-V","UniJISPro-UCS2-V","UniJISPro-UTF8-V","UniJISX0213-UTF32-H","UniJISX0213-UTF32-V","UniJISX02132004-UTF32-H","UniJISX02132004-UTF32-V","UniKS-UCS2-H","UniKS-UCS2-V","UniKS-UTF16-H","UniKS-UTF16-V","UniKS-UTF32-H","UniKS-UTF32-V","UniKS-UTF8-H","UniKS-UTF8-V","V","WP-Symbol"],MAX_MAP_RANGE=2**24-1;class CMap{constructor(e=!1){this.codespaceRanges=[[],[],[],[]],this.numCodespaceRanges=0,this._map=[],this.name="",this.vertical=!1,this.useCMap=null,this.builtInCMap=e}addCodespaceRange(e,r,t){this.codespaceRanges[e-1].push(r,t),this.numCodespaceRanges++}mapCidRange(e,r,t){if(r-e>MAX_MAP_RANGE)throw new Error("mapCidRange - ignoring data above MAX_MAP_RANGE.");while(e<=r)this._map[e++]=t++}mapBfRange(e,r,t){if(r-e>MAX_MAP_RANGE)throw new Error("mapBfRange - ignoring data above MAX_MAP_RANGE.");const n=t.length-1;while(e<=r)this._map[e++]=t,t=t.substring(0,n)+String.fromCharCode(t.charCodeAt(n)+1)}mapBfRangeToArray(e,r,t){if(r-e>MAX_MAP_RANGE)throw new Error("mapBfRangeToArray - ignoring data above MAX_MAP_RANGE.");const n=t.length;let a=0;while(e<=r&&a<n)this._map[e]=t[a++],++e}mapOne(e,r){this._map[e]=r}lookup(e){return this._map[e]}contains(e){return void 0!==this._map[e]}forEach(e){const r=this._map,t=r.length;if(t<=65536)for(let n=0;n<t;n++)void 0!==r[n]&&e(n,r[n]);else for(const n in r)e(n,r[n])}charCodeOf(e){const r=this._map;if(r.length<=65536)return r.indexOf(e);for(const t in r)if(r[t]===e)return 0|t;return-1}getMap(){return this._map}readCharCode(e,r,t){let n=0;const a=this.codespaceRanges;for(let i=0,s=a.length;i<s;i++){n=(n<<8|e.charCodeAt(r+i))>>>0;const s=a[i];for(let e=0,r=s.length;e<r;){const r=s[e++],a=s[e++];if(n>=r&&n<=a)return t.charcode=n,void(t.length=i+1)}}t.charcode=0,t.length=1}getCharCodeLength(e){const r=this.codespaceRanges;for(let t=0,n=r.length;t<n;t++){const n=r[t];for(let r=0,a=n.length;r<a;){const a=n[r++],i=n[r++];if(e>=a&&e<=i)return t+1}}return 1}get length(){return this._map.length}get isIdentityCMap(){if("Identity-H"!==this.name&&"Identity-V"!==this.name)return!1;if(65536!==this._map.length)return!1;for(let e=0;e<65536;e++)if(this._map[e]!==e)return!1;return!0}}exports.CMap=CMap;class IdentityCMap extends CMap{constructor(e,r){super(),this.vertical=e,this.addCodespaceRange(r,0,65535)}mapCidRange(e,r,t){(0,_util.unreachable)("should not call mapCidRange")}mapBfRange(e,r,t){(0,_util.unreachable)("should not call mapBfRange")}mapBfRangeToArray(e,r,t){(0,_util.unreachable)("should not call mapBfRangeToArray")}mapOne(e,r){(0,_util.unreachable)("should not call mapCidOne")}lookup(e){return Number.isInteger(e)&&e<=65535?e:void 0}contains(e){return Number.isInteger(e)&&e<=65535}forEach(e){for(let r=0;r<=65535;r++)e(r,r)}charCodeOf(e){return Number.isInteger(e)&&e<=65535?e:-1}getMap(){const e=new Array(65536);for(let r=0;r<=65535;r++)e[r]=r;return e}get length(){return 65536}get isIdentityCMap(){(0,_util.unreachable)("should not access .isIdentityCMap")}}exports.IdentityCMap=IdentityCMap;const BinaryCMapReader=function(){function e(e,r){let t=0;for(let n=0;n<=r;n++)t=t<<8|e[n];return t>>>0}function r(e,r){return 1===r?String.fromCharCode(e[0],e[1]):3===r?String.fromCharCode(e[0],e[1],e[2],e[3]):String.fromCharCode.apply(null,e.subarray(0,r+1))}function t(e,r,t){let n=0;for(let a=t;a>=0;a--)n+=e[a]+r[a],e[a]=255&n,n>>=8}function n(e,r){let t=1;for(let n=r;n>=0&&t>0;n--)t+=e[n],e[n]=255&t,t>>=8}const a=16,i=19;class s{constructor(e){this.buffer=e,this.pos=0,this.end=e.length,this.tmpBuf=new Uint8Array(i)}readByte(){return this.pos>=this.end?-1:this.buffer[this.pos++]}readNumber(){let e,r=0;do{const t=this.readByte();if(t<0)throw new _util.FormatError("unexpected EOF in bcmap");e=!(128&t),r=r<<7|127&t}while(!e);return r}readSigned(){const e=this.readNumber();return 1&e?~(e>>>1):e>>>1}readHex(e,r){e.set(this.buffer.subarray(this.pos,this.pos+r+1)),this.pos+=r+1}readHexNumber(e,r){let t;const n=this.tmpBuf;let a=0;do{const e=this.readByte();if(e<0)throw new _util.FormatError("unexpected EOF in bcmap");t=!(128&e),n[a++]=127&e}while(!t);let i=r,s=0,o=0;while(i>=0){while(o<8&&n.length>0)s|=n[--a]<<o,o+=7;e[i]=255&s,i--,s>>=8,o-=8}}readHexSigned(e,r){this.readHexNumber(e,r);const t=1&e[r]?255:0;let n=0;for(let a=0;a<=r;a++)n=(1&n)<<8|e[a],e[a]=n>>1^t}readString(){const e=this.readNumber();let r="";for(let t=0;t<e;t++)r+=String.fromCharCode(this.readNumber());return r}}class o{async process(i,o,d){const c=new s(i),p=c.readByte();o.vertical=!!(1&p);let u=null;const m=new Uint8Array(a),C=new Uint8Array(a),l=new Uint8Array(a),h=new Uint8Array(a),b=new Uint8Array(a);let U,g;while((g=c.readByte())>=0){const i=g>>5;if(7===i){switch(31&g){case 0:c.readString();break;case 1:u=c.readString();break}continue}const s=!!(16&g),d=15&g;if(d+1>a)throw new Error("BinaryCMapReader.process: Invalid dataSize.");const p=1,f=c.readNumber();switch(i){case 0:c.readHex(m,d),c.readHexNumber(C,d),t(C,m,d),o.addCodespaceRange(d+1,e(m,d),e(C,d));for(let r=1;r<f;r++)n(C,d),c.readHexNumber(m,d),t(m,C,d),c.readHexNumber(C,d),t(C,m,d),o.addCodespaceRange(d+1,e(m,d),e(C,d));break;case 1:c.readHex(m,d),c.readHexNumber(C,d),t(C,m,d),c.readNumber();for(let e=1;e<f;e++)n(C,d),c.readHexNumber(m,d),t(m,C,d),c.readHexNumber(C,d),t(C,m,d),c.readNumber();break;case 2:c.readHex(l,d),U=c.readNumber(),o.mapOne(e(l,d),U);for(let r=1;r<f;r++)n(l,d),s||(c.readHexNumber(b,d),t(l,b,d)),U=c.readSigned()+(U+1),o.mapOne(e(l,d),U);break;case 3:c.readHex(m,d),c.readHexNumber(C,d),t(C,m,d),U=c.readNumber(),o.mapCidRange(e(m,d),e(C,d),U);for(let r=1;r<f;r++)n(C,d),s?m.set(C):(c.readHexNumber(m,d),t(m,C,d)),c.readHexNumber(C,d),t(C,m,d),U=c.readNumber(),o.mapCidRange(e(m,d),e(C,d),U);break;case 4:c.readHex(l,p),c.readHex(h,d),o.mapOne(e(l,p),r(h,d));for(let a=1;a<f;a++)n(l,p),s||(c.readHexNumber(b,p),t(l,b,p)),n(h,d),c.readHexSigned(b,d),t(h,b,d),o.mapOne(e(l,p),r(h,d));break;case 5:c.readHex(m,p),c.readHexNumber(C,p),t(C,m,p),c.readHex(h,d),o.mapBfRange(e(m,p),e(C,p),r(h,d));for(let a=1;a<f;a++)n(C,p),s?m.set(C):(c.readHexNumber(m,p),t(m,C,p)),c.readHexNumber(C,p),t(C,m,p),c.readHex(h,d),o.mapBfRange(e(m,p),e(C,p),r(h,d));break;default:throw new Error(`BinaryCMapReader.process - unknown type: ${i}`)}}return u?d(u):o}}return o}(),CMapFactory=function(){function e(e){let r=0;for(let t=0;t<e.length;t++)r=r<<8|e.charCodeAt(t);return r>>>0}function r(e){if(!(0,_util.isString)(e))throw new _util.FormatError("Malformed CMap: expected string.")}function t(e){if(!Number.isInteger(e))throw new _util.FormatError("Malformed CMap: expected int.")}function n(t,n){while(1){let a=n.getObj();if(a===_primitives.EOF)break;if((0,_primitives.isCmd)(a,"endbfchar"))return;r(a);const i=e(a);a=n.getObj(),r(a);const s=a;t.mapOne(i,s)}}function a(t,n){while(1){let a=n.getObj();if(a===_primitives.EOF)break;if((0,_primitives.isCmd)(a,"endbfrange"))return;r(a);const i=e(a);a=n.getObj(),r(a);const s=e(a);if(a=n.getObj(),Number.isInteger(a)||(0,_util.isString)(a)){const e=Number.isInteger(a)?String.fromCharCode(a):a;t.mapBfRange(i,s,e)}else{if(!(0,_primitives.isCmd)(a,"["))break;{a=n.getObj();const e=[];while(!(0,_primitives.isCmd)(a,"]")&&a!==_primitives.EOF)e.push(a),a=n.getObj();t.mapBfRangeToArray(i,s,e)}}}throw new _util.FormatError("Invalid bf range.")}function i(n,a){while(1){let i=a.getObj();if(i===_primitives.EOF)break;if((0,_primitives.isCmd)(i,"endcidchar"))return;r(i);const s=e(i);i=a.getObj(),t(i);const o=i;n.mapOne(s,o)}}function s(n,a){while(1){let i=a.getObj();if(i===_primitives.EOF)break;if((0,_primitives.isCmd)(i,"endcidrange"))return;r(i);const s=e(i);i=a.getObj(),r(i);const o=e(i);i=a.getObj(),t(i);const d=i;n.mapCidRange(s,o,d)}}function o(r,t){while(1){let n=t.getObj();if(n===_primitives.EOF)break;if((0,_primitives.isCmd)(n,"endcodespacerange"))return;if(!(0,_util.isString)(n))break;const a=e(n);if(n=t.getObj(),!(0,_util.isString)(n))break;const i=e(n);r.addCodespaceRange(n.length,a,i)}throw new _util.FormatError("Invalid codespace range.")}function d(e,r){const t=r.getObj();Number.isInteger(t)&&(e.vertical=!!t)}function c(e,r){const t=r.getObj();(0,_primitives.isName)(t)&&(0,_util.isString)(t.name)&&(e.name=t.name)}async function p(e,r,t,p){let m,C;e:while(1)try{const t=r.getObj();if(t===_primitives.EOF)break;if((0,_primitives.isName)(t))"WMode"===t.name?d(e,r):"CMapName"===t.name&&c(e,r),m=t;else if((0,_primitives.isCmd)(t))switch(t.cmd){case"endcmap":break e;case"usecmap":(0,_primitives.isName)(m)&&(C=m.name);break;case"begincodespacerange":o(e,r);break;case"beginbfchar":n(e,r);break;case"begincidchar":i(e,r);break;case"beginbfrange":a(e,r);break;case"begincidrange":s(e,r);break}}catch(l){if(l instanceof _core_utils.MissingDataException)throw l;(0,_util.warn)("Invalid cMap data: "+l);continue}return!p&&C&&(p=C),p?u(e,t,p):e}async function u(e,r,t){if(e.useCMap=await m(t,r),0===e.numCodespaceRanges){const r=e.useCMap.codespaceRanges;for(let t=0;t<r.length;t++)e.codespaceRanges[t]=r[t].slice();e.numCodespaceRanges=e.useCMap.numCodespaceRanges}return e.useCMap.forEach((function(r,t){e.contains(r)||e.mapOne(r,e.useCMap.lookup(r))})),e}async function m(e,r){if("Identity-H"===e)return new IdentityCMap(!1,2);if("Identity-V"===e)return new IdentityCMap(!0,2);if(!BUILT_IN_CMAPS.includes(e))throw new Error("Unknown CMap name: "+e);if(!r)throw new Error("Built-in CMap parameters are not provided.");const{cMapData:t,compressionType:n}=await r(e),a=new CMap(!0);if(n===_util.CMapCompressionType.BINARY)return(new BinaryCMapReader).process(t,a,(e=>u(a,r,e)));if(n===_util.CMapCompressionType.NONE){const e=new _parser.Lexer(new _stream.Stream(t));return p(a,e,r,null)}throw new Error("TODO: Only BINARY/NONE CMap compression is currently supported.")}return{async create(e){const r=e.encoding,t=e.fetchBuiltInCMap,n=e.useCMap;if((0,_primitives.isName)(r))return m(r.name,t);if((0,_primitives.isStream)(r)){const e=await p(new CMap,new _parser.Lexer(r),t,n);return e.isIdentityCMap?m(e.name,t):e}throw new Error("Encoding required.")}}}();exports.CMapFactory=CMapFactory;