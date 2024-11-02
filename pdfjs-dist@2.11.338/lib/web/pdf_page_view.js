"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PDFPageView=void 0;var _pdf=require("../pdf"),_ui_utils=require("./ui_utils.js"),_app_options=require("./app_options.js"),_l10n_utils=require("./l10n_utils.js"),_pdf_rendering_queue=require("./pdf_rendering_queue.js");const MAX_CANVAS_PIXELS=_app_options.compatibilityParams.maxCanvasPixels||16777216;class PDFPageView{constructor(e){const t=e.container,i=e.defaultViewport;this.id=e.id,this.renderingId="page"+this.id,this.pdfPage=null,this.pageLabel=null,this.rotation=0,this.scale=e.scale||_ui_utils.DEFAULT_SCALE,this.viewport=i,this.pdfPageRotate=i.rotation,this._optionalContentConfigPromise=e.optionalContentConfigPromise||null,this.hasRestrictedScaling=!1,this.textLayerMode=e.textLayerMode??_ui_utils.TextLayerMode.ENABLE,this._annotationMode=e.annotationMode??_pdf.AnnotationMode.ENABLE_FORMS,this.imageResourcesPath=e.imageResourcesPath||"",this.useOnlyCssZoom=e.useOnlyCssZoom||!1,this.maxCanvasPixels=e.maxCanvasPixels||MAX_CANVAS_PIXELS,this.eventBus=e.eventBus,this.renderingQueue=e.renderingQueue,this.textLayerFactory=e.textLayerFactory,this.annotationLayerFactory=e.annotationLayerFactory,this.xfaLayerFactory=e.xfaLayerFactory,this.textHighlighter=e.textHighlighterFactory?.createTextHighlighter(this.id-1,this.eventBus),this.structTreeLayerFactory=e.structTreeLayerFactory,this.renderer=e.renderer||_ui_utils.RendererType.CANVAS,this.l10n=e.l10n||_l10n_utils.NullL10n,this.paintTask=null,this.paintedViewportMap=new WeakMap,this.renderingState=_pdf_rendering_queue.RenderingStates.INITIAL,this.resume=null,this._renderError=null,this._isStandalone=!this.renderingQueue?.hasViewer(),this.annotationLayer=null,this.textLayer=null,this.zoomLayer=null,this.xfaLayer=null,this.structTreeLayer=null;const s=document.createElement("div");s.className="page",s.style.width=Math.floor(this.viewport.width)+"px",s.style.height=Math.floor(this.viewport.height)+"px",s.setAttribute("data-page-number",this.id),s.setAttribute("role","region"),this.l10n.get("page_landmark",{page:this.id}).then((e=>{s.setAttribute("aria-label",e)})),this.div=s,t.appendChild(s)}setPdfPage(e){this.pdfPage=e,this.pdfPageRotate=e.rotate;const t=(this.rotation+this.pdfPageRotate)%360;this.viewport=e.getViewport({scale:this.scale*_pdf.PixelsPerInch.PDF_TO_CSS_UNITS,rotation:t}),this.reset()}destroy(){this.reset(),this.pdfPage&&this.pdfPage.cleanup()}async _renderAnnotationLayer(){let e=null;try{await this.annotationLayer.render(this.viewport,"display")}catch(t){e=t}finally{this.eventBus.dispatch("annotationlayerrendered",{source:this,pageNumber:this.id,error:e})}}async _renderXfaLayer(){let e=null;try{const t=await this.xfaLayer.render(this.viewport,"display");this.textHighlighter&&this._buildXfaTextContentItems(t.textDivs)}catch(t){e=t}finally{this.eventBus.dispatch("xfalayerrendered",{source:this,pageNumber:this.id,error:e})}}async _buildXfaTextContentItems(e){const t=await this.pdfPage.getTextContent(),i=[];for(const s of t.items)i.push(s.str);this.textHighlighter.setTextMapping(e,i),this.textHighlighter.enable()}_resetZoomLayer(e=!1){if(!this.zoomLayer)return;const t=this.zoomLayer.firstChild;this.paintedViewportMap.delete(t),t.width=0,t.height=0,e&&this.zoomLayer.remove(),this.zoomLayer=null}reset({keepZoomLayer:e=!1,keepAnnotationLayer:t=!1,keepXfaLayer:i=!1}={}){this.cancelRendering({keepAnnotationLayer:t,keepXfaLayer:i}),this.renderingState=_pdf_rendering_queue.RenderingStates.INITIAL;const s=this.div;s.style.width=Math.floor(this.viewport.width)+"px",s.style.height=Math.floor(this.viewport.height)+"px";const a=s.childNodes,n=e&&this.zoomLayer||null,r=t&&this.annotationLayer?.div||null,o=i&&this.xfaLayer?.div||null;for(let h=a.length-1;h>=0;h--){const e=a[h];switch(e){case n:case r:case o:continue}s.removeChild(e)}s.removeAttribute("data-loaded"),r&&this.annotationLayer.hide(),o&&this.xfaLayer.hide(),n||(this.canvas&&(this.paintedViewportMap.delete(this.canvas),this.canvas.width=0,this.canvas.height=0,delete this.canvas),this._resetZoomLayer()),this.svg&&(this.paintedViewportMap.delete(this.svg),delete this.svg),this.loadingIconDiv=document.createElement("div"),this.loadingIconDiv.className="loadingIcon",this.loadingIconDiv.setAttribute("role","img"),this.l10n.get("loading").then((e=>{this.loadingIconDiv?.setAttribute("aria-label",e)})),s.appendChild(this.loadingIconDiv)}update({scale:e=0,rotation:t=null,optionalContentConfigPromise:i=null}){if("object"!==typeof arguments[0])return console.error("PDFPageView.update called with separate parameters, please use an object instead."),void this.update({scale:arguments[0],rotation:arguments[1],optionalContentConfigPromise:arguments[2]});if(this.scale=e||this.scale,"number"===typeof t&&(this.rotation=t),i instanceof Promise&&(this._optionalContentConfigPromise=i),this._isStandalone){const e=document.documentElement;e.style.setProperty("--zoom-factor",this.scale)}const s=(this.rotation+this.pdfPageRotate)%360;if(this.viewport=this.viewport.clone({scale:this.scale*_pdf.PixelsPerInch.PDF_TO_CSS_UNITS,rotation:s}),this.svg)return this.cssTransform({target:this.svg,redrawAnnotationLayer:!0,redrawXfaLayer:!0}),void this.eventBus.dispatch("pagerendered",{source:this,pageNumber:this.id,cssTransform:!0,timestamp:performance.now(),error:this._renderError});let a=!1;if(this.canvas&&this.maxCanvasPixels>0){const e=this.outputScale;(Math.floor(this.viewport.width)*e.sx|0)*(Math.floor(this.viewport.height)*e.sy|0)>this.maxCanvasPixels&&(a=!0)}if(this.canvas){if(this.useOnlyCssZoom||this.hasRestrictedScaling&&a)return this.cssTransform({target:this.canvas,redrawAnnotationLayer:!0,redrawXfaLayer:!0}),void this.eventBus.dispatch("pagerendered",{source:this,pageNumber:this.id,cssTransform:!0,timestamp:performance.now(),error:this._renderError});this.zoomLayer||this.canvas.hidden||(this.zoomLayer=this.canvas.parentNode,this.zoomLayer.style.position="absolute")}this.zoomLayer&&this.cssTransform({target:this.zoomLayer.firstChild}),this.reset({keepZoomLayer:!0,keepAnnotationLayer:!0,keepXfaLayer:!0})}cancelRendering({keepAnnotationLayer:e=!1,keepXfaLayer:t=!1}={}){this.paintTask&&(this.paintTask.cancel(),this.paintTask=null),this.resume=null,this.textLayer&&(this.textLayer.cancel(),this.textLayer=null),!this.annotationLayer||e&&this.annotationLayer.div||(this.annotationLayer.cancel(),this.annotationLayer=null),!this.xfaLayer||t&&this.xfaLayer.div||(this.xfaLayer.cancel(),this.xfaLayer=null,this.textHighlighter?.disable()),this._onTextLayerRendered&&(this.eventBus._off("textlayerrendered",this._onTextLayerRendered),this._onTextLayerRendered=null)}cssTransform({target:e,redrawAnnotationLayer:t=!1,redrawXfaLayer:i=!1}){const s=this.viewport.width,a=this.viewport.height,n=this.div;e.style.width=e.parentNode.style.width=n.style.width=Math.floor(s)+"px",e.style.height=e.parentNode.style.height=n.style.height=Math.floor(a)+"px";const r=this.viewport.rotation-this.paintedViewportMap.get(e).rotation,o=Math.abs(r);let h=1,d=1;if(90!==o&&270!==o||(h=a/s,d=s/a),e.style.transform=`rotate(${r}deg) scale(${h}, ${d})`,this.textLayer){const e=this.textLayer.viewport,t=this.viewport.rotation-e.rotation,i=Math.abs(t);let a=s/e.width;90!==i&&270!==i||(a=s/e.height);const n=this.textLayer.textLayerDiv;let r,o;switch(i){case 0:r=o=0;break;case 90:r=0,o="-"+n.style.height;break;case 180:r="-"+n.style.width,o="-"+n.style.height;break;case 270:r="-"+n.style.width,o=0;break;default:console.error("Bad rotation value.");break}n.style.transform=`rotate(${i}deg) scale(${a}) translate(${r}, ${o})`,n.style.transformOrigin="0% 0%"}t&&this.annotationLayer&&this._renderAnnotationLayer(),i&&this.xfaLayer&&this._renderXfaLayer()}get width(){return this.viewport.width}get height(){return this.viewport.height}getPagePoint(e,t){return this.viewport.convertToPdfPoint(e,t)}draw(){this.renderingState!==_pdf_rendering_queue.RenderingStates.INITIAL&&(console.error("Must be in new state before drawing"),this.reset());const{div:e,pdfPage:t}=this;if(!t)return this.renderingState=_pdf_rendering_queue.RenderingStates.FINISHED,this.loadingIconDiv&&(e.removeChild(this.loadingIconDiv),delete this.loadingIconDiv),Promise.reject(new Error("pdfPage is not loaded"));this.renderingState=_pdf_rendering_queue.RenderingStates.RUNNING;const i=document.createElement("div");i.style.width=e.style.width,i.style.height=e.style.height,i.classList.add("canvasWrapper"),this.annotationLayer?.div?e.insertBefore(i,this.annotationLayer.div):e.appendChild(i);let s=null;if(this.textLayerMode!==_ui_utils.TextLayerMode.DISABLE&&this.textLayerFactory){const t=document.createElement("div");t.className="textLayer",t.style.width=i.style.width,t.style.height=i.style.height,this.annotationLayer?.div?e.insertBefore(t,this.annotationLayer.div):e.appendChild(t),s=this.textLayerFactory.createTextLayerBuilder(t,this.id-1,this.viewport,this.textLayerMode===_ui_utils.TextLayerMode.ENABLE_ENHANCE,this.eventBus,this.textHighlighter)}this.textLayer=s,this.xfaLayer?.div&&e.appendChild(this.xfaLayer.div);let a=null;this.renderingQueue&&(a=e=>{if(!this.renderingQueue.isHighestPriority(this))return this.renderingState=_pdf_rendering_queue.RenderingStates.PAUSED,void(this.resume=()=>{this.renderingState=_pdf_rendering_queue.RenderingStates.RUNNING,e()});e()});const n=async(t=null)=>{if(r===this.paintTask&&(this.paintTask=null),t instanceof _pdf.RenderingCancelledException)this._renderError=null;else if(this._renderError=t,this.renderingState=_pdf_rendering_queue.RenderingStates.FINISHED,this.loadingIconDiv&&(e.removeChild(this.loadingIconDiv),delete this.loadingIconDiv),this._resetZoomLayer(!0),this.eventBus.dispatch("pagerendered",{source:this,pageNumber:this.id,cssTransform:!1,timestamp:performance.now(),error:this._renderError}),t)throw t},r=this.renderer===_ui_utils.RendererType.SVG?this.paintOnSvg(i):this.paintOnCanvas(i);r.onRenderContinue=a,this.paintTask=r;const o=r.promise.then((()=>n(null).then((()=>{if(s){const e=t.streamTextContent({normalizeWhitespace:!0,includeMarkedContent:!0});s.setTextContentStream(e),s.render()}}))),(function(e){return n(e)}));return this._annotationMode!==_pdf.AnnotationMode.DISABLE&&this.annotationLayerFactory&&(this.annotationLayer||(this.annotationLayer=this.annotationLayerFactory.createAnnotationLayerBuilder(e,t,null,this.imageResourcesPath,this._annotationMode===_pdf.AnnotationMode.ENABLE_FORMS,this.l10n,null,null,null,null)),this._renderAnnotationLayer()),this.xfaLayerFactory&&(this.xfaLayer||(this.xfaLayer=this.xfaLayerFactory.createXfaLayerBuilder(e,t,null)),this._renderXfaLayer()),this.structTreeLayerFactory&&this.textLayer&&this.canvas&&(this._onTextLayerRendered=e=>{e.pageNumber===this.id&&(this.eventBus._off("textlayerrendered",this._onTextLayerRendered),this._onTextLayerRendered=null,this.canvas&&this.pdfPage.getStructTree().then((e=>{if(!e)return;if(!this.canvas)return;const t=this.structTreeLayer.render(e);t.classList.add("structTree"),this.canvas.appendChild(t)})))},this.eventBus._on("textlayerrendered",this._onTextLayerRendered),this.structTreeLayer=this.structTreeLayerFactory.createStructTreeLayerBuilder(t)),e.setAttribute("data-loaded",!0),this.eventBus.dispatch("pagerender",{source:this,pageNumber:this.id}),o}paintOnCanvas(e){const t=(0,_pdf.createPromiseCapability)(),i={promise:t.promise,onRenderContinue(e){e()},cancel(){p.cancel()}},s=this.viewport,a=document.createElement("canvas");a.hidden=!0;let n=!0;const r=function(){n&&(a.hidden=!1,n=!1)};e.appendChild(a),this.canvas=a,a.mozOpaque=!0;const o=a.getContext("2d",{alpha:!1}),h=(0,_ui_utils.getOutputScale)(o);if(this.outputScale=h,this.useOnlyCssZoom){const e=s.clone({scale:_pdf.PixelsPerInch.PDF_TO_CSS_UNITS});h.sx*=e.width/s.width,h.sy*=e.height/s.height,h.scaled=!0}if(this.maxCanvasPixels>0){const e=s.width*s.height,t=Math.sqrt(this.maxCanvasPixels/e);h.sx>t||h.sy>t?(h.sx=t,h.sy=t,h.scaled=!0,this.hasRestrictedScaling=!0):this.hasRestrictedScaling=!1}const d=(0,_ui_utils.approximateFraction)(h.sx),l=(0,_ui_utils.approximateFraction)(h.sy);a.width=(0,_ui_utils.roundToDivide)(s.width*h.sx,d[0]),a.height=(0,_ui_utils.roundToDivide)(s.height*h.sy,l[0]),a.style.width=(0,_ui_utils.roundToDivide)(s.width,d[1])+"px",a.style.height=(0,_ui_utils.roundToDivide)(s.height,l[1])+"px",this.paintedViewportMap.set(a,s);const c=h.scaled?[h.sx,0,0,h.sy,0,0]:null,u={canvasContext:o,transform:c,viewport:this.viewport,annotationMode:this._annotationMode,optionalContentConfigPromise:this._optionalContentConfigPromise},p=this.pdfPage.render(u);return p.onContinue=function(e){r(),i.onRenderContinue?i.onRenderContinue(e):e()},p.promise.then((function(){r(),t.resolve(void 0)}),(function(e){r(),t.reject(e)})),i}paintOnSvg(e){let t=!1;const i=()=>{if(t)throw new _pdf.RenderingCancelledException(`Rendering cancelled, page ${this.id}`,"svg")},s=this.pdfPage,a=this.viewport.clone({scale:_pdf.PixelsPerInch.PDF_TO_CSS_UNITS}),n=s.getOperatorList({annotationMode:this._annotationMode}).then((t=>{i();const n=new _pdf.SVGGraphics(s.commonObjs,s.objs,_app_options.compatibilityParams.disableCreateObjectURL);return n.getSVG(t,a).then((t=>{i(),this.svg=t,this.paintedViewportMap.set(t,a),t.style.width=e.style.width,t.style.height=e.style.height,this.renderingState=_pdf_rendering_queue.RenderingStates.FINISHED,e.appendChild(t)}))}));return{promise:n,onRenderContinue(e){e()},cancel(){t=!0}}}setPageLabel(e){this.pageLabel="string"===typeof e?e:null,null!==this.pageLabel?this.div.setAttribute("data-page-label",this.pageLabel):this.div.removeAttribute("data-page-label")}}exports.PDFPageView=PDFPageView;