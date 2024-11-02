"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderTextLayer=void 0;var _util=require("../shared/util"),_global_scope=require("../shared/global_scope"),_global_scope2=_interopRequireDefault(_global_scope);function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}var renderTextLayer=function(){var t=1e5,e=/\S/;function n(t){return!e.test(t)}var i=["left: ",0,"px; top: ",0,"px; font-size: ",0,"px; font-family: ","",";"];function r(t,e,r){var a=document.createElement("div"),o={style:null,angle:0,canvasWidth:0,isWhitespace:!1,originalTransform:null,paddingBottom:0,paddingLeft:0,paddingRight:0,paddingTop:0,scale:1};if(t._textDivs.push(a),n(e.str))return o.isWhitespace=!0,void t._textDivProperties.set(a,o);var s=_util.Util.transform(t._viewport.transform,e.transform),l=Math.atan2(s[1],s[0]),d=r[e.fontName];d.vertical&&(l+=Math.PI/2);var h,x,c=Math.sqrt(s[2]*s[2]+s[3]*s[3]),p=c;if(d.ascent?p=d.ascent*p:d.descent&&(p=(1+d.descent)*p),0===l?(h=s[4],x=s[5]-p):(h=s[4]+p*Math.sin(l),x=s[5]-p*Math.cos(l)),i[1]=h,i[3]=x,i[5]=c,i[7]=d.fontFamily,o.style=i.join(""),a.setAttribute("style",o.style),a.textContent=e.str,t._fontInspectorEnabled&&(a.dataset.fontName=e.fontName),0!==l&&(o.angle=l*(180/Math.PI)),e.str.length>1&&(d.vertical?o.canvasWidth=e.height*t._viewport.scale:o.canvasWidth=e.width*t._viewport.scale),t._textDivProperties.set(a,o),t._textContentStream&&t._layoutText(a),t._enhanceTextSelection){var u=1,_=0;0!==l&&(u=Math.cos(l),_=Math.sin(l));var f,v,g=(d.vertical?e.height:e.width)*t._viewport.scale,m=c;0!==l?(f=[u,_,-_,u,h,x],v=_util.Util.getAxialAlignedBoundingBox([0,0,g,m],f)):v=[h,x,h+g,x+m],t._bounds.push({left:v[0],top:v[1],right:v[2],bottom:v[3],div:a,size:[g,m],m:f})}}function a(e){if(!e._canceled){var n=e._textDivs,i=e._capability,r=n.length;if(r>t)return e._renderingDone=!0,void i.resolve();if(!e._textContentStream)for(var a=0;a<r;a++)e._layoutText(n[a]);e._renderingDone=!0,i.resolve()}}function o(t){for(var e=t._bounds,n=t._viewport,i=s(n.width,n.height,e),r=0;r<i.length;r++){var a=e[r].div,o=t._textDivProperties.get(a);if(0!==o.angle){var l=i[r],d=e[r],h=d.m,x=h[0],c=h[1],p=[[0,0],[0,d.size[1]],[d.size[0],0],d.size],u=new Float64Array(64);p.forEach((function(t,e){var n=_util.Util.applyTransform(t,h);u[e+0]=x&&(l.left-n[0])/x,u[e+4]=c&&(l.top-n[1])/c,u[e+8]=x&&(l.right-n[0])/x,u[e+12]=c&&(l.bottom-n[1])/c,u[e+16]=c&&(l.left-n[0])/-c,u[e+20]=x&&(l.top-n[1])/x,u[e+24]=c&&(l.right-n[0])/-c,u[e+28]=x&&(l.bottom-n[1])/x,u[e+32]=x&&(l.left-n[0])/-x,u[e+36]=c&&(l.top-n[1])/-c,u[e+40]=x&&(l.right-n[0])/-x,u[e+44]=c&&(l.bottom-n[1])/-c,u[e+48]=c&&(l.left-n[0])/c,u[e+52]=x&&(l.top-n[1])/-x,u[e+56]=c&&(l.right-n[0])/c,u[e+60]=x&&(l.bottom-n[1])/-x}));var _=function(t,e,n){for(var i=0,r=0;r<n;r++){var a=t[e++];a>0&&(i=i?Math.min(a,i):a)}return i},f=1+Math.min(Math.abs(x),Math.abs(c));o.paddingLeft=_(u,32,16)/f,o.paddingTop=_(u,48,16)/f,o.paddingRight=_(u,0,16)/f,o.paddingBottom=_(u,16,16)/f,t._textDivProperties.set(a,o)}else o.paddingLeft=e[r].left-i[r].left,o.paddingTop=e[r].top-i[r].top,o.paddingRight=i[r].right-e[r].right,o.paddingBottom=i[r].bottom-e[r].bottom,t._textDivProperties.set(a,o)}}function s(t,e,n){var i=n.map((function(t,e){return{x1:t.left,y1:t.top,x2:t.right,y2:t.bottom,index:e,x1New:void 0,x2New:void 0}}));l(t,i);var r=new Array(n.length);return i.forEach((function(t){var e=t.index;r[e]={left:t.x1New,top:0,right:t.x2New,bottom:0}})),n.map((function(e,n){var a=r[n],o=i[n];o.x1=e.top,o.y1=t-a.right,o.x2=e.bottom,o.y2=t-a.left,o.index=n,o.x1New=void 0,o.x2New=void 0})),l(e,i),i.forEach((function(t){var e=t.index;r[e].top=t.x1New,r[e].bottom=t.x2New})),r}function l(t,e){e.sort((function(t,e){return t.x1-e.x1||t.index-e.index}));var n={x1:-1/0,y1:-1/0,x2:0,y2:1/0,index:-1,x1New:0,x2New:0},i=[{start:-1/0,end:1/0,boundary:n}];e.forEach((function(t){var e=0;while(e<i.length&&i[e].end<=t.y1)e++;var n,r,a=i.length-1;while(a>=0&&i[a].start>=t.y2)a--;var o,s,l=-1/0;for(o=e;o<=a;o++){var d;n=i[o],r=n.boundary,d=r.x2>t.x1?r.index>t.index?r.x1New:t.x1:void 0===r.x2New?(r.x2+t.x1)/2:r.x2New,d>l&&(l=d)}for(t.x1New=l,o=e;o<=a;o++)n=i[o],r=n.boundary,void 0===r.x2New?r.x2>t.x1?r.index>t.index&&(r.x2New=r.x2):r.x2New=l:r.x2New>l&&(r.x2New=Math.max(l,r.x2));var h=[],x=null;for(o=e;o<=a;o++){n=i[o],r=n.boundary;var c=r.x2>t.x2?r:t;x===c?h[h.length-1].end=n.end:(h.push({start:n.start,end:n.end,boundary:c}),x=c)}for(i[e].start<t.y1&&(h[0].start=t.y1,h.unshift({start:i[e].start,end:t.y1,boundary:i[e].boundary})),t.y2<i[a].end&&(h[h.length-1].end=t.y2,h.push({start:t.y2,end:i[a].end,boundary:i[a].boundary})),o=e;o<=a;o++)if(n=i[o],r=n.boundary,void 0===r.x2New){var p=!1;for(s=e-1;!p&&s>=0&&i[s].start>=r.y1;s--)p=i[s].boundary===r;for(s=a+1;!p&&s<i.length&&i[s].end<=r.y2;s++)p=i[s].boundary===r;for(s=0;!p&&s<h.length;s++)p=h[s].boundary===r;p||(r.x2New=l)}Array.prototype.splice.apply(i,[e,a-e+1].concat(h))})),i.forEach((function(e){var n=e.boundary;void 0===n.x2New&&(n.x2New=Math.max(t,n.x2))}))}function d(t){var e=t.textContent,n=t.textContentStream,i=t.container,r=t.viewport,a=t.textDivs,o=t.textContentItemsStr,s=t.enhanceTextSelection;this._textContent=e,this._textContentStream=n,this._container=i,this._viewport=r,this._textDivs=a||[],this._textContentItemsStr=o||[],this._enhanceTextSelection=!!s,this._fontInspectorEnabled=!(!_global_scope2.default.FontInspector||!_global_scope2.default.FontInspector.enabled),this._reader=null,this._layoutTextLastFontSize=null,this._layoutTextLastFontFamily=null,this._layoutTextCtx=null,this._textDivProperties=new WeakMap,this._renderingDone=!1,this._canceled=!1,this._capability=(0,_util.createPromiseCapability)(),this._renderTimer=null,this._bounds=[]}function h(t){var e=new d({textContent:t.textContent,textContentStream:t.textContentStream,container:t.container,viewport:t.viewport,textDivs:t.textDivs,textContentItemsStr:t.textContentItemsStr,enhanceTextSelection:t.enhanceTextSelection});return e._render(t.timeout),e}return d.prototype={get promise(){return this._capability.promise},cancel:function(){this._reader&&(this._reader.cancel(new _util.AbortException("text layer task cancelled")),this._reader=null),this._canceled=!0,null!==this._renderTimer&&(clearTimeout(this._renderTimer),this._renderTimer=null),this._capability.reject("canceled")},_processItems:function(t,e){for(var n=0,i=t.length;n<i;n++)this._textContentItemsStr.push(t[n].str),r(this,t[n],e)},_layoutText:function(t){var e=this._container,n=this._textDivProperties.get(t);if(!n.isWhitespace){var i=t.style.fontSize,r=t.style.fontFamily;i===this._layoutTextLastFontSize&&r===this._layoutTextLastFontFamily||(this._layoutTextCtx.font=i+" "+r,this._layoutTextLastFontSize=i,this._layoutTextLastFontFamily=r);var a=this._layoutTextCtx.measureText(t.textContent).width,o="";0!==n.canvasWidth&&a>0&&(n.scale=n.canvasWidth/a,o="scaleX("+n.scale+")"),0!==n.angle&&(o="rotate("+n.angle+"deg) "+o),""!==o&&(n.originalTransform=o,t.style.transform=o),this._textDivProperties.set(t,n),e.appendChild(t)}},_render:function(t){var e=this,n=(0,_util.createPromiseCapability)(),i=Object.create(null),r=document.createElement("canvas");if(r.mozOpaque=!0,this._layoutTextCtx=r.getContext("2d",{alpha:!1}),this._textContent){var o=this._textContent.items,s=this._textContent.styles;this._processItems(o,s),n.resolve()}else{if(!this._textContentStream)throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');var l=function t(){e._reader.read().then((function(r){var a=r.value,o=r.done;o?n.resolve():(Object.assign(i,a.styles),e._processItems(a.items,i),t())}),n.reject)};this._reader=this._textContentStream.getReader(),l()}n.promise.then((function(){i=null,t?e._renderTimer=setTimeout((function(){a(e),e._renderTimer=null}),t):a(e)}),this._capability.reject)},expandTextDivs:function(t){if(this._enhanceTextSelection&&this._renderingDone){null!==this._bounds&&(o(this),this._bounds=null);for(var e=0,n=this._textDivs.length;e<n;e++){var i=this._textDivs[e],r=this._textDivProperties.get(i);if(!r.isWhitespace)if(t){var a="",s="";1!==r.scale&&(a="scaleX("+r.scale+")"),0!==r.angle&&(a="rotate("+r.angle+"deg) "+a),0!==r.paddingLeft&&(s+=" padding-left: "+r.paddingLeft/r.scale+"px;",a+=" translateX("+-r.paddingLeft/r.scale+"px)"),0!==r.paddingTop&&(s+=" padding-top: "+r.paddingTop+"px;",a+=" translateY("+-r.paddingTop+"px)"),0!==r.paddingRight&&(s+=" padding-right: "+r.paddingRight/r.scale+"px;"),0!==r.paddingBottom&&(s+=" padding-bottom: "+r.paddingBottom+"px;"),""!==s&&i.setAttribute("style",r.style+s),""!==a&&(i.style.transform=a)}else i.style.padding=0,i.style.transform=r.originalTransform||""}}}},h}();exports.renderTextLayer=renderTextLayer;