"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CanvasGraphics=void 0;var _util=require("../shared/util"),_pattern_helper=require("./pattern_helper"),MIN_FONT_SIZE=16,MAX_FONT_SIZE=100,MAX_GROUP_SIZE=4096,MIN_WIDTH_FACTOR=.65,COMPILE_TYPE3_GLYPHS=!0,MAX_SIZE_TO_COMPILE=1e3,FULL_CHUNK_HEIGHT=16,IsLittleEndianCached={get value(){return(0,_util.shadow)(IsLittleEndianCached,"value",(0,_util.isLittleEndian)())}};function addContextCurrentTransform(t){t.mozCurrentTransform||(t._originalSave=t.save,t._originalRestore=t.restore,t._originalRotate=t.rotate,t._originalScale=t.scale,t._originalTranslate=t.translate,t._originalTransform=t.transform,t._originalSetTransform=t.setTransform,t._transformMatrix=t._transformMatrix||[1,0,0,1,0,0],t._transformStack=[],Object.defineProperty(t,"mozCurrentTransform",{get:function(){return this._transformMatrix}}),Object.defineProperty(t,"mozCurrentTransformInverse",{get:function(){var t=this._transformMatrix,e=t[0],i=t[1],a=t[2],r=t[3],n=t[4],s=t[5],o=e*r-i*a,h=i*a-e*r;return[r/o,i/h,a/h,e/o,(r*n-a*s)/h,(i*n-e*s)/o]}}),t.save=function(){var t=this._transformMatrix;this._transformStack.push(t),this._transformMatrix=t.slice(0,6),this._originalSave()},t.restore=function(){var t=this._transformStack.pop();t&&(this._transformMatrix=t,this._originalRestore())},t.translate=function(t,e){var i=this._transformMatrix;i[4]=i[0]*t+i[2]*e+i[4],i[5]=i[1]*t+i[3]*e+i[5],this._originalTranslate(t,e)},t.scale=function(t,e){var i=this._transformMatrix;i[0]=i[0]*t,i[1]=i[1]*t,i[2]=i[2]*e,i[3]=i[3]*e,this._originalScale(t,e)},t.transform=function(e,i,a,r,n,s){var o=this._transformMatrix;this._transformMatrix=[o[0]*e+o[2]*i,o[1]*e+o[3]*i,o[0]*a+o[2]*r,o[1]*a+o[3]*r,o[0]*n+o[2]*s+o[4],o[1]*n+o[3]*s+o[5]],t._originalTransform(e,i,a,r,n,s)},t.setTransform=function(e,i,a,r,n,s){this._transformMatrix=[e,i,a,r,n,s],t._originalSetTransform(e,i,a,r,n,s)},t.rotate=function(t){var e=Math.cos(t),i=Math.sin(t),a=this._transformMatrix;this._transformMatrix=[a[0]*e+a[2]*i,a[1]*e+a[3]*i,a[0]*-i+a[2]*e,a[1]*-i+a[3]*e,a[4],a[5]],this._originalRotate(t)})}var CachedCanvases=function(){function t(t){this.canvasFactory=t,this.cache=Object.create(null)}return t.prototype={getCanvas:function(t,e,i,a){var r;return void 0!==this.cache[t]?(r=this.cache[t],this.canvasFactory.reset(r,e,i),r.context.setTransform(1,0,0,1,0,0)):(r=this.canvasFactory.create(e,i),this.cache[t]=r),a&&addContextCurrentTransform(r.context),r},clear:function(){for(var t in this.cache){var e=this.cache[t];this.canvasFactory.destroy(e),delete this.cache[t]}}},t}();function compileType3Glyph(t){var e,i,a,r,n=1e3,s=t.width,o=t.height,h=s+1,l=new Uint8Array(h*(o+1)),c=new Uint8Array([0,2,4,0,1,0,5,4,8,10,0,8,0,2,1,0]),u=s+7&-8,f=t.data,p=new Uint8Array(u*o),g=0;for(e=0,r=f.length;e<r;e++){var v=128,m=f[e];while(v>0)p[g++]=m&v?0:255,v>>=1}var d=0;for(g=0,0!==p[g]&&(l[0]=1,++d),i=1;i<s;i++)p[g]!==p[g+1]&&(l[i]=p[g]?2:1,++d),g++;for(0!==p[g]&&(l[i]=2,++d),e=1;e<o;e++){g=e*u,a=e*h,p[g-u]!==p[g]&&(l[a]=p[g]?1:8,++d);var x=(p[g]?4:0)+(p[g-u]?8:0);for(i=1;i<s;i++)x=(x>>2)+(p[g+1]?4:0)+(p[g-u+1]?8:0),c[x]&&(l[a+i]=c[x],++d),g++;if(p[g-u]!==p[g]&&(l[a+i]=p[g]?2:4,++d),d>n)return null}for(g=u*(o-1),a=e*h,0!==p[g]&&(l[a]=8,++d),i=1;i<s;i++)p[g]!==p[g+1]&&(l[a+i]=p[g]?4:8,++d),g++;if(0!==p[g]&&(l[a+i]=4,++d),d>n)return null;var _=new Int32Array([0,h,-1,0,-h,0,0,0,1]),S=[];for(e=0;d&&e<=o;e++){var T=e*h,C=T+s;while(T<C&&!l[T])T++;if(T!==C){var M,k=[T%h,e],I=l[T],b=T;do{var y=_[I];do{T+=y}while(!l[T]);M=l[T],5!==M&&10!==M?(I=M,l[T]=0):(I=M&51*I>>4,l[T]&=I>>2|I<<2),k.push(T%h),k.push(T/h|0),--d}while(b!==T);S.push(k),--e}}var L=function(t){t.save(),t.scale(1/s,-1/o),t.translate(0,-o),t.beginPath();for(var e=0,i=S.length;e<i;e++){var a=S[e];t.moveTo(a[0],a[1]);for(var r=2,n=a.length;r<n;r+=2)t.lineTo(a[r],a[r+1])}t.fill(),t.beginPath(),t.restore()};return L}var CanvasExtraState=function(){function t(){this.alphaIsShape=!1,this.fontSize=0,this.fontSizeScale=1,this.textMatrix=_util.IDENTITY_MATRIX,this.textMatrixScale=1,this.fontMatrix=_util.FONT_IDENTITY_MATRIX,this.leading=0,this.x=0,this.y=0,this.lineX=0,this.lineY=0,this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRenderingMode=_util.TextRenderingMode.FILL,this.textRise=0,this.fillColor="#000000",this.strokeColor="#000000",this.patternFill=!1,this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.activeSMask=null,this.resumeSMaskCtx=null}return t.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(t,e){this.x=t,this.y=e}},t}(),CanvasGraphics=function(){var t=15,e=10;function i(t,e,i,a,r,n){this.ctx=t,this.current=new CanvasExtraState,this.stateStack=[],this.pendingClip=null,this.pendingEOFill=!1,this.res=null,this.xobjs=null,this.commonObjs=e,this.objs=i,this.canvasFactory=a,this.webGLContext=r,this.imageLayer=n,this.groupStack=[],this.processingType3=null,this.baseTransform=null,this.baseTransformStack=[],this.groupLevel=0,this.smaskStack=[],this.smaskCounter=0,this.tempSMask=null,this.cachedCanvases=new CachedCanvases(this.canvasFactory),t&&addContextCurrentTransform(t),this._cachedGetSinglePixelWidth=null}function a(t,e){if("undefined"!==typeof ImageData&&e instanceof ImageData)t.putImageData(e,0,0);else{var i,a,r,n,s,o=e.height,h=e.width,l=o%FULL_CHUNK_HEIGHT,c=(o-l)/FULL_CHUNK_HEIGHT,u=0===l?c:c+1,f=t.createImageData(h,FULL_CHUNK_HEIGHT),p=0,g=e.data,v=f.data;if(e.kind===_util.ImageKind.GRAYSCALE_1BPP){var m=g.byteLength,d=new Uint32Array(v.buffer,0,v.byteLength>>2),x=d.length,_=h+7>>3,S=4294967295,T=IsLittleEndianCached.value?4278190080:255;for(a=0;a<u;a++){for(n=a<c?FULL_CHUNK_HEIGHT:l,i=0,r=0;r<n;r++){for(var C=m-p,M=0,k=C>_?h:8*C-7,I=-8&k,b=0,y=0;M<I;M+=8)y=g[p++],d[i++]=128&y?S:T,d[i++]=64&y?S:T,d[i++]=32&y?S:T,d[i++]=16&y?S:T,d[i++]=8&y?S:T,d[i++]=4&y?S:T,d[i++]=2&y?S:T,d[i++]=1&y?S:T;for(;M<k;M++)0===b&&(y=g[p++],b=128),d[i++]=y&b?S:T,b>>=1}while(i<x)d[i++]=0;t.putImageData(f,0,a*FULL_CHUNK_HEIGHT)}}else if(e.kind===_util.ImageKind.RGBA_32BPP){for(r=0,s=h*FULL_CHUNK_HEIGHT*4,a=0;a<c;a++)v.set(g.subarray(p,p+s)),p+=s,t.putImageData(f,0,r),r+=FULL_CHUNK_HEIGHT;a<u&&(s=h*l*4,v.set(g.subarray(p,p+s)),t.putImageData(f,0,r))}else{if(e.kind!==_util.ImageKind.RGB_24BPP)throw new Error("bad image kind: "+e.kind);for(n=FULL_CHUNK_HEIGHT,s=h*n,a=0;a<u;a++){for(a>=c&&(n=l,s=h*n),i=0,r=s;r--;)v[i++]=g[p++],v[i++]=g[p++],v[i++]=g[p++],v[i++]=255;t.putImageData(f,0,a*FULL_CHUNK_HEIGHT)}}}}function r(t,e){for(var i=e.height,a=e.width,r=i%FULL_CHUNK_HEIGHT,n=(i-r)/FULL_CHUNK_HEIGHT,s=0===r?n:n+1,o=t.createImageData(a,FULL_CHUNK_HEIGHT),h=0,l=e.data,c=o.data,u=0;u<s;u++){for(var f=u<n?FULL_CHUNK_HEIGHT:r,p=3,g=0;g<f;g++)for(var v=0,m=0;m<a;m++){if(!v){var d=l[h++];v=128}c[p]=d&v?0:255,p+=4,v>>=1}t.putImageData(o,0,u*FULL_CHUNK_HEIGHT)}}function n(t,e){for(var i=["strokeStyle","fillStyle","fillRule","globalAlpha","lineWidth","lineCap","lineJoin","miterLimit","globalCompositeOperation","font"],a=0,r=i.length;a<r;a++){var n=i[a];void 0!==t[n]&&(e[n]=t[n])}void 0!==t.setLineDash&&(e.setLineDash(t.getLineDash()),e.lineDashOffset=t.lineDashOffset)}function s(t){t.strokeStyle="#000000",t.fillStyle="#000000",t.fillRule="nonzero",t.globalAlpha=1,t.lineWidth=1,t.lineCap="butt",t.lineJoin="miter",t.miterLimit=10,t.globalCompositeOperation="source-over",t.font="10px sans-serif",void 0!==t.setLineDash&&(t.setLineDash([]),t.lineDashOffset=0)}function o(t,e,i,a){for(var r=t.length,n=3;n<r;n+=4){var s=t[n];if(0===s)t[n-3]=e,t[n-2]=i,t[n-1]=a;else if(s<255){var o=255-s;t[n-3]=t[n-3]*s+e*o>>8,t[n-2]=t[n-2]*s+i*o>>8,t[n-1]=t[n-1]*s+a*o>>8}}}function h(t,e,i){for(var a=t.length,r=1/255,n=3;n<a;n+=4){var s=i?i[t[n]]:t[n];e[n]=e[n]*s*r|0}}function l(t,e,i){for(var a=t.length,r=3;r<a;r+=4){var n=77*t[r-3]+152*t[r-2]+28*t[r-1];e[r]=i?e[r]*i[n>>8]>>8:e[r]*n>>16}}function c(t,e,i,a,r,n,s){var c,u=!!n,f=u?n[0]:0,p=u?n[1]:0,g=u?n[2]:0;c="Luminosity"===r?l:h;for(var v=1048576,m=Math.min(a,Math.ceil(v/i)),d=0;d<a;d+=m){var x=Math.min(m,a-d),_=t.getImageData(0,d,i,x),S=e.getImageData(0,d,i,x);u&&o(_.data,f,p,g),c(_.data,S.data,s),t.putImageData(S,0,d)}}function u(t,e,i,a){var r=e.canvas,n=e.context;t.setTransform(e.scaleX,0,0,e.scaleY,e.offsetX,e.offsetY);var s=e.backdrop||null;if(!e.transferMap&&a.isEnabled){var o=a.composeSMask({layer:i.canvas,mask:r,properties:{subtype:e.subtype,backdrop:s}});return t.setTransform(1,0,0,1,0,0),void t.drawImage(o,e.offsetX,e.offsetY)}c(n,i,r.width,r.height,e.subtype,s,e.transferMap),t.drawImage(r,0,0)}var f=["butt","round","square"],p=["miter","round","bevel"],g={},v={};for(var m in i.prototype={beginDrawing:function(t){var e=t.transform,i=t.viewport,a=t.transparency,r=t.background,n=void 0===r?null:r,o=this.ctx.canvas.width,h=this.ctx.canvas.height;if(this.ctx.save(),this.ctx.fillStyle=n||"rgb(255, 255, 255)",this.ctx.fillRect(0,0,o,h),this.ctx.restore(),a){var l=this.cachedCanvases.getCanvas("transparent",o,h,!0);this.compositeCtx=this.ctx,this.transparentCanvas=l.canvas,this.ctx=l.context,this.ctx.save(),this.ctx.transform.apply(this.ctx,this.compositeCtx.mozCurrentTransform)}this.ctx.save(),s(this.ctx),e&&this.ctx.transform.apply(this.ctx,e),this.ctx.transform.apply(this.ctx,i.transform),this.baseTransform=this.ctx.mozCurrentTransform.slice(),this.imageLayer&&this.imageLayer.beginLayout()},executeOperatorList:function(i,a,r,n){var s=i.argsArray,o=i.fnArray,h=a||0,l=s.length;if(l===h)return h;var c,u=l-h>e&&"function"===typeof r,f=u?Date.now()+t:0,p=0,g=this.commonObjs,v=this.objs;while(1){if(void 0!==n&&h===n.nextBreakPoint)return n.breakIt(h,r),h;if(c=o[h],c!==_util.OPS.dependency)this[c].apply(this,s[h]);else for(var m=s[h],d=0,x=m.length;d<x;d++){var _=m[d],S="g"===_[0]&&"_"===_[1],T=S?g:v;if(!T.isResolved(_))return T.get(_,r),h}if(h++,h===l)return h;if(u&&++p>e){if(Date.now()>f)return r(),h;p=0}}},endDrawing:function(){null!==this.current.activeSMask&&this.endSMaskGroup(),this.ctx.restore(),this.transparentCanvas&&(this.ctx=this.compositeCtx,this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.drawImage(this.transparentCanvas,0,0),this.ctx.restore(),this.transparentCanvas=null),this.cachedCanvases.clear(),this.webGLContext.clear(),this.imageLayer&&this.imageLayer.endLayout()},setLineWidth:function(t){this.current.lineWidth=t,this.ctx.lineWidth=t},setLineCap:function(t){this.ctx.lineCap=f[t]},setLineJoin:function(t){this.ctx.lineJoin=p[t]},setMiterLimit:function(t){this.ctx.miterLimit=t},setDash:function(t,e){var i=this.ctx;void 0!==i.setLineDash&&(i.setLineDash(t),i.lineDashOffset=e)},setRenderingIntent:function(t){},setFlatness:function(t){},setGState:function(t){for(var e=0,i=t.length;e<i;e++){var a=t[e],r=a[0],n=a[1];switch(r){case"LW":this.setLineWidth(n);break;case"LC":this.setLineCap(n);break;case"LJ":this.setLineJoin(n);break;case"ML":this.setMiterLimit(n);break;case"D":this.setDash(n[0],n[1]);break;case"RI":this.setRenderingIntent(n);break;case"FL":this.setFlatness(n);break;case"Font":this.setFont(n[0],n[1]);break;case"CA":this.current.strokeAlpha=a[1];break;case"ca":this.current.fillAlpha=a[1],this.ctx.globalAlpha=a[1];break;case"BM":this.ctx.globalCompositeOperation=n;break;case"SMask":this.current.activeSMask&&(this.stateStack.length>0&&this.stateStack[this.stateStack.length-1].activeSMask===this.current.activeSMask?this.suspendSMaskGroup():this.endSMaskGroup()),this.current.activeSMask=n?this.tempSMask:null,this.current.activeSMask&&this.beginSMaskGroup(),this.tempSMask=null;break}}},beginSMaskGroup:function(){var t=this.current.activeSMask,e=t.canvas.width,i=t.canvas.height,a="smaskGroupAt"+this.groupLevel,r=this.cachedCanvases.getCanvas(a,e,i,!0),s=this.ctx,o=s.mozCurrentTransform;this.ctx.save();var h=r.context;h.scale(1/t.scaleX,1/t.scaleY),h.translate(-t.offsetX,-t.offsetY),h.transform.apply(h,o),t.startTransformInverse=h.mozCurrentTransformInverse,n(s,h),this.ctx=h,this.setGState([["BM","source-over"],["ca",1],["CA",1]]),this.groupStack.push(s),this.groupLevel++},suspendSMaskGroup:function(){var t=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),u(this.ctx,this.current.activeSMask,t,this.webGLContext),this.ctx.restore(),this.ctx.save(),n(t,this.ctx),this.current.resumeSMaskCtx=t;var e=_util.Util.transform(this.current.activeSMask.startTransformInverse,t.mozCurrentTransform);this.ctx.transform.apply(this.ctx,e),t.save(),t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,t.canvas.width,t.canvas.height),t.restore()},resumeSMaskGroup:function(){var t=this.current.resumeSMaskCtx,e=this.ctx;this.ctx=t,this.groupStack.push(e),this.groupLevel++},endSMaskGroup:function(){var t=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),u(this.ctx,this.current.activeSMask,t,this.webGLContext),this.ctx.restore(),n(t,this.ctx);var e=_util.Util.transform(this.current.activeSMask.startTransformInverse,t.mozCurrentTransform);this.ctx.transform.apply(this.ctx,e)},save:function(){this.ctx.save();var t=this.current;this.stateStack.push(t),this.current=t.clone(),this.current.resumeSMaskCtx=null},restore:function(){this.current.resumeSMaskCtx&&this.resumeSMaskGroup(),null===this.current.activeSMask||0!==this.stateStack.length&&this.stateStack[this.stateStack.length-1].activeSMask===this.current.activeSMask||this.endSMaskGroup(),0!==this.stateStack.length&&(this.current=this.stateStack.pop(),this.ctx.restore(),this.pendingClip=null,this._cachedGetSinglePixelWidth=null)},transform:function(t,e,i,a,r,n){this.ctx.transform(t,e,i,a,r,n),this._cachedGetSinglePixelWidth=null},constructPath:function(t,e){for(var i=this.ctx,a=this.current,r=a.x,n=a.y,s=0,o=0,h=t.length;s<h;s++)switch(0|t[s]){case _util.OPS.rectangle:r=e[o++],n=e[o++];var l=e[o++],c=e[o++];0===l&&(l=this.getSinglePixelWidth()),0===c&&(c=this.getSinglePixelWidth());var u=r+l,f=n+c;this.ctx.moveTo(r,n),this.ctx.lineTo(u,n),this.ctx.lineTo(u,f),this.ctx.lineTo(r,f),this.ctx.lineTo(r,n),this.ctx.closePath();break;case _util.OPS.moveTo:r=e[o++],n=e[o++],i.moveTo(r,n);break;case _util.OPS.lineTo:r=e[o++],n=e[o++],i.lineTo(r,n);break;case _util.OPS.curveTo:r=e[o+4],n=e[o+5],i.bezierCurveTo(e[o],e[o+1],e[o+2],e[o+3],r,n),o+=6;break;case _util.OPS.curveTo2:i.bezierCurveTo(r,n,e[o],e[o+1],e[o+2],e[o+3]),r=e[o+2],n=e[o+3],o+=4;break;case _util.OPS.curveTo3:r=e[o+2],n=e[o+3],i.bezierCurveTo(e[o],e[o+1],r,n,r,n),o+=4;break;case _util.OPS.closePath:i.closePath();break}a.setCurrentPoint(r,n)},closePath:function(){this.ctx.closePath()},stroke:function(t){t="undefined"===typeof t||t;var e=this.ctx,i=this.current.strokeColor;e.lineWidth=Math.max(this.getSinglePixelWidth()*MIN_WIDTH_FACTOR,this.current.lineWidth),e.globalAlpha=this.current.strokeAlpha,i&&i.hasOwnProperty("type")&&"Pattern"===i.type?(e.save(),e.strokeStyle=i.getPattern(e,this),e.stroke(),e.restore()):e.stroke(),t&&this.consumePath(),e.globalAlpha=this.current.fillAlpha},closeStroke:function(){this.closePath(),this.stroke()},fill:function(t){t="undefined"===typeof t||t;var e=this.ctx,i=this.current.fillColor,a=this.current.patternFill,r=!1;a&&(e.save(),this.baseTransform&&e.setTransform.apply(e,this.baseTransform),e.fillStyle=i.getPattern(e,this),r=!0),this.pendingEOFill?(e.fill("evenodd"),this.pendingEOFill=!1):e.fill(),r&&e.restore(),t&&this.consumePath()},eoFill:function(){this.pendingEOFill=!0,this.fill()},fillStroke:function(){this.fill(!1),this.stroke(!1),this.consumePath()},eoFillStroke:function(){this.pendingEOFill=!0,this.fillStroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},closeEOFillStroke:function(){this.pendingEOFill=!0,this.closePath(),this.fillStroke()},endPath:function(){this.consumePath()},clip:function(){this.pendingClip=g},eoClip:function(){this.pendingClip=v},beginText:function(){this.current.textMatrix=_util.IDENTITY_MATRIX,this.current.textMatrixScale=1,this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},endText:function(){var t=this.pendingTextPaths,e=this.ctx;if(void 0!==t){e.save(),e.beginPath();for(var i=0;i<t.length;i++){var a=t[i];e.setTransform.apply(e,a.transform),e.translate(a.x,a.y),a.addToPath(e,a.fontSize)}e.restore(),e.clip(),e.beginPath(),delete this.pendingTextPaths}else e.beginPath()},setCharSpacing:function(t){this.current.charSpacing=t},setWordSpacing:function(t){this.current.wordSpacing=t},setHScale:function(t){this.current.textHScale=t/100},setLeading:function(t){this.current.leading=-t},setFont:function(t,e){var i=this.commonObjs.get(t),a=this.current;if(!i)throw new Error("Can't find font for "+t);if(a.fontMatrix=i.fontMatrix?i.fontMatrix:_util.FONT_IDENTITY_MATRIX,0!==a.fontMatrix[0]&&0!==a.fontMatrix[3]||(0,_util.warn)("Invalid font matrix for font "+t),e<0?(e=-e,a.fontDirection=-1):a.fontDirection=1,this.current.font=i,this.current.fontSize=e,!i.isType3Font){var r=i.loadedName||"sans-serif",n=i.black?"900":i.bold?"bold":"normal",s=i.italic?"italic":"normal",o='"'+r+'", '+i.fallbackName,h=e<MIN_FONT_SIZE?MIN_FONT_SIZE:e>MAX_FONT_SIZE?MAX_FONT_SIZE:e;this.current.fontSizeScale=e/h;var l=s+" "+n+" "+h+"px "+o;this.ctx.font=l}},setTextRenderingMode:function(t){this.current.textRenderingMode=t},setTextRise:function(t){this.current.textRise=t},moveText:function(t,e){this.current.x=this.current.lineX+=t,this.current.y=this.current.lineY+=e},setLeadingMoveText:function(t,e){this.setLeading(-e),this.moveText(t,e)},setTextMatrix:function(t,e,i,a,r,n){this.current.textMatrix=[t,e,i,a,r,n],this.current.textMatrixScale=Math.sqrt(t*t+e*e),this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},nextLine:function(){this.moveText(0,this.current.leading)},paintChar:function(t,e,i,a){var r,n=this.ctx,s=this.current,o=s.font,h=s.textRenderingMode,l=s.fontSize/s.fontSizeScale,c=h&_util.TextRenderingMode.FILL_STROKE_MASK,u=!!(h&_util.TextRenderingMode.ADD_TO_PATH_FLAG),f=s.patternFill&&o.data;if((o.disableFontFace||u||f)&&(r=o.getPathGenerator(this.commonObjs,t)),o.disableFontFace||f?(n.save(),n.translate(e,i),n.beginPath(),r(n,l),a&&n.setTransform.apply(n,a),c!==_util.TextRenderingMode.FILL&&c!==_util.TextRenderingMode.FILL_STROKE||n.fill(),c!==_util.TextRenderingMode.STROKE&&c!==_util.TextRenderingMode.FILL_STROKE||n.stroke(),n.restore()):(c!==_util.TextRenderingMode.FILL&&c!==_util.TextRenderingMode.FILL_STROKE||n.fillText(t,e,i),c!==_util.TextRenderingMode.STROKE&&c!==_util.TextRenderingMode.FILL_STROKE||n.strokeText(t,e,i)),u){var p=this.pendingTextPaths||(this.pendingTextPaths=[]);p.push({transform:n.mozCurrentTransform,x:e,y:i,fontSize:l,addToPath:r})}},get isFontSubpixelAAEnabled(){var t=this.canvasFactory.create(10,10).context;t.scale(1.5,1),t.fillText("I",0,10);for(var e=t.getImageData(0,0,10,10).data,i=!1,a=3;a<e.length;a+=4)if(e[a]>0&&e[a]<255){i=!0;break}return(0,_util.shadow)(this,"isFontSubpixelAAEnabled",i)},showText:function(t){var e=this.current,i=e.font;if(i.isType3Font)return this.showType3Text(t);var a=e.fontSize;if(0!==a){var r=this.ctx,n=e.fontSizeScale,s=e.charSpacing,o=e.wordSpacing,h=e.fontDirection,l=e.textHScale*h,c=t.length,u=i.vertical,f=u?1:-1,p=i.defaultVMetrics,g=a*e.fontMatrix[0],v=e.textRenderingMode===_util.TextRenderingMode.FILL&&!i.disableFontFace&&!e.patternFill;r.save();var m=void 0;if(e.patternFill){r.save();var d=e.fillColor.getPattern(r,this);m=r.mozCurrentTransform,r.restore(),r.fillStyle=d}r.transform.apply(r,e.textMatrix),r.translate(e.x,e.y+e.textRise),h>0?r.scale(l,-1):r.scale(l,1);var x=e.lineWidth,_=e.textMatrixScale;if(0===_||0===x){var S=e.textRenderingMode&_util.TextRenderingMode.FILL_STROKE_MASK;S!==_util.TextRenderingMode.STROKE&&S!==_util.TextRenderingMode.FILL_STROKE||(this._cachedGetSinglePixelWidth=null,x=this.getSinglePixelWidth()*MIN_WIDTH_FACTOR)}else x/=_;1!==n&&(r.scale(n,n),x/=n),r.lineWidth=x;var T,C=0;for(T=0;T<c;++T){var M=t[T];if((0,_util.isNum)(M))C+=f*M*a/1e3;else{var k,I,b,y,L,P,O,F=!1,w=(M.isSpace?o:0)+s,E=M.fontChar,R=M.accent,A=M.width;if(u)L=M.vmetric||p,P=M.vmetric?L[1]:.5*A,P=-P*g,O=L[2]*g,A=L?-L[0]:A,k=P/n,I=(C+O)/n;else k=C/n,I=0;if(i.remeasure&&A>0){var G=1e3*r.measureText(E).width/a*n;if(A<G&&this.isFontSubpixelAAEnabled){var H=A/G;F=!0,r.save(),r.scale(H,1),k/=H}else A!==G&&(k+=(A-G)/2e3*a/n)}(M.isInFont||i.missingFile)&&(v&&!R?r.fillText(E,k,I):(this.paintChar(E,k,I,m),R&&(b=k+R.offset.x/n,y=I-R.offset.y/n,this.paintChar(R.fontChar,b,y,m))));var D=A*g+w*h;C+=D,F&&r.restore()}}u?e.y-=C*l:e.x+=C*l,r.restore()}},showType3Text:function(t){var e,i,a,r,n=this.ctx,s=this.current,o=s.font,h=s.fontSize,l=s.fontDirection,c=o.vertical?1:-1,u=s.charSpacing,f=s.wordSpacing,p=s.textHScale*l,g=s.fontMatrix||_util.FONT_IDENTITY_MATRIX,v=t.length,m=s.textRenderingMode===_util.TextRenderingMode.INVISIBLE;if(!m&&0!==h){for(this._cachedGetSinglePixelWidth=null,n.save(),n.transform.apply(n,s.textMatrix),n.translate(s.x,s.y),n.scale(p,l),e=0;e<v;++e)if(i=t[e],(0,_util.isNum)(i))r=c*i*h/1e3,this.ctx.translate(r,0),s.x+=r*p;else{var d=(i.isSpace?f:0)+u,x=o.charProcOperatorList[i.operatorListId];if(x){this.processingType3=i,this.save(),n.scale(h,h),n.transform.apply(n,g),this.executeOperatorList(x),this.restore();var _=_util.Util.applyTransform([i.width,0],g);a=_[0]*h+d,n.translate(a,0),s.x+=a*p}else(0,_util.warn)('Type3 character "'+i.operatorListId+'" is not available.')}n.restore(),this.processingType3=null}},setCharWidth:function(t,e){},setCharWidthAndBounds:function(t,e,i,a,r,n){this.ctx.rect(i,a,r-i,n-a),this.clip(),this.endPath()},getColorN_Pattern:function(t){var e,a=this;if("TilingPattern"===t[0]){var r=t[1],n=this.baseTransform||this.ctx.mozCurrentTransform.slice(),s={createCanvasGraphics:function(t){return new i(t,a.commonObjs,a.objs,a.canvasFactory,a.webGLContext)}};e=new _pattern_helper.TilingPattern(t,r,this.ctx,s,n)}else e=(0,_pattern_helper.getShadingPatternFromIR)(t);return e},setStrokeColorN:function(){this.current.strokeColor=this.getColorN_Pattern(arguments)},setFillColorN:function(){this.current.fillColor=this.getColorN_Pattern(arguments),this.current.patternFill=!0},setStrokeRGBColor:function(t,e,i){var a=_util.Util.makeCssRgb(t,e,i);this.ctx.strokeStyle=a,this.current.strokeColor=a},setFillRGBColor:function(t,e,i){var a=_util.Util.makeCssRgb(t,e,i);this.ctx.fillStyle=a,this.current.fillColor=a,this.current.patternFill=!1},shadingFill:function(t){var e=this.ctx;this.save();var i=(0,_pattern_helper.getShadingPatternFromIR)(t);e.fillStyle=i.getPattern(e,this,!0);var a=e.mozCurrentTransformInverse;if(a){var r=e.canvas,n=r.width,s=r.height,o=_util.Util.applyTransform([0,0],a),h=_util.Util.applyTransform([0,s],a),l=_util.Util.applyTransform([n,0],a),c=_util.Util.applyTransform([n,s],a),u=Math.min(o[0],h[0],l[0],c[0]),f=Math.min(o[1],h[1],l[1],c[1]),p=Math.max(o[0],h[0],l[0],c[0]),g=Math.max(o[1],h[1],l[1],c[1]);this.ctx.fillRect(u,f,p-u,g-f)}else this.ctx.fillRect(-1e10,-1e10,2e10,2e10);this.restore()},beginInlineImage:function(){(0,_util.unreachable)("Should not call beginInlineImage")},beginImageData:function(){(0,_util.unreachable)("Should not call beginImageData")},paintFormXObjectBegin:function(t,e){if(this.save(),this.baseTransformStack.push(this.baseTransform),Array.isArray(t)&&6===t.length&&this.transform.apply(this,t),this.baseTransform=this.ctx.mozCurrentTransform,Array.isArray(e)&&4===e.length){var i=e[2]-e[0],a=e[3]-e[1];this.ctx.rect(e[0],e[1],i,a),this.clip(),this.endPath()}},paintFormXObjectEnd:function(){this.restore(),this.baseTransform=this.baseTransformStack.pop()},beginGroup:function(t){this.save();var e=this.ctx;t.isolated||(0,_util.info)("TODO: Support non-isolated groups."),t.knockout&&(0,_util.warn)("Knockout groups not supported.");var i=e.mozCurrentTransform;if(t.matrix&&e.transform.apply(e,t.matrix),!t.bbox)throw new Error("Bounding box is required.");var a=_util.Util.getAxialAlignedBoundingBox(t.bbox,e.mozCurrentTransform),r=[0,0,e.canvas.width,e.canvas.height];a=_util.Util.intersect(a,r)||[0,0,0,0];var s=Math.floor(a[0]),o=Math.floor(a[1]),h=Math.max(Math.ceil(a[2])-s,1),l=Math.max(Math.ceil(a[3])-o,1),c=1,u=1;h>MAX_GROUP_SIZE&&(c=h/MAX_GROUP_SIZE,h=MAX_GROUP_SIZE),l>MAX_GROUP_SIZE&&(u=l/MAX_GROUP_SIZE,l=MAX_GROUP_SIZE);var f="groupAt"+this.groupLevel;t.smask&&(f+="_smask_"+this.smaskCounter++%2);var p=this.cachedCanvases.getCanvas(f,h,l,!0),g=p.context;g.scale(1/c,1/u),g.translate(-s,-o),g.transform.apply(g,i),t.smask?this.smaskStack.push({canvas:p.canvas,context:g,offsetX:s,offsetY:o,scaleX:c,scaleY:u,subtype:t.smask.subtype,backdrop:t.smask.backdrop,transferMap:t.smask.transferMap||null,startTransformInverse:null}):(e.setTransform(1,0,0,1,0,0),e.translate(s,o),e.scale(c,u)),n(e,g),this.ctx=g,this.setGState([["BM","source-over"],["ca",1],["CA",1]]),this.groupStack.push(e),this.groupLevel++,this.current.activeSMask=null},endGroup:function(t){this.groupLevel--;var e=this.ctx;this.ctx=this.groupStack.pop(),void 0!==this.ctx.imageSmoothingEnabled?this.ctx.imageSmoothingEnabled=!1:this.ctx.mozImageSmoothingEnabled=!1,t.smask?this.tempSMask=this.smaskStack.pop():this.ctx.drawImage(e.canvas,0,0),this.restore()},beginAnnotations:function(){this.save(),this.baseTransform&&this.ctx.setTransform.apply(this.ctx,this.baseTransform)},endAnnotations:function(){this.restore()},beginAnnotation:function(t,e,i){if(this.save(),s(this.ctx),this.current=new CanvasExtraState,Array.isArray(t)&&4===t.length){var a=t[2]-t[0],r=t[3]-t[1];this.ctx.rect(t[0],t[1],a,r),this.clip(),this.endPath()}this.transform.apply(this,e),this.transform.apply(this,i)},endAnnotation:function(){this.restore()},paintJpegXObject:function(t,e,i){var a=this.objs.get(t);if(a){this.save();var r=this.ctx;if(r.scale(1/e,-1/i),r.drawImage(a,0,0,a.width,a.height,0,-i,e,i),this.imageLayer){var n=r.mozCurrentTransformInverse,s=this.getCanvasPosition(0,0);this.imageLayer.appendImage({objId:t,left:s[0],top:s[1],width:e/n[0],height:i/n[3]})}this.restore()}else(0,_util.warn)("Dependent image isn't ready yet")},paintImageMaskXObject:function(t){var e=this.ctx,i=t.width,a=t.height,n=this.current.fillColor,s=this.current.patternFill,o=this.processingType3;if(COMPILE_TYPE3_GLYPHS&&o&&void 0===o.compiled&&(o.compiled=i<=MAX_SIZE_TO_COMPILE&&a<=MAX_SIZE_TO_COMPILE?compileType3Glyph({data:t.data,width:i,height:a}):null),o&&o.compiled)o.compiled(e);else{var h=this.cachedCanvases.getCanvas("maskCanvas",i,a),l=h.context;l.save(),r(l,t),l.globalCompositeOperation="source-in",l.fillStyle=s?n.getPattern(l,this):n,l.fillRect(0,0,i,a),l.restore(),this.paintInlineImageXObject(h.canvas)}},paintImageMaskXObjectRepeat:function(t,e,i,a){var n=t.width,s=t.height,o=this.current.fillColor,h=this.current.patternFill,l=this.cachedCanvases.getCanvas("maskCanvas",n,s),c=l.context;c.save(),r(c,t),c.globalCompositeOperation="source-in",c.fillStyle=h?o.getPattern(c,this):o,c.fillRect(0,0,n,s),c.restore();for(var u=this.ctx,f=0,p=a.length;f<p;f+=2)u.save(),u.transform(e,0,0,i,a[f],a[f+1]),u.scale(1,-1),u.drawImage(l.canvas,0,0,n,s,0,-1,1,1),u.restore()},paintImageMaskXObjectGroup:function(t){for(var e=this.ctx,i=this.current.fillColor,a=this.current.patternFill,n=0,s=t.length;n<s;n++){var o=t[n],h=o.width,l=o.height,c=this.cachedCanvases.getCanvas("maskCanvas",h,l),u=c.context;u.save(),r(u,o),u.globalCompositeOperation="source-in",u.fillStyle=a?i.getPattern(u,this):i,u.fillRect(0,0,h,l),u.restore(),e.save(),e.transform.apply(e,o.transform),e.scale(1,-1),e.drawImage(c.canvas,0,0,h,l,0,-1,1,1),e.restore()}},paintImageXObject:function(t){var e=this.objs.get(t);e?this.paintInlineImageXObject(e):(0,_util.warn)("Dependent image isn't ready yet")},paintImageXObjectRepeat:function(t,e,i,a){var r=this.objs.get(t);if(r){for(var n=r.width,s=r.height,o=[],h=0,l=a.length;h<l;h+=2)o.push({transform:[e,0,0,i,a[h],a[h+1]],x:0,y:0,w:n,h:s});this.paintInlineImageXObjectGroup(r,o)}else(0,_util.warn)("Dependent image isn't ready yet")},paintInlineImageXObject:function(t){var e=t.width,i=t.height,r=this.ctx;this.save(),r.scale(1/e,-1/i);var n,s,o=r.mozCurrentTransformInverse,h=o[0],l=o[1],c=Math.max(Math.sqrt(h*h+l*l),1),u=o[2],f=o[3],p=Math.max(Math.sqrt(u*u+f*f),1);if("function"===typeof HTMLElement&&t instanceof HTMLElement||!t.data)n=t;else{s=this.cachedCanvases.getCanvas("inlineImage",e,i);var g=s.context;a(g,t),n=s.canvas}var v=e,m=i,d="prescale1";while(c>2&&v>1||p>2&&m>1){var x=v,_=m;c>2&&v>1&&(x=Math.ceil(v/2),c/=v/x),p>2&&m>1&&(_=Math.ceil(m/2),p/=m/_),s=this.cachedCanvases.getCanvas(d,x,_),g=s.context,g.clearRect(0,0,x,_),g.drawImage(n,0,0,v,m,0,0,x,_),n=s.canvas,v=x,m=_,d="prescale1"===d?"prescale2":"prescale1"}if(r.drawImage(n,0,0,v,m,0,-i,e,i),this.imageLayer){var S=this.getCanvasPosition(0,-i);this.imageLayer.appendImage({imgData:t,left:S[0],top:S[1],width:e/o[0],height:i/o[3]})}this.restore()},paintInlineImageXObjectGroup:function(t,e){var i=this.ctx,r=t.width,n=t.height,s=this.cachedCanvases.getCanvas("inlineImage",r,n),o=s.context;a(o,t);for(var h=0,l=e.length;h<l;h++){var c=e[h];if(i.save(),i.transform.apply(i,c.transform),i.scale(1,-1),i.drawImage(s.canvas,c.x,c.y,c.w,c.h,0,-1,1,1),this.imageLayer){var u=this.getCanvasPosition(c.x,c.y);this.imageLayer.appendImage({imgData:t,left:u[0],top:u[1],width:r,height:n})}i.restore()}},paintSolidColorImageMask:function(){this.ctx.fillRect(0,0,1,1)},paintXObject:function(){(0,_util.warn)("Unsupported 'paintXObject' command.")},markPoint:function(t){},markPointProps:function(t,e){},beginMarkedContent:function(t){},beginMarkedContentProps:function(t,e){},endMarkedContent:function(){},beginCompat:function(){},endCompat:function(){},consumePath:function(){var t=this.ctx;this.pendingClip&&(this.pendingClip===v?t.clip("evenodd"):t.clip(),this.pendingClip=null),t.beginPath()},getSinglePixelWidth:function(t){if(null===this._cachedGetSinglePixelWidth){var e=this.ctx.mozCurrentTransformInverse;this._cachedGetSinglePixelWidth=Math.sqrt(Math.max(e[0]*e[0]+e[1]*e[1],e[2]*e[2]+e[3]*e[3]))}return this._cachedGetSinglePixelWidth},getCanvasPosition:function(t,e){var i=this.ctx.mozCurrentTransform;return[i[0]*t+i[2]*e+i[4],i[1]*t+i[3]*e+i[5]]}},_util.OPS)i.prototype[_util.OPS[m]]=i.prototype[m];return i}();exports.CanvasGraphics=CanvasGraphics;