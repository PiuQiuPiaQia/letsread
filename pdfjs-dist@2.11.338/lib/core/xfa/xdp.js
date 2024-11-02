"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.XdpNamespace=void 0;var _namespaces=require("./namespaces.js"),_xfa_object=require("./xfa_object.js");const XDP_NS_ID=_namespaces.NamespaceIds.xdp.id;class Xdp extends _xfa_object.XFAObject{constructor(e){super(XDP_NS_ID,"xdp",!0),this.uuid=e.uuid||"",this.timeStamp=e.timeStamp||"",this.config=null,this.connectionSet=null,this.datasets=null,this.localeSet=null,this.stylesheet=new _xfa_object.XFAObjectArray,this.template=null}[_xfa_object.$onChildCheck](e){const s=_namespaces.NamespaceIds[e[_xfa_object.$nodeName]];return s&&e[_xfa_object.$namespaceId]===s.id}}class XdpNamespace{static[_namespaces.$buildXFAObject](e,s){if(XdpNamespace.hasOwnProperty(e))return XdpNamespace[e](s)}static xdp(e){return new Xdp(e)}}exports.XdpNamespace=XdpNamespace;