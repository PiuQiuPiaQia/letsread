"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Catalog=void 0;var _primitives=require("./primitives.js"),_core_utils=require("./core_utils.js"),_util=require("../shared/util.js"),_name_number_tree=require("./name_number_tree.js"),_colorspace=require("./colorspace.js"),_file_spec=require("./file_spec.js"),_image_utils=require("./image_utils.js"),_metadata_parser=require("./metadata_parser.js"),_struct_tree=require("./struct_tree.js");function fetchDestination(t){return t instanceof _primitives.Dict&&(t=t.get("D")),Array.isArray(t)?t:null}class Catalog{constructor(t,e){if(this.pdfManager=t,this.xref=e,this._catDict=e.getCatalogObj(),!(0,_primitives.isDict)(this._catDict))throw new _util.FormatError("Catalog object is not a dictionary.");this.fontCache=new _primitives.RefSetCache,this.builtInCMapCache=new Map,this.standardFontDataCache=new Map,this.globalImageCache=new _image_utils.GlobalImageCache,this.pageKidsCountCache=new _primitives.RefSetCache,this.pageIndexCache=new _primitives.RefSetCache,this.nonBlendModesSet=new _primitives.RefSet}get version(){const t=this._catDict.get("Version");return(0,_primitives.isName)(t)?(0,_util.shadow)(this,"version",t.name):(0,_util.shadow)(this,"version",null)}get needsRendering(){const t=this._catDict.get("NeedsRendering");return(0,_util.isBool)(t)?(0,_util.shadow)(this,"needsRendering",t):(0,_util.shadow)(this,"needsRendering",!1)}get collection(){let t=null;try{const e=this._catDict.get("Collection");(0,_primitives.isDict)(e)&&e.size>0&&(t=e)}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.info)("Cannot fetch Collection entry; assuming no collection is present.")}return(0,_util.shadow)(this,"collection",t)}get acroForm(){let t=null;try{const e=this._catDict.get("AcroForm");(0,_primitives.isDict)(e)&&e.size>0&&(t=e)}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.info)("Cannot fetch AcroForm entry; assuming no forms are present.")}return(0,_util.shadow)(this,"acroForm",t)}get acroFormRef(){const t=this._catDict.getRaw("AcroForm");return(0,_util.shadow)(this,"acroFormRef",(0,_primitives.isRef)(t)?t:null)}get metadata(){const t=this._catDict.getRaw("Metadata");if(!(0,_primitives.isRef)(t))return(0,_util.shadow)(this,"metadata",null);const e=!(this.xref.encrypt&&this.xref.encrypt.encryptMetadata),i=this.xref.fetch(t,e);let r=null;if((0,_primitives.isStream)(i)&&(0,_primitives.isDict)(i.dict)){const t=i.dict.get("Type"),e=i.dict.get("Subtype");if((0,_primitives.isName)(t,"Metadata")&&(0,_primitives.isName)(e,"XML"))try{const t=(0,_util.stringToUTF8String)(i.getString());t&&(r=new _metadata_parser.MetadataParser(t).serializable)}catch(s){if(s instanceof _core_utils.MissingDataException)throw s;(0,_util.info)("Skipping invalid metadata.")}}return(0,_util.shadow)(this,"metadata",r)}get markInfo(){let t=null;try{t=this._readMarkInfo()}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.warn)("Unable to read mark info.")}return(0,_util.shadow)(this,"markInfo",t)}_readMarkInfo(){const t=this._catDict.get("MarkInfo");if(!(0,_primitives.isDict)(t))return null;const e=Object.assign(Object.create(null),{Marked:!1,UserProperties:!1,Suspects:!1});for(const i in e){if(!t.has(i))continue;const r=t.get(i);(0,_util.isBool)(r)&&(e[i]=r)}return e}get structTreeRoot(){let t=null;try{t=this._readStructTreeRoot()}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.warn)("Unable read to structTreeRoot info.")}return(0,_util.shadow)(this,"structTreeRoot",t)}_readStructTreeRoot(){const t=this._catDict.get("StructTreeRoot");if(!(0,_primitives.isDict)(t))return null;const e=new _struct_tree.StructTreeRoot(t);return e.init(),e}get toplevelPagesDict(){const t=this._catDict.get("Pages");if(!(0,_primitives.isDict)(t))throw new _util.FormatError("Invalid top-level pages dictionary.");return(0,_util.shadow)(this,"toplevelPagesDict",t)}get documentOutline(){let t=null;try{t=this._readDocumentOutline()}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.warn)("Unable to read document outline.")}return(0,_util.shadow)(this,"documentOutline",t)}_readDocumentOutline(){let t=this._catDict.get("Outlines");if(!(0,_primitives.isDict)(t))return null;if(t=t.getRaw("First"),!(0,_primitives.isRef)(t))return null;const e={items:[]},i=[{obj:t,parent:e}],r=new _primitives.RefSet;r.put(t);const s=this.xref,n=new Uint8ClampedArray(3);while(i.length>0){const e=i.shift(),a=s.fetchIfRef(e.obj);if(null===a)continue;if(!a.has("Title"))throw new _util.FormatError("Invalid outline item encountered.");const o={url:null,dest:null};Catalog.parseDestDictionary({destDict:a,resultObj:o,docBaseUrl:this.pdfManager.docBaseUrl});const c=a.get("Title"),l=a.get("F")||0,u=a.getArray("C"),g=a.get("Count");let _=n;!Array.isArray(u)||3!==u.length||0===u[0]&&0===u[1]&&0===u[2]||(_=_colorspace.ColorSpace.singletons.rgb.getRgb(u,0));const f={dest:o.dest,url:o.url,unsafeUrl:o.unsafeUrl,newWindow:o.newWindow,title:(0,_util.stringToPDFString)(c),color:_,count:Number.isInteger(g)?g:void 0,bold:!!(2&l),italic:!!(1&l),items:[]};e.parent.items.push(f),t=a.getRaw("First"),(0,_primitives.isRef)(t)&&!r.has(t)&&(i.push({obj:t,parent:f}),r.put(t)),t=a.getRaw("Next"),(0,_primitives.isRef)(t)&&!r.has(t)&&(i.push({obj:t,parent:e.parent}),r.put(t))}return e.items.length>0?e.items:null}get permissions(){let t=null;try{t=this._readPermissions()}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.warn)("Unable to read permissions.")}return(0,_util.shadow)(this,"permissions",t)}_readPermissions(){const t=this.xref.trailer.get("Encrypt");if(!(0,_primitives.isDict)(t))return null;let e=t.get("P");if(!(0,_util.isNum)(e))return null;e+=2**32;const i=[];for(const r in _util.PermissionFlag){const t=_util.PermissionFlag[r];e&t&&i.push(t)}return i}get optionalContentConfig(){let t=null;try{const e=this._catDict.get("OCProperties");if(!e)return(0,_util.shadow)(this,"optionalContentConfig",null);const i=e.get("D");if(!i)return(0,_util.shadow)(this,"optionalContentConfig",null);const r=e.get("OCGs");if(!Array.isArray(r))return(0,_util.shadow)(this,"optionalContentConfig",null);const s=[],n=[];for(const t of r){if(!(0,_primitives.isRef)(t))continue;n.push(t);const e=this.xref.fetchIfRef(t);s.push({id:t.toString(),name:(0,_util.isString)(e.get("Name"))?(0,_util.stringToPDFString)(e.get("Name")):null,intent:(0,_util.isString)(e.get("Intent"))?(0,_util.stringToPDFString)(e.get("Intent")):null})}t=this._readOptionalContentConfig(i,n),t.groups=s}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.warn)(`Unable to read optional content config: ${e}`)}return(0,_util.shadow)(this,"optionalContentConfig",t)}_readOptionalContentConfig(t,e){function i(t){const i=[];if(Array.isArray(t))for(const r of t)(0,_primitives.isRef)(r)&&e.includes(r)&&i.push(r.toString());return i}function r(t,i=0){if(!Array.isArray(t))return null;const r=[];for(const o of t){if((0,_primitives.isRef)(o)&&e.includes(o)){a.put(o),r.push(o.toString());continue}const t=s(o,i);t&&r.push(t)}if(i>0)return r;const n=[];for(const s of e)a.has(s)||n.push(s.toString());return n.length&&r.push({name:null,order:n}),r}function s(t,e){if(++e>o)return(0,_util.warn)("parseNestedOrder - reached MAX_NESTED_LEVELS."),null;const i=n.fetchIfRef(t);if(!Array.isArray(i))return null;const s=n.fetchIfRef(i[0]);if("string"!==typeof s)return null;const a=r(i.slice(1),e);return a&&a.length?{name:(0,_util.stringToPDFString)(s),order:a}:null}const n=this.xref,a=new _primitives.RefSet,o=10;return{name:(0,_util.isString)(t.get("Name"))?(0,_util.stringToPDFString)(t.get("Name")):null,creator:(0,_util.isString)(t.get("Creator"))?(0,_util.stringToPDFString)(t.get("Creator")):null,baseState:(0,_primitives.isName)(t.get("BaseState"))?t.get("BaseState").name:null,on:i(t.get("ON")),off:i(t.get("OFF")),order:r(t.get("Order")),groups:null}}get numPages(){const t=this.toplevelPagesDict.get("Count");if(!Number.isInteger(t))throw new _util.FormatError("Page count in top-level pages dictionary is not an integer.");return(0,_util.shadow)(this,"numPages",t)}get destinations(){const t=this._readDests(),e=Object.create(null);if(t instanceof _name_number_tree.NameTree)for(const[i,r]of t.getAll()){const t=fetchDestination(r);t&&(e[i]=t)}else t instanceof _primitives.Dict&&t.forEach((function(t,i){const r=fetchDestination(i);r&&(e[t]=r)}));return(0,_util.shadow)(this,"destinations",e)}getDestination(t){const e=this._readDests();if(e instanceof _name_number_tree.NameTree){const i=fetchDestination(e.get(t));if(i)return i;const r=this.destinations[t];if(r)return(0,_util.warn)(`Found "${t}" at an incorrect position in the NameTree.`),r}else if(e instanceof _primitives.Dict){const i=fetchDestination(e.get(t));if(i)return i}return null}_readDests(){const t=this._catDict.get("Names");return t&&t.has("Dests")?new _name_number_tree.NameTree(t.getRaw("Dests"),this.xref):this._catDict.has("Dests")?this._catDict.get("Dests"):void 0}get pageLabels(){let t=null;try{t=this._readPageLabels()}catch(e){if(e instanceof _core_utils.MissingDataException)throw e;(0,_util.warn)("Unable to read page labels.")}return(0,_util.shadow)(this,"pageLabels",t)}_readPageLabels(){const t=this._catDict.getRaw("PageLabels");if(!t)return null;const e=new Array(this.numPages);let i=null,r="";const s=new _name_number_tree.NumberTree(t,this.xref),n=s.getAll();let a="",o=1;for(let c=0,l=this.numPages;c<l;c++){const t=n.get(c);if(void 0!==t){if(!(0,_primitives.isDict)(t))throw new _util.FormatError("PageLabel is not a dictionary.");if(t.has("Type")&&!(0,_primitives.isName)(t.get("Type"),"PageLabel"))throw new _util.FormatError("Invalid type in PageLabel dictionary.");if(t.has("S")){const e=t.get("S");if(!(0,_primitives.isName)(e))throw new _util.FormatError("Invalid style in PageLabel dictionary.");i=e.name}else i=null;if(t.has("P")){const e=t.get("P");if(!(0,_util.isString)(e))throw new _util.FormatError("Invalid prefix in PageLabel dictionary.");r=(0,_util.stringToPDFString)(e)}else r="";if(t.has("St")){const e=t.get("St");if(!(Number.isInteger(e)&&e>=1))throw new _util.FormatError("Invalid start in PageLabel dictionary.");o=e}else o=1}switch(i){case"D":a=o;break;case"R":case"r":a=(0,_core_utils.toRomanNumerals)(o,"r"===i);break;case"A":case"a":const t=26,e=65,r=97,s="a"===i?r:e,n=o-1,c=String.fromCharCode(s+n%t),l=[];for(let i=0,a=n/t|0;i<=a;i++)l.push(c);a=l.join("");break;default:if(i)throw new _util.FormatError(`Invalid style "${i}" in PageLabel dictionary.`);a=""}e[c]=r+a,o++}return e}get pageLayout(){const t=this._catDict.get("PageLayout");let e="";if((0,_primitives.isName)(t))switch(t.name){case"SinglePage":case"OneColumn":case"TwoColumnLeft":case"TwoColumnRight":case"TwoPageLeft":case"TwoPageRight":e=t.name}return(0,_util.shadow)(this,"pageLayout",e)}get pageMode(){const t=this._catDict.get("PageMode");let e="UseNone";if((0,_primitives.isName)(t))switch(t.name){case"UseNone":case"UseOutlines":case"UseThumbs":case"FullScreen":case"UseOC":case"UseAttachments":e=t.name}return(0,_util.shadow)(this,"pageMode",e)}get viewerPreferences(){const t={HideToolbar:_util.isBool,HideMenubar:_util.isBool,HideWindowUI:_util.isBool,FitWindow:_util.isBool,CenterWindow:_util.isBool,DisplayDocTitle:_util.isBool,NonFullScreenPageMode:_primitives.isName,Direction:_primitives.isName,ViewArea:_primitives.isName,ViewClip:_primitives.isName,PrintArea:_primitives.isName,PrintClip:_primitives.isName,PrintScaling:_primitives.isName,Duplex:_primitives.isName,PickTrayByPDFSize:_util.isBool,PrintPageRange:Array.isArray,NumCopies:Number.isInteger},e=this._catDict.get("ViewerPreferences");let i=null;if((0,_primitives.isDict)(e))for(const r in t){if(!e.has(r))continue;const s=e.get(r);if(!t[r](s)){(0,_util.info)(`Bad value in ViewerPreferences for "${r}".`);continue}let n;switch(r){case"NonFullScreenPageMode":switch(s.name){case"UseNone":case"UseOutlines":case"UseThumbs":case"UseOC":n=s.name;break;default:n="UseNone"}break;case"Direction":switch(s.name){case"L2R":case"R2L":n=s.name;break;default:n="L2R"}break;case"ViewArea":case"ViewClip":case"PrintArea":case"PrintClip":switch(s.name){case"MediaBox":case"CropBox":case"BleedBox":case"TrimBox":case"ArtBox":n=s.name;break;default:n="CropBox"}break;case"PrintScaling":switch(s.name){case"None":case"AppDefault":n=s.name;break;default:n="AppDefault"}break;case"Duplex":switch(s.name){case"Simplex":case"DuplexFlipShortEdge":case"DuplexFlipLongEdge":n=s.name;break;default:n="None"}break;case"PrintPageRange":const t=s.length;if(t%2!==0)break;const e=s.every(((t,e,i)=>Number.isInteger(t)&&t>0&&(0===e||t>=i[e-1])&&t<=this.numPages));e&&(n=s);break;case"NumCopies":s>0&&(n=s);break;default:if("boolean"!==typeof s)throw new _util.FormatError(`viewerPreferences - expected a boolean value for: ${r}`);n=s}void 0!==n?(i||(i=Object.create(null)),i[r]=n):(0,_util.info)(`Bad value in ViewerPreferences for "${r}".`)}return(0,_util.shadow)(this,"viewerPreferences",i)}get openAction(){const t=this._catDict.get("OpenAction"),e=Object.create(null);if((0,_primitives.isDict)(t)){const i=new _primitives.Dict(this.xref);i.set("A",t);const r={url:null,dest:null,action:null};Catalog.parseDestDictionary({destDict:i,resultObj:r}),Array.isArray(r.dest)?e.dest=r.dest:r.action&&(e.action=r.action)}else Array.isArray(t)&&(e.dest=t);return(0,_util.shadow)(this,"openAction",(0,_util.objectSize)(e)>0?e:null)}get attachments(){const t=this._catDict.get("Names");let e=null;if(t instanceof _primitives.Dict&&t.has("EmbeddedFiles")){const i=new _name_number_tree.NameTree(t.getRaw("EmbeddedFiles"),this.xref);for(const[t,r]of i.getAll()){const i=new _file_spec.FileSpec(r,this.xref);e||(e=Object.create(null)),e[(0,_util.stringToPDFString)(t)]=i.serializable}}return(0,_util.shadow)(this,"attachments",e)}get xfaImages(){const t=this._catDict.get("Names");let e=null;if(t instanceof _primitives.Dict&&t.has("XFAImages")){const i=new _name_number_tree.NameTree(t.getRaw("XFAImages"),this.xref);for(const[t,r]of i.getAll())e||(e=new _primitives.Dict(this.xref)),e.set(t,r)}return(0,_util.shadow)(this,"xfaImages",e)}_collectJavaScript(){const t=this._catDict.get("Names");let e=null;function i(t,i){if(!(i instanceof _primitives.Dict))return;if(!(0,_primitives.isName)(i.get("S"),"JavaScript"))return;let r=i.get("JS");if((0,_primitives.isStream)(r))r=r.getString();else if("string"!==typeof r)return;null===e&&(e=new Map),e.set(t,(0,_util.stringToPDFString)(r))}if(t instanceof _primitives.Dict&&t.has("JavaScript")){const e=new _name_number_tree.NameTree(t.getRaw("JavaScript"),this.xref);for(const[t,r]of e.getAll())i(t,r)}const r=this._catDict.get("OpenAction");return r&&i("OpenAction",r),e}get javaScript(){const t=this._collectJavaScript();return(0,_util.shadow)(this,"javaScript",t?[...t.values()]:null)}get jsActions(){const t=this._collectJavaScript();let e=(0,_core_utils.collectActions)(this.xref,this._catDict,_util.DocumentActionEventType);if(t){e||(e=Object.create(null));for(const[i,r]of t)i in e?e[i].push(r):e[i]=[r]}return(0,_util.shadow)(this,"jsActions",e)}fontFallback(t,e){const i=[];return this.fontCache.forEach((function(t){i.push(t)})),Promise.all(i).then((i=>{for(const r of i)if(r.loadedName===t)return void r.fallback(e)}))}cleanup(t=!1){(0,_primitives.clearPrimitiveCaches)(),this.globalImageCache.clear(t),this.pageKidsCountCache.clear(),this.pageIndexCache.clear(),this.nonBlendModesSet.clear();const e=[];return this.fontCache.forEach((function(t){e.push(t)})),Promise.all(e).then((t=>{for(const{dict:e}of t)delete e.cacheKey;this.fontCache.clear(),this.builtInCMapCache.clear(),this.standardFontDataCache.clear()}))}getPageDict(t){const e=(0,_util.createPromiseCapability)(),i=[this._catDict.getRaw("Pages")],r=new _primitives.RefSet,s=this.xref,n=this.pageKidsCountCache;let a,o=0;function c(){while(i.length){const l=i.pop();if((0,_primitives.isRef)(l)){if(a=n.get(l),a>0&&o+a<t){o+=a;continue}return r.has(l)?void e.reject(new _util.FormatError("Pages tree contains circular reference.")):(r.put(l),void s.fetchAsync(l).then((function(r){(0,_primitives.isDict)(r,"Page")||(0,_primitives.isDict)(r)&&!r.has("Kids")?t===o?(l&&!n.has(l)&&n.put(l,1),e.resolve([r,l])):(o++,c()):(i.push(r),c())}),e.reject))}if(!(0,_primitives.isDict)(l))return void e.reject(new _util.FormatError("Page dictionary kid reference points to wrong type of object."));if(a=l.get("Count"),Number.isInteger(a)&&a>=0){const e=l.objId;if(e&&!n.has(e)&&n.put(e,a),o+a<=t){o+=a;continue}}const u=l.get("Kids");if(!Array.isArray(u)){if((0,_primitives.isName)(l.get("Type"),"Page")||!l.has("Type")&&l.has("Contents")){if(o===t)return void e.resolve([l,null]);o++;continue}return void e.reject(new _util.FormatError("Page dictionary kids object is not an array."))}for(let t=u.length-1;t>=0;t--)i.push(u[t])}e.reject(new Error(`Page index ${t} not found.`))}return c(),e.promise}getPageIndex(t){const e=this.pageIndexCache.get(t);if(void 0!==e)return Promise.resolve(e);const i=this.xref;function r(e){let r,s=0;return i.fetchAsync(e).then((function(i){if((0,_primitives.isRefsEqual)(e,t)&&!(0,_primitives.isDict)(i,"Page")&&(!(0,_primitives.isDict)(i)||i.has("Type")||!i.has("Contents")))throw new _util.FormatError("The reference does not point to a /Page dictionary.");if(!i)return null;if(!(0,_primitives.isDict)(i))throw new _util.FormatError("Node must be a dictionary.");return r=i.getRaw("Parent"),i.getAsync("Parent")})).then((function(t){if(!t)return null;if(!(0,_primitives.isDict)(t))throw new _util.FormatError("Parent must be a dictionary.");return t.getAsync("Kids")})).then((function(t){if(!t)return null;const n=[];let a=!1;for(let r=0,o=t.length;r<o;r++){const o=t[r];if(!(0,_primitives.isRef)(o))throw new _util.FormatError("Kid must be a reference.");if((0,_primitives.isRefsEqual)(o,e)){a=!0;break}n.push(i.fetchAsync(o).then((function(t){if(!(0,_primitives.isDict)(t))throw new _util.FormatError("Kid node must be a dictionary.");t.has("Count")?s+=t.get("Count"):s++})))}if(!a)throw new _util.FormatError("Kid reference not found in parent's kids.");return Promise.all(n).then((function(){return[s,r]}))}))}let s=0;const n=e=>r(e).then((e=>{if(!e)return this.pageIndexCache.put(t,s),s;const[i,r]=e;return s+=i,n(r)}));return n(t)}static parseDestDictionary(t){const e=t.destDict;if(!(0,_primitives.isDict)(e))return void(0,_util.warn)("parseDestDictionary: `destDict` must be a dictionary.");const i=t.resultObj;if("object"!==typeof i)return void(0,_util.warn)("parseDestDictionary: `resultObj` must be an object.");const r=t.docBaseUrl||null;let s,n,a=e.get("A");if((0,_primitives.isDict)(a)||(e.has("Dest")?a=e.get("Dest"):(a=e.get("AA"),(0,_primitives.isDict)(a)&&(a.has("D")?a=a.get("D"):a.has("U")&&(a=a.get("U"))))),(0,_primitives.isDict)(a)){const t=a.get("S");if(!(0,_primitives.isName)(t))return void(0,_util.warn)("parseDestDictionary: Invalid type in Action dictionary.");const e=t.name;switch(e){case"ResetForm":const t=a.get("Flags"),r=0===(1&((0,_util.isNum)(t)?t:0)),o=[],c=[];for(const e of a.get("Fields")||[])(0,_primitives.isRef)(e)?c.push(e.toString()):(0,_util.isString)(e)&&o.push((0,_util.stringToPDFString)(e));i.resetForm={fields:o,refs:c,include:r};break;case"URI":s=a.get("URI"),s instanceof _primitives.Name&&(s="/"+s.name);break;case"GoTo":n=a.get("D");break;case"Launch":case"GoToR":const l=a.get("F");(0,_primitives.isDict)(l)?s=l.get("F")||null:(0,_util.isString)(l)&&(s=l);let u=a.get("D");if(u&&((0,_primitives.isName)(u)&&(u=u.name),(0,_util.isString)(s))){const t=s.split("#")[0];(0,_util.isString)(u)?s=t+"#"+u:Array.isArray(u)&&(s=t+"#"+JSON.stringify(u))}const g=a.get("NewWindow");(0,_util.isBool)(g)&&(i.newWindow=g);break;case"Named":const _=a.get("N");(0,_primitives.isName)(_)&&(i.action=_.name);break;case"JavaScript":const f=a.get("JS");let h;(0,_primitives.isStream)(f)?h=f.getString():(0,_util.isString)(f)&&(h=f);const m=h&&(0,_core_utils.recoverJsURL)((0,_util.stringToPDFString)(h));if(m){s=m.url,i.newWindow=m.newWindow;break}default:if("JavaScript"===e||"SubmitForm"===e)break;(0,_util.warn)(`parseDestDictionary - unsupported action: "${e}".`);break}}else e.has("Dest")&&(n=e.get("Dest"));if((0,_util.isString)(s)){const t=(0,_util.createValidAbsoluteUrl)(s,r,{addDefaultProtocol:!0,tryConvertEncoding:!0});t&&(i.url=t.href),i.unsafeUrl=s}n&&((0,_primitives.isName)(n)&&(n=n.name),((0,_util.isString)(n)||Array.isArray(n))&&(i.dest=n))}}exports.Catalog=Catalog;