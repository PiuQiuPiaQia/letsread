"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DownloadManager=void 0;var _pdf=require("../pdf"),_app_options=require("./app_options.js");function download(o,e){const a=document.createElement("a");if(!a.click)throw new Error('DownloadManager: "a.click()" is not supported.');a.href=o,a.target="_parent","download"in a&&(a.download=e),(document.body||document.documentElement).appendChild(a),a.click(),a.remove()}class DownloadManager{constructor(){this._openBlobUrls=new WeakMap}downloadUrl(o,e){(0,_pdf.createValidAbsoluteUrl)(o,"http://example.com")?download(o+"#pdfjs.action=download",e):console.error(`downloadUrl - not a valid URL: ${o}`)}downloadData(o,e,a){const t=(0,_pdf.createObjectURL)(o,a,_app_options.compatibilityParams.disableCreateObjectURL);download(t,e)}openOrDownloadData(o,e,a){const t=(0,_pdf.isPdfFile)(a),n=t?"application/pdf":"";if(t&&!_app_options.compatibilityParams.disableCreateObjectURL){let t,r=this._openBlobUrls.get(o);r||(r=URL.createObjectURL(new Blob([e],{type:n})),this._openBlobUrls.set(o,r)),t="?file="+encodeURIComponent(r+"#"+a);try{return window.open(t),!0}catch(d){console.error(`openOrDownloadData: ${d}`),URL.revokeObjectURL(r),this._openBlobUrls.delete(o)}}return this.downloadData(e,a,n),!1}download(o,e,a,t="download"){if(_app_options.compatibilityParams.disableCreateObjectURL)return void this.downloadUrl(e,a);const n=URL.createObjectURL(o);download(n,a)}}exports.DownloadManager=DownloadManager;