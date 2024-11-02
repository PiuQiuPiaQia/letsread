"use strict";var _primitives=require("../../core/primitives.js"),_parser=require("../../core/parser.js"),_util=require("../../shared/util.js"),_stream=require("../../core/stream.js");describe("parser",(function(){describe("Parser",(function(){describe("inlineStreamSkipEI",(function(){it("should skip over the EI marker if it is found",(function(){const e="q 1 0 0 1 0 0 cm BI /W 10 /H 10 /BPC 1 /F /A85 ID abc123~> EI Q",n=new _stream.StringStream(e),t=new _parser.Parser({lexer:new _parser.Lexer(n),xref:null,allowStreams:!0});t.inlineStreamSkipEI(n),expect(n.pos).toEqual(e.indexOf("Q")),expect(n.peekByte()).toEqual(81)})),it("should skip to the end of stream if the EI marker is not found",(function(){const e="q 1 0 0 1 0 0 cm BI /W 10 /H 10 /BPC 1 /F /A85 ID abc123~> Q",n=new _stream.StringStream(e),t=new _parser.Parser({lexer:new _parser.Lexer(n),xref:null,allowStreams:!0});t.inlineStreamSkipEI(n),expect(n.pos).toEqual(e.length),expect(n.peekByte()).toEqual(-1)}))}))})),describe("Lexer",(function(){describe("nextChar",(function(){it("should return and set -1 when the end of the stream is reached",(function(){const e=new _stream.StringStream(""),n=new _parser.Lexer(e);expect(n.nextChar()).toEqual(-1),expect(n.currentChar).toEqual(-1)})),it("should return and set the character after the current position",(function(){const e=new _stream.StringStream("123"),n=new _parser.Lexer(e);expect(n.nextChar()).toEqual(50),expect(n.currentChar).toEqual(50)}))})),describe("peekChar",(function(){it("should only return -1 when the end of the stream is reached",(function(){const e=new _stream.StringStream(""),n=new _parser.Lexer(e);expect(n.peekChar()).toEqual(-1),expect(n.currentChar).toEqual(-1)})),it("should only return the character after the current position",(function(){const e=new _stream.StringStream("123"),n=new _parser.Lexer(e);expect(n.peekChar()).toEqual(50),expect(n.currentChar).toEqual(49)}))})),describe("getNumber",(function(){it("should stop parsing numbers at the end of stream",(function(){const e=new _stream.StringStream("11.234"),n=new _parser.Lexer(e);expect(n.getNumber()).toEqual(11.234)})),it("should parse PostScript numbers",(function(){const e=["-.002","34.5","-3.62","123.6e10","1E-5","-1.","0.0","123","-98","43445","0","+17"];for(const n of e){const e=new _stream.StringStream(n),t=new _parser.Lexer(e),r=t.getNumber(),i=parseFloat(n);r!==i&&Math.abs(r-i)<1e-15?(console.error(`Fuzzy matching "${r}" with "${i}" to work-around rounding bugs in Chromium browsers.`),expect(!0).toEqual(!0)):expect(r).toEqual(i)}})),it("should ignore double negative before number",(function(){const e=new _stream.StringStream("--205.88"),n=new _parser.Lexer(e);expect(n.getNumber()).toEqual(-205.88)})),it("should ignore minus signs in the middle of number",(function(){const e=new _stream.StringStream("205--.88"),n=new _parser.Lexer(e);expect(n.getNumber()).toEqual(205.88)})),it("should ignore line-breaks between operator and digit in number",(function(){const e=new _stream.StringStream("-\r\n205.88"),n=new _parser.Lexer(e);expect(n.getNumber()).toEqual(-205.88);const t=new _stream.StringStream("+\r\n205.88"),r=new _parser.Lexer(t);expect(r.getNumber()).toEqual(205.88)})),it("should treat a single decimal point as zero",(function(){const e=new _stream.StringStream("."),n=new _parser.Lexer(e);expect(n.getNumber()).toEqual(0);const t=["..","-.","+.","-\r\n.","+\r\n."];for(const r of t){const e=new _stream.StringStream(r),n=new _parser.Lexer(e);expect((function(){return n.getNumber()})).toThrowError(_util.FormatError,/^Invalid number:\s/)}})),it("should handle glued numbers and operators",(function(){const e=new _stream.StringStream("123ET"),n=new _parser.Lexer(e);expect(n.getNumber()).toEqual(123),expect(n.currentChar).toEqual(69)}))})),describe("getString",(function(){it("should stop parsing strings at the end of stream",(function(){const e=new _stream.StringStream("(1$4)");e.getByte=function(n){const t=n.call(e);return 36===t?-1:t}.bind(e,e.getByte);const n=new _parser.Lexer(e);expect(n.getString()).toEqual("1")})),it("should ignore escaped CR and LF",(function(){const e=new _stream.StringStream("(\\101\\\r\n\\102\\\r\\103\\\n\\104)"),n=new _parser.Lexer(e);expect(n.getString()).toEqual("ABCD")}))})),describe("getHexString",(function(){it("should not throw exception on bad input",(function(){const e=new _stream.StringStream("<7 0 2 15 5 2 2 2 4 3 2 4>"),n=new _parser.Lexer(e);expect(n.getHexString()).toEqual('p!U"$2')}))})),describe("getName",(function(){it("should handle Names with invalid usage of NUMBER SIGN (#)",(function(){const e=["/# 680 0 R","/#AQwerty","/#A<</B"],n=["#","#AQwerty","#A"];for(let t=0,r=e.length;t<r;t++){const r=new _stream.StringStream(e[t]),i=new _parser.Lexer(r);expect(i.getName()).toEqual(_primitives.Name.get(n[t]))}}))})),describe("getObj",(function(){it("should stop immediately when the start of a command is a non-visible ASCII character (issue 13999)",(function(){const e=new _stream.StringStream("\x14q\nQ"),n=new _parser.Lexer(e);let t=n.getObj();expect(t instanceof _primitives.Cmd).toEqual(!0),expect(t.cmd).toEqual("\x14"),t=n.getObj(),expect(t instanceof _primitives.Cmd).toEqual(!0),expect(t.cmd).toEqual("q"),t=n.getObj(),expect(t instanceof _primitives.Cmd).toEqual(!0),expect(t.cmd).toEqual("Q"),t=n.getObj(),expect(t).toEqual(_primitives.EOF)}))}))})),describe("Linearization",(function(){it("should not find a linearization dictionary",(function(){const e=new _stream.StringStream("3 0 obj\n<<\n/Length 4622\n/Filter /FlateDecode\n>>\nendobj");expect(_parser.Linearization.create(e)).toEqual(null);const n=new _stream.StringStream("1 0 obj\n<<\n/Linearized 0\n>>\nendobj");expect(_parser.Linearization.create(n)).toEqual(null)})),it("should accept a valid linearization dictionary",(function(){const e=new _stream.StringStream("131 0 obj\n<<\n/Linearized 1\n/O 133\n/H [ 1388 863 ]\n/L 90\n/E 43573\n/N 18\n/T 193883\n>>\nendobj"),n={length:90,hints:[1388,863],objectNumberFirst:133,endFirst:43573,numPages:18,mainXRefEntriesOffset:193883,pageFirst:0};expect(_parser.Linearization.create(e)).toEqual(n)})),it("should reject a linearization dictionary with invalid integer parameters",(function(){const e=new _stream.StringStream("1 0 obj\n<<\n/Linearized 1\n/O 133\n/H [ 1388 863 ]\n/L 196622\n/E 43573\n/N 18\n/T 193883\n>>\nendobj");expect((function(){return _parser.Linearization.create(e)})).toThrow(new Error('The "L" parameter in the linearization dictionary does not equal the stream length.'));const n=new _stream.StringStream("1 0 obj\n<<\n/Linearized 1\n/O 133\n/H [ 1388 863 ]\n/L 84\n/E 0\n/N 18\n/T 193883\n>>\nendobj");expect((function(){return _parser.Linearization.create(n)})).toThrow(new Error('The "E" parameter in the linearization dictionary is invalid.'));const t=new _stream.StringStream("1 0 obj\n<<\n/Linearized 1\n/O /abc\n/H [ 1388 863 ]\n/L 89\n/E 43573\n/N 18\n/T 193883\n>>\nendobj");expect((function(){return _parser.Linearization.create(t)})).toThrow(new Error('The "O" parameter in the linearization dictionary is invalid.'))})),it("should reject a linearization dictionary with invalid hint parameters",(function(){const e=new _stream.StringStream("1 0 obj\n<<\n/Linearized 1\n/O 133\n/H 1388\n/L 80\n/E 43573\n/N 18\n/T 193883\n>>\nendobj");expect((function(){return _parser.Linearization.create(e)})).toThrow(new Error("Hint array in the linearization dictionary is invalid."));const n=new _stream.StringStream("1 0 obj\n<<\n/Linearized 1\n/O 133\n/H [ 1388 ]\n/L 84\n/E 43573\n/N 18\n/T 193883\n>>\nendobj");expect((function(){return _parser.Linearization.create(n)})).toThrow(new Error("Hint array in the linearization dictionary is invalid."));const t=new _stream.StringStream("1 0 obj\n<<\n/Linearized 1\n/O 133\n/H [ 1388 863 0 234]\n/L 93\n/E 43573\n/N 18\n/T 193883\n>>\nendobj");expect((function(){return _parser.Linearization.create(t)})).toThrow(new Error("Hint (2) in the linearization dictionary is invalid."))}))}))}));