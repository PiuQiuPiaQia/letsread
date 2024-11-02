"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.XRef=void 0;var _util=require("../shared/util.js"),_primitives=require("./primitives.js"),_parser=require("./parser.js"),_core_utils=require("./core_utils.js"),_crypto=require("./crypto.js");class XRef{constructor(e,t){this.stream=e,this.pdfManager=t,this.entries=[],this.xrefstms=Object.create(null),this._cacheMap=new Map,this.stats={streamTypes:Object.create(null),fontTypes:Object.create(null)},this._newRefNum=null}getNewRef(){return null===this._newRefNum&&(this._newRefNum=this.entries.length),_primitives.Ref.get(this._newRefNum++,0)}resetNewRef(){this._newRefNum=null}setStartXRef(e){this.startXRefQueue=[e]}parse(e=!1){let t,r,s;e?((0,_util.warn)("Indexing all PDF objects"),t=this.indexObjects()):t=this.readXRef(),t.assignXref(this),this.trailer=t;try{r=t.get("Encrypt")}catch(i){if(i instanceof _core_utils.MissingDataException)throw i;(0,_util.warn)(`XRef.parse - Invalid "Encrypt" reference: "${i}".`)}if((0,_primitives.isDict)(r)){const e=t.get("ID"),s=e&&e.length?e[0]:"";r.suppressEncryption=!0,this.encrypt=new _crypto.CipherTransformFactory(r,s,this.pdfManager.password)}try{s=t.get("Root")}catch(i){if(i instanceof _core_utils.MissingDataException)throw i;(0,_util.warn)(`XRef.parse - Invalid "Root" reference: "${i}".`)}if(!(0,_primitives.isDict)(s)||!s.has("Pages")){if(!e)throw new _core_utils.XRefParseException;throw new _util.FormatError("Invalid root reference")}this.root=s}processXRefTable(e){"tableState"in this||(this.tableState={entryNum:0,streamPos:e.lexer.stream.pos,parserBuf1:e.buf1,parserBuf2:e.buf2});const t=this.readXRefTable(e);if(!(0,_primitives.isCmd)(t,"trailer"))throw new _util.FormatError("Invalid XRef table: could not find trailer dictionary");let r=e.getObj();if(!(0,_primitives.isDict)(r)&&r.dict&&(r=r.dict),!(0,_primitives.isDict)(r))throw new _util.FormatError("Invalid XRef table: could not parse trailer dictionary");return delete this.tableState,r}readXRefTable(e){const t=e.lexer.stream,r=this.tableState;let s;t.pos=r.streamPos,e.buf1=r.parserBuf1,e.buf2=r.parserBuf2;while(1){if(!("firstEntryNum"in r)||!("entryCount"in r)){if((0,_primitives.isCmd)(s=e.getObj(),"trailer"))break;r.firstEntryNum=s,r.entryCount=e.getObj()}let i=r.firstEntryNum;const n=r.entryCount;if(!Number.isInteger(i)||!Number.isInteger(n))throw new _util.FormatError("Invalid XRef table: wrong types in subsection header");for(let s=r.entryNum;s<n;s++){r.streamPos=t.pos,r.entryNum=s,r.parserBuf1=e.buf1,r.parserBuf2=e.buf2;const a={};a.offset=e.getObj(),a.gen=e.getObj();const o=e.getObj();if(o instanceof _primitives.Cmd)switch(o.cmd){case"f":a.free=!0;break;case"n":a.uncompressed=!0;break}if(!Number.isInteger(a.offset)||!Number.isInteger(a.gen)||!a.free&&!a.uncompressed)throw new _util.FormatError(`Invalid entry in XRef subsection: ${i}, ${n}`);0===s&&a.free&&1===i&&(i=0),this.entries[s+i]||(this.entries[s+i]=a)}r.entryNum=0,r.streamPos=t.pos,r.parserBuf1=e.buf1,r.parserBuf2=e.buf2,delete r.firstEntryNum,delete r.entryCount}if(this.entries[0]&&!this.entries[0].free)throw new _util.FormatError("Invalid XRef table: unexpected first object");return s}processXRefStream(e){if(!("streamState"in this)){const t=e.dict,r=t.get("W");let s=t.get("Index");s||(s=[0,t.get("Size")]),this.streamState={entryRanges:s,byteWidths:r,entryNum:0,streamPos:e.pos}}return this.readXRefStream(e),delete this.streamState,e.dict}readXRefStream(e){let t,r;const s=this.streamState;e.pos=s.streamPos;const i=s.byteWidths,n=i[0],a=i[1],o=i[2],f=s.entryRanges;while(f.length>0){const i=f[0],c=f[1];if(!Number.isInteger(i)||!Number.isInteger(c))throw new _util.FormatError(`Invalid XRef range fields: ${i}, ${c}`);if(!Number.isInteger(n)||!Number.isInteger(a)||!Number.isInteger(o))throw new _util.FormatError(`Invalid XRef entry fields length: ${i}, ${c}`);for(t=s.entryNum;t<c;++t){s.entryNum=t,s.streamPos=e.pos;let f=0,c=0,u=0;for(r=0;r<n;++r)f=f<<8|e.getByte();for(0===n&&(f=1),r=0;r<a;++r)c=c<<8|e.getByte();for(r=0;r<o;++r)u=u<<8|e.getByte();const h={};switch(h.offset=c,h.gen=u,f){case 0:h.free=!0;break;case 1:h.uncompressed=!0;break;case 2:break;default:throw new _util.FormatError(`Invalid XRef entry type: ${f}`)}this.entries[i+t]||(this.entries[i+t]=h)}s.entryNum=0,s.streamPos=e.pos,f.splice(0,2)}}indexObjects(){const e=9,t=10,r=13,s=32,i=37,n=60;function a(e,s){let i="",a=e[s];while(a!==t&&a!==r&&a!==n){if(++s>=e.length)break;i+=String.fromCharCode(a),a=e[s]}return i}function o(e,t,r){const s=r.length,i=e.length;let n=0;while(t<i){let i=0;while(i<s&&e[t+i]===r[i])++i;if(i>=s)break;t++,n++}return n}const f=/^(\d+)\s+(\d+)\s+obj\b/,c=/\bendobj[\b\s]$/,u=/\s+(\d+\s+\d+\s+obj[\b\s<])$/,h=25,l=new Uint8Array([116,114,97,105,108,101,114]),m=new Uint8Array([115,116,97,114,116,120,114,101,102]),p=new Uint8Array([111,98,106]),b=new Uint8Array([47,88,82,101,102]);this.entries.length=0;const d=this.stream;d.pos=0;const g=d.getBytes(),w=g.length;let _=d.start;const y=[],R=[];while(_<w){let n=g[_];if(n===e||n===t||n===r||n===s){++_;continue}if(n===i){do{if(++_,_>=w)break;n=g[_]}while(n!==t&&n!==r);continue}const j=a(g,_);let X;if(j.startsWith("xref")&&(4===j.length||/\s/.test(j[4])))_+=o(g,_,l),y.push(_),_+=o(g,_,m);else if(X=f.exec(j)){const e=0|X[1],t=0|X[2];let r,s=_+j.length,i=!1;if(this.entries[e]){if(this.entries[e].gen===t)try{const e=new _parser.Parser({lexer:new _parser.Lexer(d.makeSubStream(s))});e.getObj(),i=!0}catch(v){v instanceof _core_utils.ParserEOFException?(0,_util.warn)(`indexObjects -- checking object (${j}): "${v}".`):i=!0}}else i=!0;i&&(this.entries[e]={offset:_-d.start,gen:t,uncompressed:!0});while(s<g.length){const e=s+o(g,s,p)+4;r=e-_;const t=Math.max(e-h,s),i=(0,_util.bytesToString)(g.subarray(t,e));if(c.test(i))break;{const e=u.exec(i);if(e&&e[1]){(0,_util.warn)('indexObjects: Found new "obj" inside of another "obj", caused by missing "endobj" -- trying to recover.'),r-=e[1].length;break}}s=e}const n=g.subarray(_,_+r),a=o(n,0,b);a<r&&n[a+5]<64&&(R.push(_-d.start),this.xrefstms[_-d.start]=1),_+=r}else j.startsWith("trailer")&&(7===j.length||/\s/.test(j[7]))?(y.push(_),_+=o(g,_,m)):_+=j.length+1}for(let X=0,x=R.length;X<x;++X)this.startXRefQueue.push(R[X]),this.readXRef(!0);let j;for(let X=0,x=y.length;X<x;++X){d.pos=y[X];const e=new _parser.Parser({lexer:new _parser.Lexer(d),xref:this,allowStreams:!0,recoveryMode:!0}),t=e.getObj();if(!(0,_primitives.isCmd)(t,"trailer"))continue;const r=e.getObj();if((0,_primitives.isDict)(r)){try{const e=r.get("Root");if(!(e instanceof _primitives.Dict))continue;const t=e.get("Pages");if(!(t instanceof _primitives.Dict))continue;const s=t.get("Count");if(!Number.isInteger(s))continue}catch(v){continue}if(r.has("ID"))return r;j=r}}if(j)return j;throw new _util.InvalidPDFException("Invalid PDF structure.")}readXRef(e=!1){const t=this.stream,r=new Set;try{while(this.startXRefQueue.length){const e=this.startXRefQueue[0];if(r.has(e)){(0,_util.warn)("readXRef - skipping XRef table since it was already parsed."),this.startXRefQueue.shift();continue}r.add(e),t.pos=e+t.start;const s=new _parser.Parser({lexer:new _parser.Lexer(t),xref:this,allowStreams:!0});let i,n=s.getObj();if((0,_primitives.isCmd)(n,"xref")){if(i=this.processXRefTable(s),this.topDict||(this.topDict=i),n=i.get("XRefStm"),Number.isInteger(n)){const e=n;e in this.xrefstms||(this.xrefstms[e]=1,this.startXRefQueue.push(e))}}else{if(!Number.isInteger(n))throw new _util.FormatError("Invalid XRef stream header");if(!Number.isInteger(s.getObj())||!(0,_primitives.isCmd)(s.getObj(),"obj")||!(0,_primitives.isStream)(n=s.getObj()))throw new _util.FormatError("Invalid XRef stream");if(i=this.processXRefStream(n),this.topDict||(this.topDict=i),!i)throw new _util.FormatError("Failed to read XRef stream")}n=i.get("Prev"),Number.isInteger(n)?this.startXRefQueue.push(n):(0,_primitives.isRef)(n)&&this.startXRefQueue.push(n.num),this.startXRefQueue.shift()}return this.topDict}catch(s){if(s instanceof _core_utils.MissingDataException)throw s;(0,_util.info)("(while reading XRef): "+s)}if(!e)throw new _core_utils.XRefParseException}getEntry(e){const t=this.entries[e];return t&&!t.free&&t.offset?t:null}fetchIfRef(e,t=!1){return e instanceof _primitives.Ref?this.fetch(e,t):e}fetch(e,t=!1){if(!(e instanceof _primitives.Ref))throw new Error("ref object is not a reference");const r=e.num,s=this._cacheMap.get(r);if(void 0!==s)return s instanceof _primitives.Dict&&!s.objId&&(s.objId=e.toString()),s;let i=this.getEntry(r);return null===i?(this._cacheMap.set(r,i),i):(i=i.uncompressed?this.fetchUncompressed(e,i,t):this.fetchCompressed(e,i,t),(0,_primitives.isDict)(i)?i.objId=e.toString():(0,_primitives.isStream)(i)&&(i.dict.objId=e.toString()),i)}fetchUncompressed(e,t,r=!1){const s=e.gen;let i=e.num;if(t.gen!==s)throw new _core_utils.XRefEntryException(`Inconsistent generation in XRef: ${e}`);const n=this.stream.makeSubStream(t.offset+this.stream.start),a=new _parser.Parser({lexer:new _parser.Lexer(n),xref:this,allowStreams:!0}),o=a.getObj(),f=a.getObj(),c=a.getObj();if(o!==i||f!==s||!(c instanceof _primitives.Cmd))throw new _core_utils.XRefEntryException(`Bad (uncompressed) XRef entry: ${e}`);if("obj"!==c.cmd){if(c.cmd.startsWith("obj")&&(i=parseInt(c.cmd.substring(3),10),!Number.isNaN(i)))return i;throw new _core_utils.XRefEntryException(`Bad (uncompressed) XRef entry: ${e}`)}return t=this.encrypt&&!r?a.getObj(this.encrypt.createCipherTransform(i,s)):a.getObj(),(0,_primitives.isStream)(t)||this._cacheMap.set(i,t),t}fetchCompressed(e,t,r=!1){const s=t.offset,i=this.fetch(_primitives.Ref.get(s,0));if(!(0,_primitives.isStream)(i))throw new _util.FormatError("bad ObjStm stream");const n=i.dict.get("First"),a=i.dict.get("N");if(!Number.isInteger(n)||!Number.isInteger(a))throw new _util.FormatError("invalid first and n parameters for ObjStm stream");let o=new _parser.Parser({lexer:new _parser.Lexer(i),xref:this,allowStreams:!0});const f=new Array(a),c=new Array(a);for(let l=0;l<a;++l){const e=o.getObj();if(!Number.isInteger(e))throw new _util.FormatError(`invalid object number in the ObjStm stream: ${e}`);const t=o.getObj();if(!Number.isInteger(t))throw new _util.FormatError(`invalid object offset in the ObjStm stream: ${t}`);f[l]=e,c[l]=t}const u=(i.start||0)+n,h=new Array(a);for(let l=0;l<a;++l){const e=l<a-1?c[l+1]-c[l]:void 0;if(e<0)throw new _util.FormatError("Invalid offset in the ObjStm stream.");o=new _parser.Parser({lexer:new _parser.Lexer(i.makeSubStream(u+c[l],e,i.dict)),xref:this,allowStreams:!0});const t=o.getObj();if(h[l]=t,(0,_primitives.isStream)(t))continue;const r=f[l],n=this.entries[r];n&&n.offset===s&&n.gen===l&&this._cacheMap.set(r,t)}if(t=h[t.gen],void 0===t)throw new _core_utils.XRefEntryException(`Bad (compressed) XRef entry: ${e}`);return t}async fetchIfRefAsync(e,t){return e instanceof _primitives.Ref?this.fetchAsync(e,t):e}async fetchAsync(e,t){try{return this.fetch(e,t)}catch(r){if(!(r instanceof _core_utils.MissingDataException))throw r;return await this.pdfManager.requestRange(r.begin,r.end),this.fetchAsync(e,t)}}getCatalogObj(){return this.root}}exports.XRef=XRef;