"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addHTML=addHTML,exports.checkDimensions=checkDimensions,exports.flushHTML=flushHTML,exports.getAvailableSpace=getAvailableSpace;var _xfa_object=require("./xfa_object.js"),_html_utils=require("./html_utils.js");function createLine(t,e){return{name:"div",attributes:{class:["lr-tb"===t.layout?"xfaLr":"xfaRl"]},children:e}}function flushHTML(t){if(!t[_xfa_object.$extra])return null;const e=t[_xfa_object.$extra].attributes,a={name:"div",attributes:e,children:t[_xfa_object.$extra].children};if(t[_xfa_object.$extra].failingNode){const e=t[_xfa_object.$extra].failingNode[_xfa_object.$flushHTML]();e&&(t.layout.endsWith("-tb")?a.children.push(createLine(t,[e])):a.children.push(e))}return 0===a.children.length?null:a}function addHTML(t,e,a){const r=t[_xfa_object.$extra],h=r.availableSpace,[i,o,n,c]=a;switch(t.layout){case"position":r.width=Math.max(r.width,i+n),r.height=Math.max(r.height,o+c),r.children.push(e);break;case"lr-tb":case"rl-tb":r.line&&1!==r.attempt||(r.line=createLine(t,[]),r.children.push(r.line),r.numberInLine=0),r.numberInLine+=1,r.line.children.push(e),0===r.attempt?(r.currentWidth+=n,r.height=Math.max(r.height,r.prevHeight+c)):(r.currentWidth=n,r.prevHeight=r.height,r.height+=c,r.attempt=0),r.width=Math.max(r.width,r.currentWidth);break;case"rl-row":case"row":{r.children.push(e),r.width+=n,r.height=Math.max(r.height,c);const t=(0,_html_utils.measureToString)(r.height);for(const e of r.children)e.attributes.style.height=t;break}case"table":r.width=Math.min(h.width,Math.max(r.width,n)),r.height+=c,r.children.push(e);break;case"tb":r.width=h.width,r.height+=c,r.children.push(e);break}}function getAvailableSpace(t){const e=t[_xfa_object.$extra].availableSpace,a=t.margin?t.margin.topInset+t.margin.bottomInset:0,r=t.margin?t.margin.leftInset+t.margin.rightInset:0;switch(t.layout){case"lr-tb":case"rl-tb":return 0===t[_xfa_object.$extra].attempt?{width:e.width-r-t[_xfa_object.$extra].currentWidth,height:e.height-a-t[_xfa_object.$extra].prevHeight}:{width:e.width-r,height:e.height-a-t[_xfa_object.$extra].height};case"rl-row":case"row":const h=t[_xfa_object.$extra].columnWidths.slice(t[_xfa_object.$extra].currentColumn).reduce(((t,e)=>t+e));return{width:h,height:e.height-r};case"table":case"tb":return{width:e.width-r,height:e.height-a-t[_xfa_object.$extra].height};case"position":default:return e}}function getTransformedBBox(t){let e,a,r=""===t.w?NaN:t.w,h=""===t.h?NaN:t.h,[i,o]=[0,0];switch(t.anchorType||""){case"bottomCenter":[i,o]=[r/2,h];break;case"bottomLeft":[i,o]=[0,h];break;case"bottomRight":[i,o]=[r,h];break;case"middleCenter":[i,o]=[r/2,h/2];break;case"middleLeft":[i,o]=[0,h/2];break;case"middleRight":[i,o]=[r,h/2];break;case"topCenter":[i,o]=[r/2,0];break;case"topRight":[i,o]=[r,0];break}switch(t.rotate||0){case 0:[e,a]=[-i,-o];break;case 90:[e,a]=[-o,i],[r,h]=[h,-r];break;case 180:[e,a]=[i,o],[r,h]=[-r,-h];break;case 270:[e,a]=[o,-i],[r,h]=[-h,r];break}return[t.x+e+Math.min(0,r),t.y+a+Math.min(0,h),Math.abs(r),Math.abs(h)]}function checkDimensions(t,e){if(null===t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].firstUnsplittable)return!0;if(0===t.w||0===t.h)return!0;const a=2,r=t[_xfa_object.$getSubformParent](),h=r[_xfa_object.$extra]&&r[_xfa_object.$extra].attempt||0,[,i,o,n]=getTransformedBBox(t);switch(r.layout){case"lr-tb":case"rl-tb":return 0===h?t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure?""!==t.w?Math.round(o-e.width)<=a:e.width>a:!(""!==t.h&&Math.round(n-e.height)>a)&&(""!==t.w?Math.round(o-e.width)<=a||0===r[_xfa_object.$extra].numberInLine&&e.height>a:e.width>a):!!t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure||!(""!==t.h&&Math.round(n-e.height)>a)&&((""===t.w||Math.round(o-e.width)<=a||!r[_xfa_object.$isThereMoreWidth]())&&e.height>a);case"table":case"tb":return!!t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure||(""===t.h||t[_xfa_object.$isSplittable]()?(""===t.w||Math.round(o-e.width)<=a||!r[_xfa_object.$isThereMoreWidth]())&&e.height>a:Math.round(n-e.height)<=a);case"position":if(t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure)return!0;if(""===t.h||Math.round(n+i-e.height)<=a)return!0;const c=t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].currentContentArea;return n+i>c.h;case"rl-row":case"row":return!!t[_xfa_object.$getTemplateRoot]()[_xfa_object.$extra].noLayoutFailure||(""===t.h||Math.round(n-e.height)<=a);default:return!0}}