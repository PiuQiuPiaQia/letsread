"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getXfaFontDict=getXfaFontDict,exports.getXfaFontName=getXfaFontName;var _calibri_factors=require("./calibri_factors.js"),_primitives=require("./primitives.js"),_helvetica_factors=require("./helvetica_factors.js"),_liberationsans_widths=require("./liberationsans_widths.js"),_myriadpro_factors=require("./myriadpro_factors.js"),_segoeui_factors=require("./segoeui_factors.js"),_core_utils=require("./core_utils.js"),_fonts_utils=require("./fonts_utils.js");const getXFAFontMap=(0,_core_utils.getLookupTableFactory)((function(i){i["MyriadPro-Regular"]=i["PdfJS-Fallback-Regular"]={name:"LiberationSans-Regular",factors:_myriadpro_factors.MyriadProRegularFactors,baseWidths:_liberationsans_widths.LiberationSansRegularWidths,baseMapping:_liberationsans_widths.LiberationSansRegularMapping,metrics:_myriadpro_factors.MyriadProRegularMetrics},i["MyriadPro-Bold"]=i["PdfJS-Fallback-Bold"]={name:"LiberationSans-Bold",factors:_myriadpro_factors.MyriadProBoldFactors,baseWidths:_liberationsans_widths.LiberationSansBoldWidths,baseMapping:_liberationsans_widths.LiberationSansBoldMapping,metrics:_myriadpro_factors.MyriadProBoldMetrics},i["MyriadPro-It"]=i["MyriadPro-Italic"]=i["PdfJS-Fallback-Italic"]={name:"LiberationSans-Italic",factors:_myriadpro_factors.MyriadProItalicFactors,baseWidths:_liberationsans_widths.LiberationSansItalicWidths,baseMapping:_liberationsans_widths.LiberationSansItalicMapping,metrics:_myriadpro_factors.MyriadProItalicMetrics},i["MyriadPro-BoldIt"]=i["MyriadPro-BoldItalic"]=i["PdfJS-Fallback-BoldItalic"]={name:"LiberationSans-BoldItalic",factors:_myriadpro_factors.MyriadProBoldItalicFactors,baseWidths:_liberationsans_widths.LiberationSansBoldItalicWidths,baseMapping:_liberationsans_widths.LiberationSansBoldItalicMapping,metrics:_myriadpro_factors.MyriadProBoldItalicMetrics},i.ArialMT=i.Arial=i["Arial-Regular"]={name:"LiberationSans-Regular",baseWidths:_liberationsans_widths.LiberationSansRegularWidths,baseMapping:_liberationsans_widths.LiberationSansRegularMapping},i["Arial-BoldMT"]=i["Arial-Bold"]={name:"LiberationSans-Bold",baseWidths:_liberationsans_widths.LiberationSansBoldWidths,baseMapping:_liberationsans_widths.LiberationSansBoldMapping},i["Arial-ItalicMT"]=i["Arial-Italic"]={name:"LiberationSans-Italic",baseWidths:_liberationsans_widths.LiberationSansItalicWidths,baseMapping:_liberationsans_widths.LiberationSansItalicMapping},i["Arial-BoldItalicMT"]=i["Arial-BoldItalic"]={name:"LiberationSans-BoldItalic",baseWidths:_liberationsans_widths.LiberationSansBoldItalicWidths,baseMapping:_liberationsans_widths.LiberationSansBoldItalicMapping},i["Calibri-Regular"]={name:"LiberationSans-Regular",factors:_calibri_factors.CalibriRegularFactors,baseWidths:_liberationsans_widths.LiberationSansRegularWidths,baseMapping:_liberationsans_widths.LiberationSansRegularMapping,metrics:_calibri_factors.CalibriRegularMetrics},i["Calibri-Bold"]={name:"LiberationSans-Bold",factors:_calibri_factors.CalibriBoldFactors,baseWidths:_liberationsans_widths.LiberationSansBoldWidths,baseMapping:_liberationsans_widths.LiberationSansBoldMapping,metrics:_calibri_factors.CalibriBoldMetrics},i["Calibri-Italic"]={name:"LiberationSans-Italic",factors:_calibri_factors.CalibriItalicFactors,baseWidths:_liberationsans_widths.LiberationSansItalicWidths,baseMapping:_liberationsans_widths.LiberationSansItalicMapping,metrics:_calibri_factors.CalibriItalicMetrics},i["Calibri-BoldItalic"]={name:"LiberationSans-BoldItalic",factors:_calibri_factors.CalibriBoldItalicFactors,baseWidths:_liberationsans_widths.LiberationSansBoldItalicWidths,baseMapping:_liberationsans_widths.LiberationSansBoldItalicMapping,metrics:_calibri_factors.CalibriBoldItalicMetrics},i["Segoeui-Regular"]={name:"LiberationSans-Regular",factors:_segoeui_factors.SegoeuiRegularFactors,baseWidths:_liberationsans_widths.LiberationSansRegularWidths,baseMapping:_liberationsans_widths.LiberationSansRegularMapping,metrics:_segoeui_factors.SegoeuiRegularMetrics},i["Segoeui-Bold"]={name:"LiberationSans-Bold",factors:_segoeui_factors.SegoeuiBoldFactors,baseWidths:_liberationsans_widths.LiberationSansBoldWidths,baseMapping:_liberationsans_widths.LiberationSansBoldMapping,metrics:_segoeui_factors.SegoeuiBoldMetrics},i["Segoeui-Italic"]={name:"LiberationSans-Italic",factors:_segoeui_factors.SegoeuiItalicFactors,baseWidths:_liberationsans_widths.LiberationSansItalicWidths,baseMapping:_liberationsans_widths.LiberationSansItalicMapping,metrics:_segoeui_factors.SegoeuiItalicMetrics},i["Segoeui-BoldItalic"]={name:"LiberationSans-BoldItalic",factors:_segoeui_factors.SegoeuiBoldItalicFactors,baseWidths:_liberationsans_widths.LiberationSansBoldItalicWidths,baseMapping:_liberationsans_widths.LiberationSansBoldItalicMapping,metrics:_segoeui_factors.SegoeuiBoldItalicMetrics},i["Helvetica-Regular"]=i.Helvetica={name:"LiberationSans-Regular",factors:_helvetica_factors.HelveticaRegularFactors,baseWidths:_liberationsans_widths.LiberationSansRegularWidths,baseMapping:_liberationsans_widths.LiberationSansRegularMapping,metrics:_helvetica_factors.HelveticaRegularMetrics},i["Helvetica-Bold"]={name:"LiberationSans-Bold",factors:_helvetica_factors.HelveticaBoldFactors,baseWidths:_liberationsans_widths.LiberationSansBoldWidths,baseMapping:_liberationsans_widths.LiberationSansBoldMapping,metrics:_helvetica_factors.HelveticaBoldMetrics},i["Helvetica-Italic"]={name:"LiberationSans-Italic",factors:_helvetica_factors.HelveticaItalicFactors,baseWidths:_liberationsans_widths.LiberationSansItalicWidths,baseMapping:_liberationsans_widths.LiberationSansItalicMapping,metrics:_helvetica_factors.HelveticaItalicMetrics},i["Helvetica-BoldItalic"]={name:"LiberationSans-BoldItalic",factors:_helvetica_factors.HelveticaBoldItalicFactors,baseWidths:_liberationsans_widths.LiberationSansBoldItalicWidths,baseMapping:_liberationsans_widths.LiberationSansBoldItalicMapping,metrics:_helvetica_factors.HelveticaBoldItalicMetrics}}));function getXfaFontName(i){const a=(0,_fonts_utils.normalizeFontName)(i),t=getXFAFontMap();return t[a]}function getXfaFontWidths(i){const a=getXfaFontName(i);if(!a)return null;const{baseWidths:t,baseMapping:s,factors:e}=a;let r;r=e?t.map(((i,a)=>i*e[a])):t;let o,n=-2;const l=[];for(const[c,d]of s.map(((i,a)=>[i,a])).sort((([i],[a])=>i-a)))-1!==c&&(c===n+1?(o.push(r[d]),n+=1):(n=c,o=[r[d]],l.push(c,o)));return l}function getXfaFontDict(i){const a=getXfaFontWidths(i),t=new _primitives.Dict(null);t.set("BaseFont",_primitives.Name.get(i)),t.set("Type",_primitives.Name.get("Font")),t.set("Subtype",_primitives.Name.get("CIDFontType2")),t.set("Encoding",_primitives.Name.get("Identity-H")),t.set("CIDToGIDMap",_primitives.Name.get("Identity")),t.set("W",a),t.set("FirstChar",a[0]),t.set("LastChar",a[a.length-2]+a[a.length-1].length-1);const s=new _primitives.Dict(null);t.set("FontDescriptor",s);const e=new _primitives.Dict(null);return e.set("Ordering","Identity"),e.set("Registry","Adobe"),e.set("Supplement",0),t.set("CIDSystemInfo",e),t}