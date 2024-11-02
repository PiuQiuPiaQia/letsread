"use strict";var _primitives=require("../../core/primitives"),_util=require("../../shared/util"),_stream=require("../../core/stream"),_operator_list=require("../../core/operator_list"),_evaluator=require("../../core/evaluator"),_worker=require("../../core/worker"),_test_utils=require("./test_utils");describe("evaluator",(function(){function t(){this.inputs=[]}function e(){}function r(){}function a(t,e,r,a){var n=new _operator_list.OperatorList,o=new _worker.WorkerTask("OperatorListCheck");t.getOperatorList({stream:e,task:o,resources:r,operatorList:n}).then((function(){a(n)}),(function(t){a(t)}))}var n;t.prototype={send:function(t,e){this.inputs.push({name:t,data:e})}},e.prototype={get:function(t){return this[t]}},beforeAll((function(e){n=new _evaluator.PartialEvaluator({pdfManager:new r,xref:new _test_utils.XRefMock,handler:new t,pageIndex:0}),e()})),afterAll((function(){n=null})),describe("splitCombinedOperations",(function(){it("should reject unknown operations",(function(t){var r=new _stream.StringStream("fTT");a(n,r,new e,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(1),expect(e.fnArray[0]).toEqual(_util.OPS.fill),expect(e.argsArray[0]).toEqual(null),t()}))})),it("should handle one operation",(function(t){var r=new _stream.StringStream("Q");a(n,r,new e,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(1),expect(e.fnArray[0]).toEqual(_util.OPS.restore),t()}))})),it("should handle two glued operations",(function(t){var r=new e;r.Res1={};var o=new _stream.StringStream("/Res1 DoQ");a(n,o,r,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(2),expect(e.fnArray[0]).toEqual(_util.OPS.paintXObject),expect(e.fnArray[1]).toEqual(_util.OPS.restore),t()}))})),it("should handle three glued operations",(function(t){var r=new _stream.StringStream("fff");a(n,r,new e,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(3),expect(e.fnArray[0]).toEqual(_util.OPS.fill),expect(e.fnArray[1]).toEqual(_util.OPS.fill),expect(e.fnArray[2]).toEqual(_util.OPS.fill),t()}))})),it("should handle three glued operations #2",(function(t){var r=new e;r.Res1={};var o=new _stream.StringStream("B*Bf*");a(n,o,r,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(3),expect(e.fnArray[0]).toEqual(_util.OPS.eoFillStroke),expect(e.fnArray[1]).toEqual(_util.OPS.fillStroke),expect(e.fnArray[2]).toEqual(_util.OPS.eoFill),t()}))})),it("should handle glued operations and operands",(function(t){var r=new _stream.StringStream("f5 Ts");a(n,r,new e,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(2),expect(e.fnArray[0]).toEqual(_util.OPS.fill),expect(e.fnArray[1]).toEqual(_util.OPS.setTextRise),expect(e.argsArray.length).toEqual(2),expect(e.argsArray[1].length).toEqual(1),expect(e.argsArray[1][0]).toEqual(5),t()}))})),it("should handle glued operations and literals",(function(t){var r=new _stream.StringStream("trueifalserinulln");a(n,r,new e,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(3),expect(e.fnArray[0]).toEqual(_util.OPS.setFlatness),expect(e.fnArray[1]).toEqual(_util.OPS.setRenderingIntent),expect(e.fnArray[2]).toEqual(_util.OPS.endPath),expect(e.argsArray.length).toEqual(3),expect(e.argsArray[0].length).toEqual(1),expect(e.argsArray[0][0]).toEqual(!0),expect(e.argsArray[1].length).toEqual(1),expect(e.argsArray[1][0]).toEqual(!1),expect(e.argsArray[2]).toEqual(null),t()}))}))})),describe("validateNumberOfArgs",(function(){it("should execute if correct number of arguments",(function(t){var r=new _stream.StringStream("5 1 d0");a(n,r,new e,(function(e){expect(e.argsArray[0][0]).toEqual(5),expect(e.argsArray[0][1]).toEqual(1),expect(e.fnArray[0]).toEqual(_util.OPS.setCharWidth),t()}))})),it("should execute if too many arguments",(function(t){var r=new _stream.StringStream("5 1 4 d0");a(n,r,new e,(function(e){expect(e.argsArray[0][0]).toEqual(1),expect(e.argsArray[0][1]).toEqual(4),expect(e.fnArray[0]).toEqual(_util.OPS.setCharWidth),t()}))})),it("should execute if nested commands",(function(t){var r=new _stream.StringStream("/F2 /GS2 gs 5.711 Tf");a(n,r,new e,(function(e){expect(e.fnArray.length).toEqual(3),expect(e.fnArray[0]).toEqual(_util.OPS.setGState),expect(e.fnArray[1]).toEqual(_util.OPS.dependency),expect(e.fnArray[2]).toEqual(_util.OPS.setFont),expect(e.argsArray.length).toEqual(3),expect(e.argsArray[0].length).toEqual(1),expect(e.argsArray[1].length).toEqual(1),expect(e.argsArray[2].length).toEqual(2),t()}))})),it("should skip if too few arguments",(function(t){var r=new _stream.StringStream("5 d0");a(n,r,new e,(function(e){expect(e.argsArray).toEqual([]),expect(e.fnArray).toEqual([]),t()}))})),it("should error if (many) path operators have too few arguments (bug 1443140)",(function(t){var r=25,o=new Array(r+1),i=o.join("10 Td\n"),u=new _stream.StringStream(i);a(n,u,new e,(function(e){expect(e.argsArray).toEqual([]),expect(e.fnArray).toEqual([]),t()}));var l=o.join("20 l\n"),s=new _stream.StringStream(l);a(n,s,new e,(function(e){expect(e instanceof _util.FormatError).toEqual(!0),expect(e.message).toEqual("Invalid command l: expected 2 args, but received 1 args."),t()}))})),it("should close opened saves",(function(t){var r=new _stream.StringStream("qq");a(n,r,new e,(function(e){expect(!!e.fnArray&&!!e.argsArray).toEqual(!0),expect(e.fnArray.length).toEqual(4),expect(e.fnArray[0]).toEqual(_util.OPS.save),expect(e.fnArray[1]).toEqual(_util.OPS.save),expect(e.fnArray[2]).toEqual(_util.OPS.restore),expect(e.fnArray[3]).toEqual(_util.OPS.restore),t()}))})),it("should skip paintXObject if name is missing",(function(t){var r=new _stream.StringStream("/ Do");a(n,r,new e,(function(e){expect(e instanceof _util.FormatError).toEqual(!0),expect(e.message).toEqual("XObject must be referred to by name."),t()}))})),it("should skip paintXObject if subtype is PS",(function(t){var e=new _primitives.Dict;e.set("Subtype",_primitives.Name.get("PS"));var r=new _stream.Stream([],0,0,e),o=new _primitives.Dict;o.set("Res1",r);var i=new _primitives.Dict;i.set("XObject",o);var u=new _stream.StringStream("/Res1 Do");a(n,u,i,(function(e){expect(e.argsArray).toEqual([]),expect(e.fnArray).toEqual([]),t()}))}))})),describe("thread control",(function(){it("should abort operator list parsing",(function(t){var r=new _stream.StringStream("qqQQ"),a=new e,o=new _operator_list.OperatorList,i=new _worker.WorkerTask("OperatorListAbort");i.terminate(),n.getOperatorList({stream:r,task:i,resources:a,operatorList:o}).catch((function(){expect(!!o.fnArray&&!!o.argsArray).toEqual(!0),expect(o.fnArray.length).toEqual(0),t()}))})),it("should abort text parsing parsing",(function(t){var r=new e,a=new _stream.StringStream("qqQQ"),o=new _worker.WorkerTask("TextContentAbort");o.terminate(),n.getTextContent({stream:a,task:o,resources:r}).catch((function(){expect(!0).toEqual(!0),t()}))}))})),describe("operator list",(function(){function t(){}t.prototype={send:function(){}},it("should get correct total length after flushing",(function(){var e=new _operator_list.OperatorList(null,new t);e.addOp(_util.OPS.save,null),e.addOp(_util.OPS.restore,null),expect(e.totalLength).toEqual(2),expect(e.length).toEqual(2),e.flush(),expect(e.totalLength).toEqual(2),expect(e.length).toEqual(0)}))}))}));