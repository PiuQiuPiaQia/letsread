"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.FontRendererFactory=void 0;var _util=require("../shared/util.js"),_cff_parser=require("./cff_parser.js"),_glyphlist=require("./glyphlist.js"),_encodings=require("./encodings.js"),_stream=require("./stream.js");function getLong(t,e){return t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}function getUshort(t,e){return t[e]<<8|t[e+1]}function getSubroutineBias(t){const e=t.length;let s=32768;return e<1240?s=107:e<33900&&(s=1131),s}function parseCmap(t,e,s){const i=1===getUshort(t,e+2)?getLong(t,e+8):getLong(t,e+16),r=getUshort(t,e+i);let h,a,o;if(4===r){getUshort(t,e+i+2);const s=getUshort(t,e+i+6)>>1;for(a=e+i+14,h=[],o=0;o<s;o++,a+=2)h[o]={end:getUshort(t,a)};for(a+=2,o=0;o<s;o++,a+=2)h[o].start=getUshort(t,a);for(o=0;o<s;o++,a+=2)h[o].idDelta=getUshort(t,a);for(o=0;o<s;o++,a+=2){let e=getUshort(t,a);if(0!==e){h[o].ids=[];for(let s=0,i=h[o].end-h[o].start+1;s<i;s++)h[o].ids[s]=getUshort(t,a+e),e+=2}}return h}if(12===r){getLong(t,e+i+4);const s=getLong(t,e+i+12);for(a=e+i+16,h=[],o=0;o<s;o++)h.push({start:getLong(t,a),end:getLong(t,a+4),idDelta:getLong(t,a+8)-getLong(t,a)}),a+=12;return h}throw new _util.FormatError(`unsupported cmap: ${r}`)}function parseCff(t,e,s,i){const r={},h=new _cff_parser.CFFParser(new _stream.Stream(t,e,s-e),r,i),a=h.parse();return{glyphs:a.charStrings.objects,subrs:a.topDict.privateDict&&a.topDict.privateDict.subrsIndex&&a.topDict.privateDict.subrsIndex.objects,gsubrs:a.globalSubrIndex&&a.globalSubrIndex.objects,isCFFCIDFont:a.isCIDFont,fdSelect:a.fdSelect,fdArray:a.fdArray}}function parseGlyfTable(t,e,s){let i,r;s?(i=4,r=function(t,e){return t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}):(i=2,r=function(t,e){return t[e]<<9|t[e+1]<<1});const h=[];let a=r(e,0);for(let o=i;o<e.length;o+=i){const s=r(e,o);h.push(t.subarray(a,s)),a=s}return h}function lookupCmap(t,e){const s=e.codePointAt(0);let i=0,r=0,h=t.length-1;while(r<h){const e=r+h+1>>1;s<t[e].start?h=e-1:r=e}return t[r].start<=s&&s<=t[r].end&&(i=t[r].idDelta+(t[r].ids?t[r].ids[s-t[r].start]:s)&65535),{charCode:s,glyphId:i}}function compileGlyf(t,e,s){function i(t,s){e.push({cmd:"moveTo",args:[t,s]})}function r(t,s){e.push({cmd:"lineTo",args:[t,s]})}function h(t,s,i,r){e.push({cmd:"quadraticCurveTo",args:[t,s,i,r]})}let a=0;const o=(t[a]<<24|t[a+1]<<16)>>16;let n,l=0,c=0;if(a+=10,o<0)do{n=t[a]<<8|t[a+1];const i=t[a+2]<<8|t[a+3];let r,h;a+=4,1&n?(r=(t[a]<<24|t[a+1]<<16)>>16,h=(t[a+2]<<24|t[a+3]<<16)>>16,a+=4):(r=t[a++],h=t[a++]),2&n?(l=r,c=h):(l=0,c=0);let o=1,f=1,p=0,g=0;8&n?(o=f=(t[a]<<24|t[a+1]<<16)/1073741824,a+=2):64&n?(o=(t[a]<<24|t[a+1]<<16)/1073741824,f=(t[a+2]<<24|t[a+3]<<16)/1073741824,a+=4):128&n&&(o=(t[a]<<24|t[a+1]<<16)/1073741824,p=(t[a+2]<<24|t[a+3]<<16)/1073741824,g=(t[a+4]<<24|t[a+5]<<16)/1073741824,f=(t[a+6]<<24|t[a+7]<<16)/1073741824,a+=8);const u=s.glyphs[i];u&&(e.push({cmd:"save"},{cmd:"transform",args:[o,p,g,f,l,c]}),compileGlyf(u,e,s),e.push({cmd:"restore"}))}while(32&n);else{const e=[];let s,f;for(s=0;s<o;s++)e.push(t[a]<<8|t[a+1]),a+=2;const p=t[a]<<8|t[a+1];a+=2+p;const g=e[e.length-1]+1,u=[];while(u.length<g){n=t[a++];let e=1;8&n&&(e+=t[a++]);while(e-- >0)u.push({flags:n})}for(s=0;s<g;s++){switch(18&u[s].flags){case 0:l+=(t[a]<<24|t[a+1]<<16)>>16,a+=2;break;case 2:l-=t[a++];break;case 18:l+=t[a++];break}u[s].x=l}for(s=0;s<g;s++){switch(36&u[s].flags){case 0:c+=(t[a]<<24|t[a+1]<<16)>>16,a+=2;break;case 4:c-=t[a++];break;case 36:c+=t[a++];break}u[s].y=c}let d=0;for(a=0;a<o;a++){const t=e[a],o=u.slice(d,t+1);if(1&o[0].flags)o.push(o[0]);else if(1&o[o.length-1].flags)o.unshift(o[o.length-1]);else{const t={flags:1,x:(o[0].x+o[o.length-1].x)/2,y:(o[0].y+o[o.length-1].y)/2};o.unshift(t),o.push(t)}for(i(o[0].x,o[0].y),s=1,f=o.length;s<f;s++)1&o[s].flags?r(o[s].x,o[s].y):1&o[s+1].flags?(h(o[s].x,o[s].y,o[s+1].x,o[s+1].y),s++):h(o[s].x,o[s].y,(o[s].x+o[s+1].x)/2,(o[s].y+o[s+1].y)/2);d=t+1}}}function compileCharString(t,e,s,i){function r(t,s){e.push({cmd:"moveTo",args:[t,s]})}function h(t,s){e.push({cmd:"lineTo",args:[t,s]})}function a(t,s,i,r,h,a){e.push({cmd:"bezierCurveTo",args:[t,s,i,r,h,a]})}const o=[];let n=0,l=0,c=0;function f(t){let p=0;while(p<t.length){let g,u,d,b,m,y,C,k,F,w=!1,I=t[p++];switch(I){case 1:c+=o.length>>1,w=!0;break;case 3:c+=o.length>>1,w=!0;break;case 4:l+=o.pop(),r(n,l),w=!0;break;case 5:while(o.length>0)n+=o.shift(),l+=o.shift(),h(n,l);break;case 6:while(o.length>0){if(n+=o.shift(),h(n,l),0===o.length)break;l+=o.shift(),h(n,l)}break;case 7:while(o.length>0){if(l+=o.shift(),h(n,l),0===o.length)break;n+=o.shift(),h(n,l)}break;case 8:while(o.length>0)g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+o.shift(),a(g,d,u,b,n,l);break;case 10:if(k=o.pop(),F=null,s.isCFFCIDFont){const t=s.fdSelect.getFDIndex(i);if(t>=0&&t<s.fdArray.length){const e=s.fdArray[t];let i;e.privateDict&&e.privateDict.subrsIndex&&(i=e.privateDict.subrsIndex.objects),i&&(k+=getSubroutineBias(i),F=i[k])}else(0,_util.warn)("Invalid fd index for glyph index.")}else F=s.subrs[k+s.subrsBias];F&&f(F);break;case 11:return;case 12:switch(I=t[p++],I){case 34:g=n+o.shift(),u=g+o.shift(),m=l+o.shift(),n=u+o.shift(),a(g,l,u,m,n,m),g=n+o.shift(),u=g+o.shift(),n=u+o.shift(),a(g,m,u,l,n,l);break;case 35:g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+o.shift(),a(g,d,u,b,n,l),g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+o.shift(),a(g,d,u,b,n,l),o.pop();break;case 36:g=n+o.shift(),m=l+o.shift(),u=g+o.shift(),y=m+o.shift(),n=u+o.shift(),a(g,m,u,y,n,y),g=n+o.shift(),u=g+o.shift(),C=y+o.shift(),n=u+o.shift(),a(g,y,u,C,n,l);break;case 37:const t=n,e=l;g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+o.shift(),a(g,d,u,b,n,l),g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u,l=b,Math.abs(n-t)>Math.abs(l-e)?n+=o.shift():l+=o.shift(),a(g,d,u,b,n,l);break;default:throw new _util.FormatError(`unknown operator: 12 ${I}`)}break;case 14:if(o.length>=4){const t=o.pop(),i=o.pop();l=o.pop(),n=o.pop(),e.push({cmd:"save"},{cmd:"translate",args:[n,l]});let r=lookupCmap(s.cmap,String.fromCharCode(s.glyphNameMap[_encodings.StandardEncoding[t]]));compileCharString(s.glyphs[r.glyphId],e,s,r.glyphId),e.push({cmd:"restore"}),r=lookupCmap(s.cmap,String.fromCharCode(s.glyphNameMap[_encodings.StandardEncoding[i]])),compileCharString(s.glyphs[r.glyphId],e,s,r.glyphId)}return;case 18:c+=o.length>>1,w=!0;break;case 19:c+=o.length>>1,p+=c+7>>3,w=!0;break;case 20:c+=o.length>>1,p+=c+7>>3,w=!0;break;case 21:l+=o.pop(),n+=o.pop(),r(n,l),w=!0;break;case 22:n+=o.pop(),r(n,l),w=!0;break;case 23:c+=o.length>>1,w=!0;break;case 24:while(o.length>2)g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+o.shift(),a(g,d,u,b,n,l);n+=o.shift(),l+=o.shift(),h(n,l);break;case 25:while(o.length>6)n+=o.shift(),l+=o.shift(),h(n,l);g=n+o.shift(),d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+o.shift(),a(g,d,u,b,n,l);break;case 26:o.length%2&&(n+=o.shift());while(o.length>0)g=n,d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u,l=b+o.shift(),a(g,d,u,b,n,l);break;case 27:o.length%2&&(l+=o.shift());while(o.length>0)g=n+o.shift(),d=l,u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b,a(g,d,u,b,n,l);break;case 28:o.push((t[p]<<24|t[p+1]<<16)>>16),p+=2;break;case 29:k=o.pop()+s.gsubrsBias,F=s.gsubrs[k],F&&f(F);break;case 30:while(o.length>0){if(g=n,d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+(1===o.length?o.shift():0),a(g,d,u,b,n,l),0===o.length)break;g=n+o.shift(),d=l,u=g+o.shift(),b=d+o.shift(),l=b+o.shift(),n=u+(1===o.length?o.shift():0),a(g,d,u,b,n,l)}break;case 31:while(o.length>0){if(g=n+o.shift(),d=l,u=g+o.shift(),b=d+o.shift(),l=b+o.shift(),n=u+(1===o.length?o.shift():0),a(g,d,u,b,n,l),0===o.length)break;g=n,d=l+o.shift(),u=g+o.shift(),b=d+o.shift(),n=u+o.shift(),l=b+(1===o.length?o.shift():0),a(g,d,u,b,n,l)}break;default:if(I<32)throw new _util.FormatError(`unknown operator: ${I}`);I<247?o.push(I-139):I<251?o.push(256*(I-247)+t[p++]+108):I<255?o.push(256*-(I-251)-t[p++]-108):(o.push((t[p]<<24|t[p+1]<<16|t[p+2]<<8|t[p+3])/65536),p+=4);break}w&&(o.length=0)}}f(t)}const NOOP=[];class CompiledFont{constructor(t){this.constructor===CompiledFont&&(0,_util.unreachable)("Cannot initialize CompiledFont."),this.fontMatrix=t,this.compiledGlyphs=Object.create(null),this.compiledCharCodeToGlyphId=Object.create(null)}getPathJs(t){const{charCode:e,glyphId:s}=lookupCmap(this.cmap,t);let i=this.compiledGlyphs[s];if(!i)try{i=this.compileGlyph(this.glyphs[s],s),this.compiledGlyphs[s]=i}catch(r){throw this.compiledGlyphs[s]=NOOP,void 0===this.compiledCharCodeToGlyphId[e]&&(this.compiledCharCodeToGlyphId[e]=s),r}return void 0===this.compiledCharCodeToGlyphId[e]&&(this.compiledCharCodeToGlyphId[e]=s),i}compileGlyph(t,e){if(!t||0===t.length||14===t[0])return NOOP;let s=this.fontMatrix;if(this.isCFFCIDFont){const t=this.fdSelect.getFDIndex(e);if(t>=0&&t<this.fdArray.length){const e=this.fdArray[t];s=e.getByName("FontMatrix")||_util.FONT_IDENTITY_MATRIX}else(0,_util.warn)("Invalid fd index for glyph index.")}const i=[{cmd:"save"},{cmd:"transform",args:s.slice()},{cmd:"scale",args:["size","-size"]}];return this.compileGlyphImpl(t,i,e),i.push({cmd:"restore"}),i}compileGlyphImpl(){(0,_util.unreachable)("Children classes should implement this.")}hasBuiltPath(t){const{charCode:e,glyphId:s}=lookupCmap(this.cmap,t);return void 0!==this.compiledGlyphs[s]&&void 0!==this.compiledCharCodeToGlyphId[e]}}class TrueTypeCompiled extends CompiledFont{constructor(t,e,s){super(s||[488e-6,0,0,488e-6,0,0]),this.glyphs=t,this.cmap=e}compileGlyphImpl(t,e){compileGlyf(t,e,this)}}class Type2Compiled extends CompiledFont{constructor(t,e,s,i){super(s||[.001,0,0,.001,0,0]),this.glyphs=t.glyphs,this.gsubrs=t.gsubrs||[],this.subrs=t.subrs||[],this.cmap=e,this.glyphNameMap=i||(0,_glyphlist.getGlyphsUnicode)(),this.gsubrsBias=getSubroutineBias(this.gsubrs),this.subrsBias=getSubroutineBias(this.subrs),this.isCFFCIDFont=t.isCFFCIDFont,this.fdSelect=t.fdSelect,this.fdArray=t.fdArray}compileGlyphImpl(t,e,s){compileCharString(t,e,this,s)}}class FontRendererFactory{static create(t,e){const s=new Uint8Array(t.data);let i,r,h,a,o,n;const l=getUshort(s,4);for(let c=0,f=12;c<l;c++,f+=16){const t=(0,_util.bytesToString)(s.subarray(f,f+4)),l=getLong(s,f+8),c=getLong(s,f+12);switch(t){case"cmap":i=parseCmap(s,l,l+c);break;case"glyf":r=s.subarray(l,l+c);break;case"loca":h=s.subarray(l,l+c);break;case"head":n=getUshort(s,l+18),o=getUshort(s,l+50);break;case"CFF ":a=parseCff(s,l,l+c,e);break}}if(r){const e=n?[1/n,0,0,1/n,0,0]:t.fontMatrix;return new TrueTypeCompiled(parseGlyfTable(r,h,o),i,e)}return new Type2Compiled(a,i,t.fontMatrix,t.glyphNameMap)}}exports.FontRendererFactory=FontRendererFactory;