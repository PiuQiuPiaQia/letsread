"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BaseStream=void 0;var _util=require("../shared/util.js");class BaseStream{constructor(){this.constructor===BaseStream&&(0,_util.unreachable)("Cannot initialize BaseStream.")}get length(){(0,_util.unreachable)("Abstract getter `length` accessed")}get isEmpty(){(0,_util.unreachable)("Abstract getter `isEmpty` accessed")}get isDataLoaded(){return(0,_util.shadow)(this,"isDataLoaded",!0)}getByte(){(0,_util.unreachable)("Abstract method `getByte` called")}getBytes(t,e=!1){(0,_util.unreachable)("Abstract method `getBytes` called")}peekByte(){const t=this.getByte();return-1!==t&&this.pos--,t}peekBytes(t,e=!1){const a=this.getBytes(t,e);return this.pos-=a.length,a}getUint16(){const t=this.getByte(),e=this.getByte();return-1===t||-1===e?-1:(t<<8)+e}getInt32(){const t=this.getByte(),e=this.getByte(),a=this.getByte(),s=this.getByte();return(t<<24)+(e<<16)+(a<<8)+s}getByteRange(t,e){(0,_util.unreachable)("Abstract method `getByteRange` called")}getString(t){return(0,_util.bytesToString)(this.getBytes(t,!1))}skip(t){this.pos+=t||1}reset(){(0,_util.unreachable)("Abstract method `reset` called")}moveStart(){(0,_util.unreachable)("Abstract method `moveStart` called")}makeSubStream(t,e,a=null){(0,_util.unreachable)("Abstract method `makeSubStream` called")}getBaseStreams(){return null}}exports.BaseStream=BaseStream;