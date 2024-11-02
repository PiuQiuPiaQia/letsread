"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.StructTreeLayerBuilder=exports.DefaultStructTreeLayerFactory=void 0;const PDF_ROLE_TO_HTML_ROLE={Document:null,DocumentFragment:null,Part:"group",Sect:"group",Div:"group",Aside:"note",NonStruct:"none",P:null,H:"heading",Title:null,FENote:"note",Sub:"group",Lbl:null,Span:null,Em:null,Strong:null,Link:"link",Annot:"note",Form:"form",Ruby:null,RB:null,RT:null,RP:null,Warichu:null,WT:null,WP:null,L:"list",LI:"listitem",LBody:null,Table:"table",TR:"row",TH:"columnheader",TD:"cell",THead:"columnheader",TBody:null,TFoot:null,Caption:null,Figure:"figure",Formula:null,Artifact:null},HEADING_PATTERN=/^H(\d+)$/;class StructTreeLayerBuilder{constructor({pdfPage:e}){this.pdfPage=e}render(e){return this._walk(e)}_setAttributes(e,t){void 0!==e.alt&&t.setAttribute("aria-label",e.alt),void 0!==e.id&&t.setAttribute("aria-owns",e.id)}_walk(e){if(!e)return null;const t=document.createElement("span");if("role"in e){const{role:r}=e,l=r.match(HEADING_PATTERN);l?(t.setAttribute("role","heading"),t.setAttribute("aria-level",l[1])):PDF_ROLE_TO_HTML_ROLE[r]&&t.setAttribute("role",PDF_ROLE_TO_HTML_ROLE[r])}if(this._setAttributes(e,t),e.children)if(1===e.children.length&&"id"in e.children[0])this._setAttributes(e.children[0],t);else for(const r of e.children)t.appendChild(this._walk(r));return t}}exports.StructTreeLayerBuilder=StructTreeLayerBuilder;class DefaultStructTreeLayerFactory{createStructTreeLayerBuilder(e){return new StructTreeLayerBuilder({pdfPage:e})}}exports.DefaultStructTreeLayerFactory=DefaultStructTreeLayerFactory;