"use strict";var _cmap=require("../../core/cmap"),_dom_utils=require("../../display/dom_utils"),_is_node=require("../../shared/is_node"),_is_node2=_interopRequireDefault(_is_node),_primitives=require("../../core/primitives"),_test_utils=require("./test_utils"),_stream=require("../../core/stream");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var cMapUrl={dom:"../../external/bcmaps/",node:"./external/bcmaps/"},cMapPacked=!0;describe("cmap",(function(){var e;beforeAll((function(t){var a;a=(0,_is_node2.default)()?new _test_utils.NodeCMapReaderFactory({baseUrl:cMapUrl.node,isCompressed:cMapPacked}):new _dom_utils.DOMCMapReaderFactory({baseUrl:cMapUrl.dom,isCompressed:cMapPacked}),e=function(e){return a.fetch({name:e})},t()})),afterAll((function(){e=null})),it("parses beginbfchar",(function(e){var t="2 beginbfchar\n<03> <00>\n<04> <01>\nendbfchar\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.lookup(3)).toEqual(String.fromCharCode(0)),expect(t.lookup(4)).toEqual(String.fromCharCode(1)),expect(t.lookup(5)).toBeUndefined(),e()})).catch((function(t){e.fail(t)}))})),it("parses beginbfrange with range",(function(e){var t="1 beginbfrange\n<06> <0B> 0\nendbfrange\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.lookup(5)).toBeUndefined(),expect(t.lookup(6)).toEqual(String.fromCharCode(0)),expect(t.lookup(11)).toEqual(String.fromCharCode(5)),expect(t.lookup(12)).toBeUndefined(),e()})).catch((function(t){e.fail(t)}))})),it("parses beginbfrange with array",(function(e){var t="1 beginbfrange\n<0D> <12> [ 0 1 2 3 4 5 ]\nendbfrange\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.lookup(12)).toBeUndefined(),expect(t.lookup(13)).toEqual(0),expect(t.lookup(18)).toEqual(5),expect(t.lookup(19)).toBeUndefined(),e()})).catch((function(t){e.fail(t)}))})),it("parses begincidchar",(function(e){var t="1 begincidchar\n<14> 0\nendcidchar\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.lookup(20)).toEqual(0),expect(t.lookup(21)).toBeUndefined(),e()})).catch((function(t){e.fail(t)}))})),it("parses begincidrange",(function(e){var t="1 begincidrange\n<0016> <001B>   0\nendcidrange\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.lookup(21)).toBeUndefined(),expect(t.lookup(22)).toEqual(0),expect(t.lookup(27)).toEqual(5),expect(t.lookup(28)).toBeUndefined(),e()})).catch((function(t){e.fail(t)}))})),it("decodes codespace ranges",(function(e){var t="1 begincodespacerange\n<01> <02>\n<00000003> <00000004>\nendcodespacerange\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){var a={};t.readCharCode(String.fromCharCode(1),0,a),expect(a.charcode).toEqual(1),expect(a.length).toEqual(1),t.readCharCode(String.fromCharCode(0,0,0,3),0,a),expect(a.charcode).toEqual(3),expect(a.length).toEqual(4),e()})).catch((function(t){e.fail(t)}))})),it("decodes 4 byte codespace ranges",(function(e){var t="1 begincodespacerange\n<8EA1A1A1> <8EA1FEFE>\nendcodespacerange\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){var a={};t.readCharCode(String.fromCharCode(142,161,161,161),0,a),expect(a.charcode).toEqual(2392957345),expect(a.length).toEqual(4),e()})).catch((function(t){e.fail(t)}))})),it("read usecmap",(function(t){var a="/Adobe-Japan1-1 usecmap\n",n=new _stream.StringStream(a),c=_cmap.CMapFactory.create({encoding:n,fetchBuiltInCMap:e,useCMap:null});c.then((function(e){expect(e instanceof _cmap.CMap).toEqual(!0),expect(e.useCMap).not.toBeNull(),expect(e.builtInCMap).toBeFalsy(),expect(e.length).toEqual(8359),expect(e.isIdentityCMap).toEqual(!1),t()})).catch((function(e){t.fail(e)}))})),it("parses cmapname",(function(e){var t="/CMapName /Identity-H def\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.name).toEqual("Identity-H"),e()})).catch((function(t){e.fail(t)}))})),it("parses wmode",(function(e){var t="/WMode 1 def\n",a=new _stream.StringStream(t),n=_cmap.CMapFactory.create({encoding:a});n.then((function(t){expect(t.vertical).toEqual(!0),e()})).catch((function(t){e.fail(t)}))})),it("loads built in cmap",(function(t){var a=_cmap.CMapFactory.create({encoding:_primitives.Name.get("Adobe-Japan1-1"),fetchBuiltInCMap:e,useCMap:null});a.then((function(e){expect(e instanceof _cmap.CMap).toEqual(!0),expect(e.useCMap).toBeNull(),expect(e.builtInCMap).toBeTruthy(),expect(e.length).toEqual(8359),expect(e.isIdentityCMap).toEqual(!1),t()})).catch((function(e){t.fail(e)}))})),it("loads built in identity cmap",(function(t){var a=_cmap.CMapFactory.create({encoding:_primitives.Name.get("Identity-H"),fetchBuiltInCMap:e,useCMap:null});a.then((function(e){expect(e instanceof _cmap.IdentityCMap).toEqual(!0),expect(e.vertical).toEqual(!1),expect(e.length).toEqual(65536),expect((function(){return e.isIdentityCMap})).toThrow(new Error("should not access .isIdentityCMap")),t()})).catch((function(e){t.fail(e)}))})),it("attempts to load a non-existent built-in CMap",(function(t){var a=_cmap.CMapFactory.create({encoding:_primitives.Name.get("null"),fetchBuiltInCMap:e,useCMap:null});a.then((function(){t.fail("No CMap should be loaded")}),(function(e){expect(e instanceof Error).toEqual(!0),expect(e.message).toEqual("Unknown CMap name: null"),t()}))})),it("attempts to load a built-in CMap without the necessary API parameters",(function(e){function t(e){var t=(0,_is_node2.default)()?new _test_utils.NodeCMapReaderFactory({}):new _dom_utils.DOMCMapReaderFactory({});return t.fetch({name:e})}var a=_cmap.CMapFactory.create({encoding:_primitives.Name.get("Adobe-Japan1-1"),fetchBuiltInCMap:t,useCMap:null});a.then((function(){e.fail("No CMap should be loaded")}),(function(t){expect(t instanceof Error).toEqual(!0),expect(t.message).toEqual('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.'),e()}))})),it("attempts to load a built-in CMap with inconsistent API parameters",(function(e){function t(e){var t=void 0;return t=(0,_is_node2.default)()?new _test_utils.NodeCMapReaderFactory({baseUrl:cMapUrl.node,isCompressed:!1}):new _dom_utils.DOMCMapReaderFactory({baseUrl:cMapUrl.dom,isCompressed:!1}),t.fetch({name:e})}var a=_cmap.CMapFactory.create({encoding:_primitives.Name.get("Adobe-Japan1-1"),fetchBuiltInCMap:t,useCMap:null});a.then((function(){e.fail("No CMap should be loaded")}),(function(t){expect(t instanceof Error).toEqual(!0);var a=t.message;expect(a.startsWith("Unable to load CMap at: ")).toEqual(!0),expect(a.endsWith("/external/bcmaps/Adobe-Japan1-1")).toEqual(!0),e()}))}))}));