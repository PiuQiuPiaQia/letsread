"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CFFFont=void 0;var _cff_parser=require("./cff_parser.js"),_fonts_utils=require("./fonts_utils.js"),_util=require("../shared/util.js");class CFFFont{constructor(t,e){this.properties=e;const s=new _cff_parser.CFFParser(t,e,_fonts_utils.SEAC_ANALYSIS_ENABLED);this.cff=s.parse(),this.cff.duplicateFirstGlyph();const r=new _cff_parser.CFFCompiler(this.cff);this.seacs=this.cff.seacs;try{this.data=r.compile()}catch(n){(0,_util.warn)("Failed to compile font "+e.loadedName),this.data=t}this._createBuiltInEncoding()}get numGlyphs(){return this.cff.charStrings.count}getCharset(){return this.cff.charset.charset}getGlyphMapping(){const t=this.cff,e=this.properties,s=t.charset.charset;let r,n;if(e.composite){let c;if(r=Object.create(null),t.isCIDFont)for(n=0;n<s.length;n++){const t=s[n];c=e.cMap.charCodeOf(t),r[c]=n}else for(n=0;n<t.charStrings.count;n++)c=e.cMap.charCodeOf(n),r[c]=n;return r}let c=t.encoding?t.encoding.encoding:null;return e.isInternalFont&&(c=e.defaultEncoding),r=(0,_fonts_utils.type1FontGlyphMapping)(e,c,s),r}hasGlyphId(t){return this.cff.hasGlyphId(t)}_createBuiltInEncoding(){const{charset:t,encoding:e}=this.cff;if(!t||!e)return;const s=t.charset,r=e.encoding,n=[];for(const c in r){const t=r[c];if(t>=0){const e=s[t];e&&(n[c]=e)}}n.length>0&&(this.properties.builtInEncoding=n)}}exports.CFFFont=CFFFont;