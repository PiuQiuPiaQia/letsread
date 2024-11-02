"use strict";var _test_utils=require("./test_utils.js"),_primitives=require("../../core/primitives.js"),_util=require("../../shared/util.js"),_stream=require("../../core/stream.js"),_operator_list=require("../../core/operator_list.js"),_evaluator=require("../../core/evaluator.js"),_worker=require("../../core/worker.js");describe("evaluator",(function(){function t(){this.inputs=[]}function e(){}async function r(t,e,r){const a=new _operator_list.OperatorList,n=new _worker.WorkerTask("OperatorListCheck");return await t.getOperatorList({stream:e,task:n,resources:r,operatorList:a}),a}let a;t.prototype={send(t,e){this.inputs.push({name:t,data:e})}},e.prototype={get(t){return this[t]}},beforeAll((function(){a=new _evaluator.PartialEvaluator({xref:new _test_utils.XRefMock,handler:new t,pageIndex:0,idFactory:(0,_test_utils.createIdFactory)(0)})})),afterAll((function(){a=null})),describe("splitCombinedOperations",(function(){it("should reject unknown operations",(async function(){const t=new _stream.StringStream("fTT"),n=await r(a,t,new e);expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(1),expect(n.fnArray[0]).toEqual(_util.OPS.fill),expect(n.argsArray[0]).toEqual(null)})),it("should handle one operation",(async function(){const t=new _stream.StringStream("Q"),n=await r(a,t,new e);expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(1),expect(n.fnArray[0]).toEqual(_util.OPS.restore)})),it("should handle two glued operations",(async function(){const t=new _primitives.Dict;t.set("Subtype",_primitives.Name.get("Image")),t.set("Width",1),t.set("Height",1);const n=new _stream.Stream([0]);n.dict=t;const o=new _primitives.Dict;o.set("Res1",n);const s=new e;s.XObject=o;const i=new _stream.StringStream("/Res1 DoQ"),l=await r(a,i,s);expect(l.fnArray.length).toEqual(3),expect(l.fnArray[0]).toEqual(_util.OPS.dependency),expect(l.fnArray[1]).toEqual(_util.OPS.paintImageXObject),expect(l.fnArray[2]).toEqual(_util.OPS.restore),expect(l.argsArray.length).toEqual(3),expect(l.argsArray[0]).toEqual(["img_p0_1"]),expect(l.argsArray[1]).toEqual(["img_p0_1",1,1]),expect(l.argsArray[2]).toEqual(null)})),it("should handle three glued operations",(async function(){const t=new _stream.StringStream("fff"),n=await r(a,t,new e);expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(3),expect(n.fnArray[0]).toEqual(_util.OPS.fill),expect(n.fnArray[1]).toEqual(_util.OPS.fill),expect(n.fnArray[2]).toEqual(_util.OPS.fill)})),it("should handle three glued operations #2",(async function(){const t=new e;t.Res1={};const n=new _stream.StringStream("B*Bf*"),o=await r(a,n,t);expect(!!o.fnArray&&!!o.argsArray).toEqual(!0),expect(o.fnArray.length).toEqual(3),expect(o.fnArray[0]).toEqual(_util.OPS.eoFillStroke),expect(o.fnArray[1]).toEqual(_util.OPS.fillStroke),expect(o.fnArray[2]).toEqual(_util.OPS.eoFill)})),it("should handle glued operations and operands",(async function(){const t=new _stream.StringStream("f5 Ts"),n=await r(a,t,new e);expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(2),expect(n.fnArray[0]).toEqual(_util.OPS.fill),expect(n.fnArray[1]).toEqual(_util.OPS.setTextRise),expect(n.argsArray.length).toEqual(2),expect(n.argsArray[1].length).toEqual(1),expect(n.argsArray[1][0]).toEqual(5)})),it("should handle glued operations and literals",(async function(){const t=new _stream.StringStream("trueifalserinulln"),n=await r(a,t,new e);expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(3),expect(n.fnArray[0]).toEqual(_util.OPS.setFlatness),expect(n.fnArray[1]).toEqual(_util.OPS.setRenderingIntent),expect(n.fnArray[2]).toEqual(_util.OPS.endPath),expect(n.argsArray.length).toEqual(3),expect(n.argsArray[0].length).toEqual(1),expect(n.argsArray[0][0]).toEqual(!0),expect(n.argsArray[1].length).toEqual(1),expect(n.argsArray[1][0]).toEqual(!1),expect(n.argsArray[2]).toEqual(null)}))})),describe("validateNumberOfArgs",(function(){it("should execute if correct number of arguments",(async function(){const t=new _stream.StringStream("5 1 d0"),n=await r(a,t,new e);expect(n.argsArray[0][0]).toEqual(5),expect(n.argsArray[0][1]).toEqual(1),expect(n.fnArray[0]).toEqual(_util.OPS.setCharWidth)})),it("should execute if too many arguments",(async function(){const t=new _stream.StringStream("5 1 4 d0"),n=await r(a,t,new e);expect(n.argsArray[0][0]).toEqual(1),expect(n.argsArray[0][1]).toEqual(4),expect(n.fnArray[0]).toEqual(_util.OPS.setCharWidth)})),it("should execute if nested commands",(async function(){const t=new _primitives.Dict;t.set("LW",2),t.set("CA",.5);const n=new _primitives.Dict;n.set("GS2",t);const o=new e;o.ExtGState=n;const s=new _stream.StringStream("/F2 /GS2 gs 5.711 Tf"),i=await r(a,s,o);expect(i.fnArray.length).toEqual(3),expect(i.fnArray[0]).toEqual(_util.OPS.setGState),expect(i.fnArray[1]).toEqual(_util.OPS.dependency),expect(i.fnArray[2]).toEqual(_util.OPS.setFont),expect(i.argsArray.length).toEqual(3),expect(i.argsArray[0]).toEqual([[["LW",2],["CA",.5]]]),expect(i.argsArray[1]).toEqual(["g_font_error"]),expect(i.argsArray[2]).toEqual(["g_font_error",5.711])})),it("should skip if too few arguments",(async function(){const t=new _stream.StringStream("5 d0"),n=await r(a,t,new e);expect(n.argsArray).toEqual([]),expect(n.fnArray).toEqual([])})),it("should error if (many) path operators have too few arguments (bug 1443140)",(async function(){const t=25,n=new Array(t+1),o=n.join("10 Td\n"),s=new _stream.StringStream(o),i=await r(a,s,new e);expect(i.argsArray).toEqual([]),expect(i.fnArray).toEqual([]);const l=n.join("20 l\n"),c=new _stream.StringStream(l);try{await r(a,c,new e),expect(!1).toEqual(!0)}catch(u){expect(u instanceof _util.FormatError).toEqual(!0),expect(u.message).toEqual("Invalid command l: expected 2 args, but received 1 args.")}})),it("should close opened saves",(async function(){const t=new _stream.StringStream("qq"),n=await r(a,t,new e);expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(4),expect(n.fnArray[0]).toEqual(_util.OPS.save),expect(n.fnArray[1]).toEqual(_util.OPS.save),expect(n.fnArray[2]).toEqual(_util.OPS.restore),expect(n.fnArray[3]).toEqual(_util.OPS.restore)})),it("should error on paintXObject if name is missing",(async function(){const t=new _stream.StringStream("/ Do");try{await r(a,t,new e),expect(!1).toEqual(!0)}catch(n){expect(n instanceof _util.FormatError).toEqual(!0),expect(n.message).toEqual("XObject should be a stream")}})),it("should skip paintXObject if subtype is PS",(async function(){const t=new _primitives.Dict;t.set("Subtype",_primitives.Name.get("PS"));const e=new _stream.Stream([],0,0,t),n=new _primitives.Dict;n.set("Res1",e);const o=new _primitives.Dict;o.set("XObject",n);const s=new _stream.StringStream("/Res1 Do"),i=await r(a,s,o);expect(i.argsArray).toEqual([]),expect(i.fnArray).toEqual([])}))})),describe("thread control",(function(){it("should abort operator list parsing",(async function(){const t=new _stream.StringStream("qqQQ"),r=new e,n=new _operator_list.OperatorList,o=new _worker.WorkerTask("OperatorListAbort");o.terminate();try{await a.getOperatorList({stream:t,task:o,resources:r,operatorList:n}),expect(!1).toEqual(!0)}catch(s){expect(!!n.fnArray&&!!n.argsArray).toEqual(!0),expect(n.fnArray.length).toEqual(0)}})),it("should abort text content parsing",(async function(){const t=new e,r=new _stream.StringStream("qqQQ"),n=new _worker.WorkerTask("TextContentAbort");n.terminate();try{await a.getTextContent({stream:r,task:n,resources:t}),expect(!1).toEqual(!0)}catch(o){expect(!0).toEqual(!0)}}))})),describe("operator list",(function(){class t{enqueue(){}}it("should get correct total length after flushing",(function(){const e=new _operator_list.OperatorList(null,new t);e.addOp(_util.OPS.save,null),e.addOp(_util.OPS.restore,null),expect(e.totalLength).toEqual(2),expect(e.length).toEqual(2),e.flush(),expect(e.totalLength).toEqual(2),expect(e.length).toEqual(0)}))}))}));