"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.docPropertiesLookup=docPropertiesLookup,exports.GenericScripting=void 0;var _pdf=require("../pdf");async function docPropertiesLookup(e){const t="",a=t.split("#")[0];let{info:n,metadata:o,contentDispositionFilename:i,contentLength:r}=await e.getMetadata();if(!r){const{length:t}=await e.getDownloadInfo();r=t}return{...n,baseURL:a,filesize:r,filename:i||(0,_pdf.getPdfFilenameFromUrl)(t),metadata:o?.getRaw(),authors:o?.get("dc:creator"),numPages:e.numPages,URL:t}}class GenericScripting{constructor(e){this._ready=(0,_pdf.loadScript)(e,!0).then((()=>window.pdfjsSandbox.QuickJSSandbox()))}async createSandbox(e){const t=await this._ready;t.create(e)}async dispatchEventInSandbox(e){const t=await this._ready;t.dispatchEvent(e)}async destroySandbox(){const e=await this._ready;e.nukeSandbox()}}exports.GenericScripting=GenericScripting;