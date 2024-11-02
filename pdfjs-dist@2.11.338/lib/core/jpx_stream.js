"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.JpxStream=void 0;var _decode_stream=require("./decode_stream.js"),_jpx=require("./jpx.js"),_util=require("../shared/util.js");class JpxStream extends _decode_stream.DecodeStream{constructor(e,t,s){super(t),this.stream=e,this.dict=e.dict,this.maybeLength=t,this.params=s}get bytes(){return(0,_util.shadow)(this,"bytes",this.stream.getBytes(this.maybeLength))}ensureBuffer(e){}readBlock(){if(this.eof)return;const e=new _jpx.JpxImage;e.parse(this.bytes);const t=e.width,s=e.height,r=e.componentsCount,i=e.tiles.length;if(1===i)this.buffer=e.tiles[0].items;else{const o=new Uint8ClampedArray(t*s*r);for(let s=0;s<i;s++){const i=e.tiles[s],h=i.width,a=i.height,n=i.left,u=i.top,c=i.items;let d=0,f=(t*u+n)*r;const l=t*r,m=h*r;for(let e=0;e<a;e++){const e=c.subarray(d,d+m);o.set(e,f),d+=m,f+=l}}this.buffer=o}this.bufferLength=this.buffer.length,this.eof=!0}}exports.JpxStream=JpxStream;