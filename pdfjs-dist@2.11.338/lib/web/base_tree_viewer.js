"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BaseTreeViewer=void 0;var _pdf=require("../pdf");const TREEITEM_OFFSET_TOP=-100,TREEITEM_SELECTED_CLASS="selected";class BaseTreeViewer{constructor(e){if(this.constructor===BaseTreeViewer)throw new Error("Cannot initialize BaseTreeViewer.");this.container=e.container,this.eventBus=e.eventBus,this.reset()}reset(){this._pdfDocument=null,this._lastToggleIsShow=!0,this._currentTreeItem=null,this.container.textContent="",this.container.classList.remove("treeWithDeepNesting")}_dispatchEvent(e){throw new Error("Not implemented: _dispatchEvent")}_bindLink(e,t){throw new Error("Not implemented: _bindLink")}_normalizeTextContent(e){return(0,_pdf.removeNullCharacters)(e)||"\u2013"}_addToggleButton(e,t=!1){const r=document.createElement("div");r.className="treeItemToggler",t&&r.classList.add("treeItemsHidden"),r.onclick=t=>{if(t.stopPropagation(),r.classList.toggle("treeItemsHidden"),t.shiftKey){const t=!r.classList.contains("treeItemsHidden");this._toggleTreeItem(e,t)}},e.insertBefore(r,e.firstChild)}_toggleTreeItem(e,t=!1){this._lastToggleIsShow=t;for(const r of e.querySelectorAll(".treeItemToggler"))r.classList.toggle("treeItemsHidden",!t)}_toggleAllTreeItems(){this._toggleTreeItem(this.container,!this._lastToggleIsShow)}_finishRendering(e,t,r=!1){r&&(this.container.classList.add("treeWithDeepNesting"),this._lastToggleIsShow=!e.querySelector(".treeItemsHidden")),this.container.appendChild(e),this._dispatchEvent(t)}render(e){throw new Error("Not implemented: render")}_updateCurrentTreeItem(e=null){this._currentTreeItem&&(this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS),this._currentTreeItem=null),e&&(e.classList.add(TREEITEM_SELECTED_CLASS),this._currentTreeItem=e)}_scrollToCurrentTreeItem(e){if(!e)return;let t=e.parentNode;while(t&&t!==this.container){if(t.classList.contains("treeItem")){const e=t.firstElementChild;e?.classList.remove("treeItemsHidden")}t=t.parentNode}this._updateCurrentTreeItem(e),this.container.scrollTo(e.offsetLeft,e.offsetTop+TREEITEM_OFFSET_TOP)}}exports.BaseTreeViewer=BaseTreeViewer;