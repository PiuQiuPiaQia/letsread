"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getXfaHtmlForPrinting=getXfaHtmlForPrinting;var _pdf=require("../pdf"),_xfa_layer_builder=require("./xfa_layer_builder.js");function getXfaHtmlForPrinting(e,r){const t=r.allXfaHtml,a=new _xfa_layer_builder.DefaultXfaLayerFactory,n=Math.round(100*_pdf.PixelsPerInch.PDF_TO_CSS_UNITS)/100;for(const l of t.children){const t=document.createElement("div");t.className="xfaPrintedPage",e.appendChild(t);const i=a.createXfaLayerBuilder(t,null,r.annotationStorage,l),o=(0,_pdf.getXfaPageViewport)(l,{scale:n});i.render(o,"print")}}