"use strict";var _dom_utils=require("../../display/dom_utils"),_is_node=require("../../shared/is_node"),_is_node2=_interopRequireDefault(_is_node);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}describe("dom_utils",(function(){describe("DOMSVGFactory",(function(){var e=void 0;beforeAll((function(t){e=new _dom_utils.DOMSVGFactory,t()})),afterAll((function(){e=null})),it("`create` should throw an error if the dimensions are invalid",(function(){expect((function(){return e.create(-1,0)})).toThrow(new Error("Invalid SVG dimensions")),expect((function(){return e.create(0,-1)})).toThrow(new Error("Invalid SVG dimensions"))})),it("`create` should return an SVG element if the dimensions are valid",(function(){(0,_is_node2.default)()&&pending("Document is not supported in Node.js.");var t=e.create(20,40);expect(t instanceof SVGSVGElement).toBe(!0),expect(t.getAttribute("version")).toBe("1.1"),expect(t.getAttribute("width")).toBe("20px"),expect(t.getAttribute("height")).toBe("40px"),expect(t.getAttribute("preserveAspectRatio")).toBe("none"),expect(t.getAttribute("viewBox")).toBe("0 0 20 40")})),it("`createElement` should throw an error if the type is not a string",(function(){expect((function(){return e.createElement(!0)})).toThrow(new Error("Invalid SVG element type"))})),it("`createElement` should return an SVG element if the type is valid",(function(){(0,_is_node2.default)()&&pending("Document is not supported in Node.js.");var t=e.createElement("svg:rect");expect(t instanceof SVGRectElement).toBe(!0)}))})),describe("getFilenameFromUrl",(function(){it("should get the filename from an absolute URL",(function(){var e="http://server.org/filename.pdf",t=(0,_dom_utils.getFilenameFromUrl)(e),n="filename.pdf";expect(t).toEqual(n)})),it("should get the filename from a relative URL",(function(){var e="../../filename.pdf",t=(0,_dom_utils.getFilenameFromUrl)(e),n="filename.pdf";expect(t).toEqual(n)}))}))}));