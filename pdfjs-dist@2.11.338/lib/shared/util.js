"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.arrayByteLength=arrayByteLength,exports.arraysToBytes=arraysToBytes,exports.assert=assert,exports.bytesToString=bytesToString,exports.createObjectURL=createObjectURL,exports.createPromiseCapability=createPromiseCapability,exports.createValidAbsoluteUrl=createValidAbsoluteUrl,exports.escapeString=escapeString,exports.getModificationDate=getModificationDate,exports.getVerbosityLevel=getVerbosityLevel,exports.info=info,exports.isArrayBuffer=isArrayBuffer,exports.isArrayEqual=isArrayEqual,exports.isAscii=isAscii,exports.isBool=isBool,exports.isNum=isNum,exports.isSameOrigin=isSameOrigin,exports.isString=isString,exports.objectFromMap=objectFromMap,exports.objectSize=objectSize,exports.removeNullCharacters=removeNullCharacters,exports.setVerbosityLevel=setVerbosityLevel,exports.shadow=shadow,exports.string32=string32,exports.stringToBytes=stringToBytes,exports.stringToPDFString=stringToPDFString,exports.stringToUTF16BEString=stringToUTF16BEString,exports.stringToUTF8String=stringToUTF8String,exports.unreachable=unreachable,exports.utf8StringToString=utf8StringToString,exports.warn=warn,exports.VerbosityLevel=exports.Util=exports.UNSUPPORTED_FEATURES=exports.UnknownErrorException=exports.UnexpectedResponseException=exports.TextRenderingMode=exports.StreamType=exports.RenderingIntentFlag=exports.PermissionFlag=exports.PasswordResponses=exports.PasswordException=exports.PageActionEventType=exports.OPS=exports.MissingPDFException=exports.IsLittleEndianCached=exports.IsEvalSupportedCached=exports.InvalidPDFException=exports.ImageKind=exports.IDENTITY_MATRIX=exports.FormatError=exports.FontType=exports.FONT_IDENTITY_MATRIX=exports.DocumentActionEventType=exports.CMapCompressionType=exports.BaseException=exports.AnnotationType=exports.AnnotationStateModelType=exports.AnnotationReviewState=exports.AnnotationReplyType=exports.AnnotationMode=exports.AnnotationMarkedState=exports.AnnotationFlag=exports.AnnotationFieldFlag=exports.AnnotationBorderStyleType=exports.AnnotationActionEventType=exports.AbortException=void 0,require("./compatibility.js");const IDENTITY_MATRIX=[1,0,0,1,0,0];exports.IDENTITY_MATRIX=IDENTITY_MATRIX;const FONT_IDENTITY_MATRIX=[.001,0,0,.001,0,0];exports.FONT_IDENTITY_MATRIX=FONT_IDENTITY_MATRIX;const RenderingIntentFlag={ANY:1,DISPLAY:2,PRINT:4,ANNOTATIONS_FORMS:16,ANNOTATIONS_STORAGE:32,ANNOTATIONS_DISABLE:64,OPLIST:256};exports.RenderingIntentFlag=RenderingIntentFlag;const AnnotationMode={DISABLE:0,ENABLE:1,ENABLE_FORMS:2,ENABLE_STORAGE:3};exports.AnnotationMode=AnnotationMode;const PermissionFlag={PRINT:4,MODIFY_CONTENTS:8,COPY:16,MODIFY_ANNOTATIONS:32,FILL_INTERACTIVE_FORMS:256,COPY_FOR_ACCESSIBILITY:512,ASSEMBLE:1024,PRINT_HIGH_QUALITY:2048};exports.PermissionFlag=PermissionFlag;const TextRenderingMode={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4};exports.TextRenderingMode=TextRenderingMode;const ImageKind={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3};exports.ImageKind=ImageKind;const AnnotationType={TEXT:1,LINK:2,FREETEXT:3,LINE:4,SQUARE:5,CIRCLE:6,POLYGON:7,POLYLINE:8,HIGHLIGHT:9,UNDERLINE:10,SQUIGGLY:11,STRIKEOUT:12,STAMP:13,CARET:14,INK:15,POPUP:16,FILEATTACHMENT:17,SOUND:18,MOVIE:19,WIDGET:20,SCREEN:21,PRINTERMARK:22,TRAPNET:23,WATERMARK:24,THREED:25,REDACT:26};exports.AnnotationType=AnnotationType;const AnnotationStateModelType={MARKED:"Marked",REVIEW:"Review"};exports.AnnotationStateModelType=AnnotationStateModelType;const AnnotationMarkedState={MARKED:"Marked",UNMARKED:"Unmarked"};exports.AnnotationMarkedState=AnnotationMarkedState;const AnnotationReviewState={ACCEPTED:"Accepted",REJECTED:"Rejected",CANCELLED:"Cancelled",COMPLETED:"Completed",NONE:"None"};exports.AnnotationReviewState=AnnotationReviewState;const AnnotationReplyType={GROUP:"Group",REPLY:"R"};exports.AnnotationReplyType=AnnotationReplyType;const AnnotationFlag={INVISIBLE:1,HIDDEN:2,PRINT:4,NOZOOM:8,NOROTATE:16,NOVIEW:32,READONLY:64,LOCKED:128,TOGGLENOVIEW:256,LOCKEDCONTENTS:512};exports.AnnotationFlag=AnnotationFlag;const AnnotationFieldFlag={READONLY:1,REQUIRED:2,NOEXPORT:4,MULTILINE:4096,PASSWORD:8192,NOTOGGLETOOFF:16384,RADIO:32768,PUSHBUTTON:65536,COMBO:131072,EDIT:262144,SORT:524288,FILESELECT:1048576,MULTISELECT:2097152,DONOTSPELLCHECK:4194304,DONOTSCROLL:8388608,COMB:16777216,RICHTEXT:33554432,RADIOSINUNISON:33554432,COMMITONSELCHANGE:67108864};exports.AnnotationFieldFlag=AnnotationFieldFlag;const AnnotationBorderStyleType={SOLID:1,DASHED:2,BEVELED:3,INSET:4,UNDERLINE:5};exports.AnnotationBorderStyleType=AnnotationBorderStyleType;const AnnotationActionEventType={E:"Mouse Enter",X:"Mouse Exit",D:"Mouse Down",U:"Mouse Up",Fo:"Focus",Bl:"Blur",PO:"PageOpen",PC:"PageClose",PV:"PageVisible",PI:"PageInvisible",K:"Keystroke",F:"Format",V:"Validate",C:"Calculate"};exports.AnnotationActionEventType=AnnotationActionEventType;const DocumentActionEventType={WC:"WillClose",WS:"WillSave",DS:"DidSave",WP:"WillPrint",DP:"DidPrint"};exports.DocumentActionEventType=DocumentActionEventType;const PageActionEventType={O:"PageOpen",C:"PageClose"};exports.PageActionEventType=PageActionEventType;const StreamType={UNKNOWN:"UNKNOWN",FLATE:"FLATE",LZW:"LZW",DCT:"DCT",JPX:"JPX",JBIG:"JBIG",A85:"A85",AHX:"AHX",CCF:"CCF",RLX:"RLX"};exports.StreamType=StreamType;const FontType={UNKNOWN:"UNKNOWN",TYPE1:"TYPE1",TYPE1STANDARD:"TYPE1STANDARD",TYPE1C:"TYPE1C",CIDFONTTYPE0:"CIDFONTTYPE0",CIDFONTTYPE0C:"CIDFONTTYPE0C",TRUETYPE:"TRUETYPE",CIDFONTTYPE2:"CIDFONTTYPE2",TYPE3:"TYPE3",OPENTYPE:"OPENTYPE",TYPE0:"TYPE0",MMTYPE1:"MMTYPE1"};exports.FontType=FontType;const VerbosityLevel={ERRORS:0,WARNINGS:1,INFOS:5};exports.VerbosityLevel=VerbosityLevel;const CMapCompressionType={NONE:0,BINARY:1,STREAM:2};exports.CMapCompressionType=CMapCompressionType;const OPS={dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91};exports.OPS=OPS;const UNSUPPORTED_FEATURES={unknown:"unknown",forms:"forms",javaScript:"javaScript",signatures:"signatures",smask:"smask",shadingPattern:"shadingPattern",font:"font",errorTilingPattern:"errorTilingPattern",errorExtGState:"errorExtGState",errorXObject:"errorXObject",errorFontLoadType3:"errorFontLoadType3",errorFontState:"errorFontState",errorFontMissing:"errorFontMissing",errorFontTranslate:"errorFontTranslate",errorColorSpace:"errorColorSpace",errorOperatorList:"errorOperatorList",errorFontToUnicode:"errorFontToUnicode",errorFontLoadNative:"errorFontLoadNative",errorFontBuildPath:"errorFontBuildPath",errorFontGetPath:"errorFontGetPath",errorMarkedContent:"errorMarkedContent",errorContentSubStream:"errorContentSubStream"};exports.UNSUPPORTED_FEATURES=UNSUPPORTED_FEATURES;const PasswordResponses={NEED_PASSWORD:1,INCORRECT_PASSWORD:2};exports.PasswordResponses=PasswordResponses;let verbosity=VerbosityLevel.WARNINGS;function setVerbosityLevel(t){Number.isInteger(t)&&(verbosity=t)}function getVerbosityLevel(){return verbosity}function info(t){verbosity>=VerbosityLevel.INFOS&&console.log(`Info: ${t}`)}function warn(t){verbosity>=VerbosityLevel.WARNINGS&&console.log(`Warning: ${t}`)}function unreachable(t){throw new Error(t)}function assert(t,e){t||unreachable(e)}function isSameOrigin(t,e){let n;try{if(n=new URL(t),!n.origin||"null"===n.origin)return!1}catch(r){return!1}const o=new URL(e,n);return n.origin===o.origin}function _isValidProtocol(t){if(!t)return!1;switch(t.protocol){case"http:":case"https:":case"ftp:":case"mailto:":case"tel:":return!0;default:return!1}}function createValidAbsoluteUrl(t,e=null,n=null){if(!t)return null;try{if(n&&"string"===typeof t){if(n.addDefaultProtocol&&t.startsWith("www.")){const e=t.match(/\./g);e&&e.length>=2&&(t=`http://${t}`)}if(n.tryConvertEncoding)try{t=stringToUTF8String(t)}catch(o){}}const r=e?new URL(t,e):new URL(t);if(_isValidProtocol(r))return r}catch(o){}return null}function shadow(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!1}),n}const BaseException=function(){function t(e,n){this.constructor===t&&unreachable("Cannot initialize BaseException."),this.message=e,this.name=n}return t.prototype=new Error,t.constructor=t,t}();exports.BaseException=BaseException;class PasswordException extends BaseException{constructor(t,e){super(t,"PasswordException"),this.code=e}}exports.PasswordException=PasswordException;class UnknownErrorException extends BaseException{constructor(t,e){super(t,"UnknownErrorException"),this.details=e}}exports.UnknownErrorException=UnknownErrorException;class InvalidPDFException extends BaseException{constructor(t){super(t,"InvalidPDFException")}}exports.InvalidPDFException=InvalidPDFException;class MissingPDFException extends BaseException{constructor(t){super(t,"MissingPDFException")}}exports.MissingPDFException=MissingPDFException;class UnexpectedResponseException extends BaseException{constructor(t,e){super(t,"UnexpectedResponseException"),this.status=e}}exports.UnexpectedResponseException=UnexpectedResponseException;class FormatError extends BaseException{constructor(t){super(t,"FormatError")}}exports.FormatError=FormatError;class AbortException extends BaseException{constructor(t){super(t,"AbortException")}}exports.AbortException=AbortException;const NullCharactersRegExp=/\x00/g;function removeNullCharacters(t){return"string"!==typeof t?(warn("The argument for removeNullCharacters must be a string."),t):t.replace(NullCharactersRegExp,"")}function bytesToString(t){assert(null!==t&&"object"===typeof t&&void 0!==t.length,"Invalid argument for bytesToString");const e=t.length,n=8192;if(e<n)return String.fromCharCode.apply(null,t);const o=[];for(let r=0;r<e;r+=n){const s=Math.min(r+n,e),i=t.subarray(r,s);o.push(String.fromCharCode.apply(null,i))}return o.join("")}function stringToBytes(t){assert("string"===typeof t,"Invalid argument for stringToBytes");const e=t.length,n=new Uint8Array(e);for(let o=0;o<e;++o)n[o]=255&t.charCodeAt(o);return n}function arrayByteLength(t){return void 0!==t.length?t.length:(assert(void 0!==t.byteLength,"arrayByteLength - invalid argument."),t.byteLength)}function arraysToBytes(t){const e=t.length;if(1===e&&t[0]instanceof Uint8Array)return t[0];let n=0;for(let s=0;s<e;s++)n+=arrayByteLength(t[s]);let o=0;const r=new Uint8Array(n);for(let s=0;s<e;s++){let e=t[s];e instanceof Uint8Array||(e="string"===typeof e?stringToBytes(e):new Uint8Array(e));const n=e.byteLength;r.set(e,o),o+=n}return r}function string32(t){return String.fromCharCode(t>>24&255,t>>16&255,t>>8&255,255&t)}function objectSize(t){return Object.keys(t).length}function objectFromMap(t){const e=Object.create(null);for(const[n,o]of t)e[n]=o;return e}function isLittleEndian(){const t=new Uint8Array(4);t[0]=1;const e=new Uint32Array(t.buffer,0,1);return 1===e[0]}const IsLittleEndianCached={get value(){return shadow(this,"value",isLittleEndian())}};function isEvalSupported(){try{return new Function(""),!0}catch(t){return!1}}exports.IsLittleEndianCached=IsLittleEndianCached;const IsEvalSupportedCached={get value(){return shadow(this,"value",isEvalSupported())}};exports.IsEvalSupportedCached=IsEvalSupportedCached;const hexNumbers=[...Array(256).keys()].map((t=>t.toString(16).padStart(2,"0")));class Util{static makeHexColor(t,e,n){return`#${hexNumbers[t]}${hexNumbers[e]}${hexNumbers[n]}`}static transform(t,e){return[t[0]*e[0]+t[2]*e[1],t[1]*e[0]+t[3]*e[1],t[0]*e[2]+t[2]*e[3],t[1]*e[2]+t[3]*e[3],t[0]*e[4]+t[2]*e[5]+t[4],t[1]*e[4]+t[3]*e[5]+t[5]]}static applyTransform(t,e){const n=t[0]*e[0]+t[1]*e[2]+e[4],o=t[0]*e[1]+t[1]*e[3]+e[5];return[n,o]}static applyInverseTransform(t,e){const n=e[0]*e[3]-e[1]*e[2],o=(t[0]*e[3]-t[1]*e[2]+e[2]*e[5]-e[4]*e[3])/n,r=(-t[0]*e[1]+t[1]*e[0]+e[4]*e[1]-e[5]*e[0])/n;return[o,r]}static getAxialAlignedBoundingBox(t,e){const n=Util.applyTransform(t,e),o=Util.applyTransform(t.slice(2,4),e),r=Util.applyTransform([t[0],t[3]],e),s=Util.applyTransform([t[2],t[1]],e);return[Math.min(n[0],o[0],r[0],s[0]),Math.min(n[1],o[1],r[1],s[1]),Math.max(n[0],o[0],r[0],s[0]),Math.max(n[1],o[1],r[1],s[1])]}static inverseTransform(t){const e=t[0]*t[3]-t[1]*t[2];return[t[3]/e,-t[1]/e,-t[2]/e,t[0]/e,(t[2]*t[5]-t[4]*t[3])/e,(t[4]*t[1]-t[5]*t[0])/e]}static apply3dTransform(t,e){return[t[0]*e[0]+t[1]*e[1]+t[2]*e[2],t[3]*e[0]+t[4]*e[1]+t[5]*e[2],t[6]*e[0]+t[7]*e[1]+t[8]*e[2]]}static singularValueDecompose2dScale(t){const e=[t[0],t[2],t[1],t[3]],n=t[0]*e[0]+t[1]*e[2],o=t[0]*e[1]+t[1]*e[3],r=t[2]*e[0]+t[3]*e[2],s=t[2]*e[1]+t[3]*e[3],i=(n+s)/2,a=Math.sqrt((n+s)**2-4*(n*s-r*o))/2,c=i+a||1,p=i-a||1;return[Math.sqrt(c),Math.sqrt(p)]}static normalizeRect(t){const e=t.slice(0);return t[0]>t[2]&&(e[0]=t[2],e[2]=t[0]),t[1]>t[3]&&(e[1]=t[3],e[3]=t[1]),e}static intersect(t,e){function n(t,e){return t-e}const o=[t[0],t[2],e[0],e[2]].sort(n),r=[t[1],t[3],e[1],e[3]].sort(n),s=[];return t=Util.normalizeRect(t),e=Util.normalizeRect(e),o[0]===t[0]&&o[1]===e[0]||o[0]===e[0]&&o[1]===t[0]?(s[0]=o[1],s[2]=o[2],r[0]===t[1]&&r[1]===e[1]||r[0]===e[1]&&r[1]===t[1]?(s[1]=r[1],s[3]=r[2],s):null):null}}exports.Util=Util;const PDFStringTranslateTable=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364];function stringToPDFString(t){const e=t.length,n=[];if("\xfe"===t[0]&&"\xff"===t[1])for(let o=2;o<e;o+=2)n.push(String.fromCharCode(t.charCodeAt(o)<<8|t.charCodeAt(o+1)));else if("\xff"===t[0]&&"\xfe"===t[1])for(let o=2;o<e;o+=2)n.push(String.fromCharCode(t.charCodeAt(o+1)<<8|t.charCodeAt(o)));else for(let o=0;o<e;++o){const e=PDFStringTranslateTable[t.charCodeAt(o)];n.push(e?String.fromCharCode(e):t.charAt(o))}return n.join("")}function escapeString(t){return t.replace(/([()\\\n\r])/g,(t=>"\n"===t?"\\n":"\r"===t?"\\r":`\\${t}`))}function isAscii(t){return/^[\x00-\x7F]*$/.test(t)}function stringToUTF16BEString(t){const e=["\xfe\xff"];for(let n=0,o=t.length;n<o;n++){const o=t.charCodeAt(n);e.push(String.fromCharCode(o>>8&255),String.fromCharCode(255&o))}return e.join("")}function stringToUTF8String(t){return decodeURIComponent(escape(t))}function utf8StringToString(t){return unescape(encodeURIComponent(t))}function isBool(t){return"boolean"===typeof t}function isNum(t){return"number"===typeof t}function isString(t){return"string"===typeof t}function isArrayBuffer(t){return"object"===typeof t&&null!==t&&void 0!==t.byteLength}function isArrayEqual(t,e){if(t.length!==e.length)return!1;for(let n=0,o=t.length;n<o;n++)if(t[n]!==e[n])return!1;return!0}function getModificationDate(t=new Date){const e=[t.getUTCFullYear().toString(),(t.getUTCMonth()+1).toString().padStart(2,"0"),t.getUTCDate().toString().padStart(2,"0"),t.getUTCHours().toString().padStart(2,"0"),t.getUTCMinutes().toString().padStart(2,"0"),t.getUTCSeconds().toString().padStart(2,"0")];return e.join("")}function createPromiseCapability(){const t=Object.create(null);let e=!1;return Object.defineProperty(t,"settled",{get(){return e}}),t.promise=new Promise((function(n,o){t.resolve=function(t){e=!0,n(t)},t.reject=function(t){e=!0,o(t)}})),t}function createObjectURL(t,e="",n=!1){if(URL.createObjectURL&&!n)return URL.createObjectURL(new Blob([t],{type:e}));const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";let r=`data:${e};base64,`;for(let s=0,i=t.length;s<i;s+=3){const e=255&t[s],n=255&t[s+1],a=255&t[s+2],c=e>>2,p=(3&e)<<4|n>>4,l=s+1<i?(15&n)<<2|a>>6:64,T=s+2<i?63&a:64;r+=o[c]+o[p]+o[l]+o[T]}return r}