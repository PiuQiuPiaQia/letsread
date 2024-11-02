"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.OperatorList=void 0;var _util=require("../shared/util"),QueueOptimizer=function(){function t(t,r,e,i,a){for(var n=t,s=0,u=r.length-1;s<u;s++){var h=r[s];n=n[h]||(n[h]=[])}n[r[r.length-1]]={checkFn:e,iterateFn:i,processFn:a}}function r(t,r,e,i){for(var a=t+2,n=0;n<r;n++){var s=i[a+4*n],u=1===s.length&&s[0];if(!u||1!==u.width||1!==u.height||u.data.length&&(1!==u.data.length||0!==u.data[0]))break;e[a+4*n]=_util.OPS.paintSolidColorImageMask}return r-n}var e=[];function i(t){this.queue=t,this.state=null,this.context={iCurr:0,fnArray:t.fnArray,argsArray:t.argsArray},this.match=null,this.lastProcessed=0}return t(e,[_util.OPS.save,_util.OPS.transform,_util.OPS.paintInlineImageXObject,_util.OPS.restore],null,(function(t,r){var e=t.fnArray,i=t.iCurr-3,a=(r-i)%4;switch(a){case 0:return e[r]===_util.OPS.save;case 1:return e[r]===_util.OPS.transform;case 2:return e[r]===_util.OPS.paintInlineImageXObject;case 3:return e[r]===_util.OPS.restore}}),(function(t,r){var e=10,i=200,a=1e3,n=1,s=t.fnArray,u=t.argsArray,h=t.iCurr,l=h-3,c=h-2,o=h-1,f=Math.min(Math.floor((r-l)/4),i);if(f<e)return r-(r-l)%4;var p,g=0,O=[],d=0,y=n,_=n;for(p=0;p<f;p++){var P=u[c+(p<<2)],m=u[o+(p<<2)][0];y+m.width>a&&(g=Math.max(g,y),_+=d+2*n,y=0,d=0),O.push({transform:P,x:y,y:_,w:m.width,h:m.height}),y+=m.width+2*n,d=Math.max(d,m.height)}var v=Math.max(g,y)+n,A=_+d+n,S=new Uint8ClampedArray(v*A*4),w=v<<2;for(p=0;p<f;p++){var b=u[o+(p<<2)][0].data,x=O[p].w<<2,I=0,M=O[p].x+O[p].y*v<<2;S.set(b.subarray(0,x),M-w);for(var C=0,j=O[p].h;C<j;C++)S.set(b.subarray(I,I+x),M),I+=x,M+=w;S.set(b.subarray(I-x,I),M);while(M>=0)b[M-4]=b[M],b[M-3]=b[M+1],b[M-2]=b[M+2],b[M-1]=b[M+3],b[M+x]=b[M+x-4],b[M+x+1]=b[M+x-3],b[M+x+2]=b[M+x-2],b[M+x+3]=b[M+x-1],M-=w}return s.splice(l,4*f,_util.OPS.paintInlineImageXObjectGroup),u.splice(l,4*f,[{width:v,height:A,kind:_util.ImageKind.RGBA_32BPP,data:S},O]),l+1})),t(e,[_util.OPS.save,_util.OPS.transform,_util.OPS.paintImageMaskXObject,_util.OPS.restore],null,(function(t,r){var e=t.fnArray,i=t.iCurr-3,a=(r-i)%4;switch(a){case 0:return e[r]===_util.OPS.save;case 1:return e[r]===_util.OPS.transform;case 2:return e[r]===_util.OPS.paintImageMaskXObject;case 3:return e[r]===_util.OPS.restore}}),(function(t,e){var i,a=10,n=100,s=1e3,u=t.fnArray,h=t.argsArray,l=t.iCurr,c=l-3,o=l-2,f=l-1,p=Math.floor((e-c)/4);if(p=r(c,p,u,h),p<a)return e-(e-c)%4;var g,O,d=!1,y=h[f][0];if(0===h[o][1]&&0===h[o][2]){d=!0;var _=h[o][0],P=h[o][3];g=o+4;var m=f+4;for(i=1;i<p;i++,g+=4,m+=4)if(O=h[g],h[m][0]!==y||O[0]!==_||0!==O[1]||0!==O[2]||O[3]!==P){i<a?d=!1:p=i;break}}if(d){p=Math.min(p,s);var v=new Float32Array(2*p);for(g=o,i=0;i<p;i++,g+=4)O=h[g],v[i<<1]=O[4],v[1+(i<<1)]=O[5];u.splice(c,4*p,_util.OPS.paintImageMaskXObjectRepeat),h.splice(c,4*p,[y,_,P,v])}else{p=Math.min(p,n);var A=[];for(i=0;i<p;i++){O=h[o+(i<<2)];var S=h[f+(i<<2)][0];A.push({data:S.data,width:S.width,height:S.height,transform:O})}u.splice(c,4*p,_util.OPS.paintImageMaskXObjectGroup),h.splice(c,4*p,[A])}return c+1})),t(e,[_util.OPS.save,_util.OPS.transform,_util.OPS.paintImageXObject,_util.OPS.restore],(function(t){var r=t.argsArray,e=t.iCurr-2;return 0===r[e][1]&&0===r[e][2]}),(function(t,r){var e=t.fnArray,i=t.argsArray,a=t.iCurr-3,n=(r-a)%4;switch(n){case 0:return e[r]===_util.OPS.save;case 1:if(e[r]!==_util.OPS.transform)return!1;var s=t.iCurr-2,u=i[s][0],h=i[s][3];return i[r][0]===u&&0===i[r][1]&&0===i[r][2]&&i[r][3]===h;case 2:if(e[r]!==_util.OPS.paintImageXObject)return!1;var l=t.iCurr-1,c=i[l][0];return i[r][0]===c;case 3:return e[r]===_util.OPS.restore}}),(function(t,r){var e=3,i=1e3,a=t.fnArray,n=t.argsArray,s=t.iCurr,u=s-3,h=s-2,l=s-1,c=n[l][0],o=n[h][0],f=n[h][3],p=Math.min(Math.floor((r-u)/4),i);if(p<e)return r-(r-u)%4;for(var g=new Float32Array(2*p),O=h,d=0;d<p;d++,O+=4){var y=n[O];g[d<<1]=y[4],g[1+(d<<1)]=y[5]}var _=[c,o,f,g];return a.splice(u,4*p,_util.OPS.paintImageXObjectRepeat),n.splice(u,4*p,_),u+1})),t(e,[_util.OPS.beginText,_util.OPS.setFont,_util.OPS.setTextMatrix,_util.OPS.showText,_util.OPS.endText],null,(function(t,r){var e=t.fnArray,i=t.argsArray,a=t.iCurr-4,n=(r-a)%5;switch(n){case 0:return e[r]===_util.OPS.beginText;case 1:return e[r]===_util.OPS.setFont;case 2:return e[r]===_util.OPS.setTextMatrix;case 3:if(e[r]!==_util.OPS.showText)return!1;var s=t.iCurr-3,u=i[s][0],h=i[s][1];return i[r][0]===u&&i[r][1]===h;case 4:return e[r]===_util.OPS.endText}}),(function(t,r){var e=3,i=1e3,a=t.fnArray,n=t.argsArray,s=t.iCurr,u=s-4,h=s-3,l=s-2,c=s-1,o=s,f=n[h][0],p=n[h][1],g=Math.min(Math.floor((r-u)/5),i);if(g<e)return r-(r-u)%5;var O=u;u>=4&&a[u-4]===a[h]&&a[u-3]===a[l]&&a[u-2]===a[c]&&a[u-1]===a[o]&&n[u-4][0]===f&&n[u-4][1]===p&&(g++,O-=5);for(var d=O+4,y=1;y<g;y++)a.splice(d,3),n.splice(d,3),d+=2;return d+1})),i.prototype={_optimize:function(){var t=this.queue.fnArray,r=this.lastProcessed,i=t.length,a=this.state,n=this.match;if(a||n||r+1!==i||e[t[r]]){var s=this.context;while(r<i){if(n){var u=(0,n.iterateFn)(s,r);if(u){r++;continue}if(r=(0,n.processFn)(s,r+1),i=t.length,n=null,a=null,r>=i)break}a=(a||e)[t[r]],a&&!Array.isArray(a)?(s.iCurr=r,r++,!a.checkFn||(0,a.checkFn)(s)?(n=a,a=null):a=null):r++}this.state=a,this.match=n,this.lastProcessed=r}else this.lastProcessed=i},push:function(t,r){this.queue.fnArray.push(t),this.queue.argsArray.push(r),this._optimize()},flush:function(){while(this.match){var t=this.queue.fnArray.length;this.lastProcessed=(0,this.match.processFn)(this.context,t),this.match=null,this.state=null,this._optimize()}},reset:function(){this.state=null,this.match=null,this.lastProcessed=0}},i}(),NullOptimizer=function(){function t(t){this.queue=t}return t.prototype={push:function(t,r){this.queue.fnArray.push(t),this.queue.argsArray.push(r)},flush:function(){}},t}(),OperatorList=function(){var t=1e3,r=t-5;function e(t){for(var r=[],e=t.fnArray,i=t.argsArray,a=0,n=t.length;a<n;a++)switch(e[a]){case _util.OPS.paintInlineImageXObject:case _util.OPS.paintInlineImageXObjectGroup:case _util.OPS.paintImageMaskXObject:var s=i[a][0];s.cached||r.push(s.data.buffer);break}return r}function i(t,r,e){this.messageHandler=r,this.fnArray=[],this.argsArray=[],r&&"oplist"!==this.intent?this.optimizer=new QueueOptimizer(this):this.optimizer=new NullOptimizer(this),this.dependencies=Object.create(null),this._totalLength=0,this.pageIndex=e,this.intent=t,this.weight=0}return i.prototype={get length(){return this.argsArray.length},get totalLength(){return this._totalLength+this.length},addOp:function(e,i){this.optimizer.push(e,i),this.weight++,this.messageHandler&&(this.weight>=t||this.weight>=r&&(e===_util.OPS.restore||e===_util.OPS.endText))&&this.flush()},addDependency:function(t){t in this.dependencies||(this.dependencies[t]=!0,this.addOp(_util.OPS.dependency,[t]))},addDependencies:function(t){for(var r in t)this.addDependency(r)},addOpList:function(t){Object.assign(this.dependencies,t.dependencies);for(var r=0,e=t.length;r<e;r++)this.addOp(t.fnArray[r],t.argsArray[r])},getIR:function(){return{fnArray:this.fnArray,argsArray:this.argsArray,length:this.length}},flush:function(t){this.optimizer.flush();var r=e(this),i=this.length;this._totalLength+=i,this.messageHandler.send("RenderPageChunk",{operatorList:{fnArray:this.fnArray,argsArray:this.argsArray,lastChunk:t,length:i},pageIndex:this.pageIndex,intent:this.intent},r),this.dependencies=Object.create(null),this.fnArray.length=0,this.argsArray.length=0,this.weight=0,this.optimizer.reset()}},i}();exports.OperatorList=OperatorList;