"use strict";var _function=require("../../core/function"),_ps_parser=require("../../core/ps_parser"),_stream=require("../../core/stream");describe("function",(function(){beforeEach((function(){jasmine.addMatchers({toMatchArray:function(t,e){return{compare:function(t,e){var a={};if(t.length!==e.length)return a.pass=!1,a.message="Array length: "+t.length+", expected: "+e.length,a;a.pass=!0;for(var r=0;r<e.length;r++){var n=t[r],i=e[r];if(Array.isArray(i)){if(n.length!==i.length){a.pass=!1;break}for(var c=0;c<n.length;c++){var o=n[c],u=i[c];if(o!==u){a.pass=!1;break}}}else if(n!==i){a.pass=!1;break}}return a}}}})})),describe("PostScriptParser",(function(){function t(t){var e=new _stream.StringStream(t),a=new _ps_parser.PostScriptParser(new _ps_parser.PostScriptLexer(e));return a.parse()}it("parses empty programs",(function(){var e=t("{}");expect(e.length).toEqual(0)})),it("parses positive numbers",(function(){var e=999,a=t("{ "+e+" }"),r=[e];expect(a).toMatchArray(r)})),it("parses negative numbers",(function(){var e=-999,a=t("{ "+e+" }"),r=[e];expect(a).toMatchArray(r)})),it("parses negative floats",(function(){var e=3.3,a=t("{ "+e+" }"),r=[e];expect(a).toMatchArray(r)})),it("parses operators",(function(){var e=t("{ sub }"),a=["sub"];expect(e).toMatchArray(a)})),it("parses if statements",(function(){var e=t("{ { 99 } if }"),a=[3,"jz",99];expect(e).toMatchArray(a)})),it("parses ifelse statements",(function(){var e=t("{ { 99 } { 44 } ifelse }"),a=[5,"jz",99,6,"j",44];expect(e).toMatchArray(a)})),it("handles missing brackets",(function(){expect((function(){t("{")})).toThrow(new Error("Unexpected symbol: found undefined expected 1."))})),it("handles junk after the end",(function(){var e=3.3,a=t("{ "+e+" }#"),r=[e];expect(a).toMatchArray(r)}))})),describe("PostScriptEvaluator",(function(){function t(t){var e=new _stream.StringStream(t),a=new _ps_parser.PostScriptParser(new _ps_parser.PostScriptLexer(e)),r=a.parse(),n=new _function.PostScriptEvaluator(r),i=n.execute();return i}it("pushes stack",(function(){var e=t("{ 99 }"),a=[99];expect(e).toMatchArray(a)})),it("handles if with true",(function(){var e=t("{ 1 {99} if }"),a=[99];expect(e).toMatchArray(a)})),it("handles if with false",(function(){var e=t("{ 0 {99} if }"),a=[];expect(e).toMatchArray(a)})),it("handles ifelse with true",(function(){var e=t("{ 1 {99} {77} ifelse }"),a=[99];expect(e).toMatchArray(a)})),it("handles ifelse with false",(function(){var e=t("{ 0 {99} {77} ifelse }"),a=[77];expect(e).toMatchArray(a)})),it("handles nested if",(function(){var e=t("{ 1 {1 {77} if} if }"),a=[77];expect(e).toMatchArray(a)})),it("abs",(function(){var e=t("{ -2 abs }"),a=[2];expect(e).toMatchArray(a)})),it("adds",(function(){var e=t("{ 1 2 add }"),a=[3];expect(e).toMatchArray(a)})),it("boolean and",(function(){var e=t("{ true false and }"),a=[!1];expect(e).toMatchArray(a)})),it("bitwise and",(function(){var e=t("{ 254 1 and }"),a=[0];expect(e).toMatchArray(a)})),it("calculates the inverse tangent of a number",(function(){var e=t("{ 90 atan }"),a=[Math.atan(90)];expect(e).toMatchArray(a)})),it("handles bitshifting ",(function(){var e=t("{ 50 2 bitshift }"),a=[200];expect(e).toMatchArray(a)})),it("calculates the ceiling value",(function(){var e=t("{ 9.9 ceiling }"),a=[10];expect(e).toMatchArray(a)})),it("copies",(function(){var e=t("{ 99 98 2 copy }"),a=[99,98,99,98];expect(e).toMatchArray(a)})),it("calculates the cosine of a number",(function(){var e=t("{ 90 cos }"),a=[Math.cos(90)];expect(e).toMatchArray(a)})),it("converts to int",(function(){var e=t("{ 9.9 cvi }"),a=[9];expect(e).toMatchArray(a)})),it("converts negatives to int",(function(){var e=t("{ -9.9 cvi }"),a=[-9];expect(e).toMatchArray(a)})),it("converts to real",(function(){var e=t("{ 55.34 cvr }"),a=[55.34];expect(e).toMatchArray(a)})),it("divides",(function(){var e=t("{ 6 5 div }"),a=[1.2];expect(e).toMatchArray(a)})),it("maps division by zero to infinity",(function(){var e=t("{ 6 0 div }"),a=[1/0];expect(e).toMatchArray(a)})),it("duplicates",(function(){var e=t("{ 99 dup }"),a=[99,99];expect(e).toMatchArray(a)})),it("accepts an equality",(function(){var e=t("{ 9 9 eq }"),a=[!0];expect(e).toMatchArray(a)})),it("rejects an inequality",(function(){var e=t("{ 9 8 eq }"),a=[!1];expect(e).toMatchArray(a)})),it("exchanges",(function(){var e=t("{ 44 99 exch }"),a=[99,44];expect(e).toMatchArray(a)})),it("handles exponentiation",(function(){var e=t("{ 10 2 exp }"),a=[100];expect(e).toMatchArray(a)})),it("pushes false onto the stack",(function(){var e=t("{ false }"),a=[!1];expect(e).toMatchArray(a)})),it("calculates the floor value",(function(){var e=t("{ 9.9 floor }"),a=[9];expect(e).toMatchArray(a)})),it("handles greater than or equal to",(function(){var e=t("{ 10 9 ge }"),a=[!0];expect(e).toMatchArray(a)})),it("rejects less than for greater than or equal to",(function(){var e=t("{ 8 9 ge }"),a=[!1];expect(e).toMatchArray(a)})),it("handles greater than",(function(){var e=t("{ 10 9 gt }"),a=[!0];expect(e).toMatchArray(a)})),it("rejects less than or equal for greater than",(function(){var e=t("{ 9 9 gt }"),a=[!1];expect(e).toMatchArray(a)})),it("divides to integer",(function(){var e=t("{ 2 3 idiv }"),a=[0];expect(e).toMatchArray(a)})),it("divides to negative integer",(function(){var e=t("{ -2 3 idiv }"),a=[0];expect(e).toMatchArray(a)})),it("duplicates index",(function(){var e=t("{ 4 3 2 1 2 index }"),a=[4,3,2,1,3];expect(e).toMatchArray(a)})),it("handles less than or equal to",(function(){var e=t("{ 9 10 le }"),a=[!0];expect(e).toMatchArray(a)})),it("rejects greater than for less than or equal to",(function(){var e=t("{ 10 9 le }"),a=[!1];expect(e).toMatchArray(a)})),it("calculates the natural logarithm",(function(){var e=t("{ 10 ln }"),a=[Math.log(10)];expect(e).toMatchArray(a)})),it("calculates the base 10 logarithm",(function(){var e=t("{ 100 log }"),a=[2];expect(e).toMatchArray(a)})),it("handles less than",(function(){var e=t("{ 9 10 lt }"),a=[!0];expect(e).toMatchArray(a)})),it("rejects greater than or equal to for less than",(function(){var e=t("{ 10 9 lt }"),a=[!1];expect(e).toMatchArray(a)})),it("performs the modulo operation",(function(){var e=t("{ 4 3 mod }"),a=[1];expect(e).toMatchArray(a)})),it("multiplies two numbers (positive result)",(function(){var e=t("{ 9 8 mul }"),a=[72];expect(e).toMatchArray(a)})),it("multiplies two numbers (negative result)",(function(){var e=t("{ 9 -8 mul }"),a=[-72];expect(e).toMatchArray(a)})),it("accepts an inequality",(function(){var e=t("{ 9 8 ne }"),a=[!0];expect(e).toMatchArray(a)})),it("rejects an equality",(function(){var e=t("{ 9 9 ne }"),a=[!1];expect(e).toMatchArray(a)})),it("negates",(function(){var e=t("{ 4.5 neg }"),a=[-4.5];expect(e).toMatchArray(a)})),it("boolean not",(function(){var e=t("{ true not }"),a=[!1];expect(e).toMatchArray(a)})),it("bitwise not",(function(){var e=t("{ 12 not }"),a=[-13];expect(e).toMatchArray(a)})),it("boolean or",(function(){var e=t("{ true false or }"),a=[!0];expect(e).toMatchArray(a)})),it("bitwise or",(function(){var e=t("{ 254 1 or }"),a=[255];expect(e).toMatchArray(a)})),it("pops stack",(function(){var e=t("{ 1 2 pop }"),a=[1];expect(e).toMatchArray(a)})),it("rolls stack right",(function(){var e=t("{ 1 3 2 2 4 1 roll }"),a=[2,1,3,2];expect(e).toMatchArray(a)})),it("rolls stack left",(function(){var e=t("{ 1 3 2 2 4 -1 roll }"),a=[3,2,2,1];expect(e).toMatchArray(a)})),it("rounds a number",(function(){var e=t("{ 9.52 round }"),a=[10];expect(e).toMatchArray(a)})),it("calculates the sine of a number",(function(){var e=t("{ 90 sin }"),a=[Math.sin(90)];expect(e).toMatchArray(a)})),it("calculates a square root (integer)",(function(){var e=t("{ 100 sqrt }"),a=[10];expect(e).toMatchArray(a)})),it("calculates a square root (float)",(function(){var e=t("{ 99 sqrt }"),a=[Math.sqrt(99)];expect(e).toMatchArray(a)})),it("subtracts (positive result)",(function(){var e=t("{ 6 4 sub }"),a=[2];expect(e).toMatchArray(a)})),it("subtracts (negative result)",(function(){var e=t("{ 4 6 sub }"),a=[-2];expect(e).toMatchArray(a)})),it("pushes true onto the stack",(function(){var e=t("{ true }"),a=[!0];expect(e).toMatchArray(a)})),it("truncates a number",(function(){var e=t("{ 35.004 truncate }"),a=[35];expect(e).toMatchArray(a)})),it("calculates an exclusive or value",(function(){var e=t("{ 3 9 xor }"),a=[10];expect(e).toMatchArray(a)}))})),describe("PostScriptCompiler",(function(){function t(t,e,a,r){var n=new _function.PostScriptCompiler,i=n.compile(t,e,a);if(null===r)expect(i).toBeNull();else{expect(i).not.toBeNull();for(var c=new Function("src","srcOffset","dest","destOffset",i),o=0;o<r.length;o++){var u=new Float32Array(r[o].output.length);c(r[o].input,0,u,0),expect(Array.prototype.slice.call(u,0)).toMatchArray(r[o].output)}}}it("check compiled add",(function(){t([.25,.5,"add"],[],[0,1],[{input:[],output:[.75]}]),t([0,"add"],[0,1],[0,1],[{input:[.25],output:[.25]}]),t([.5,"add"],[0,1],[0,1],[{input:[.25],output:[.75]}]),t([0,"exch","add"],[0,1],[0,1],[{input:[.25],output:[.25]}]),t([.5,"exch","add"],[0,1],[0,1],[{input:[.25],output:[.75]}]),t(["add"],[0,1,0,1],[0,1],[{input:[.25,.5],output:[.75]}]),t(["add"],[0,1],[0,1],null)})),it("check compiled sub",(function(){t([.5,.25,"sub"],[],[0,1],[{input:[],output:[.25]}]),t([0,"sub"],[0,1],[0,1],[{input:[.25],output:[.25]}]),t([.5,"sub"],[0,1],[0,1],[{input:[.75],output:[.25]}]),t([0,"exch","sub"],[0,1],[-1,1],[{input:[.25],output:[-.25]}]),t([.75,"exch","sub"],[0,1],[-1,1],[{input:[.25],output:[.5]}]),t(["sub"],[0,1,0,1],[-1,1],[{input:[.25,.5],output:[-.25]}]),t(["sub"],[0,1],[0,1],null),t([1,"dup",3,2,"roll","sub","sub"],[0,1],[0,1],[{input:[.75],output:[.75]}])})),it("check compiled mul",(function(){t([.25,.5,"mul"],[],[0,1],[{input:[],output:[.125]}]),t([0,"mul"],[0,1],[0,1],[{input:[.25],output:[0]}]),t([.5,"mul"],[0,1],[0,1],[{input:[.25],output:[.125]}]),t([1,"mul"],[0,1],[0,1],[{input:[.25],output:[.25]}]),t([0,"exch","mul"],[0,1],[0,1],[{input:[.25],output:[0]}]),t([.5,"exch","mul"],[0,1],[0,1],[{input:[.25],output:[.125]}]),t([1,"exch","mul"],[0,1],[0,1],[{input:[.25],output:[.25]}]),t(["mul"],[0,1,0,1],[0,1],[{input:[.25,.5],output:[.125]}]),t(["mul"],[0,1],[0,1],null)})),it("check compiled max",(function(){t(["dup",.75,"gt",7,"jz","pop",.75],[0,1],[0,1],[{input:[.5],output:[.5]}]),t(["dup",.75,"gt",7,"jz","pop",.75],[0,1],[0,1],[{input:[1],output:[.75]}]),t(["dup",.75,"gt",5,"jz","pop",.75],[0,1],[0,1],null)})),it("check pop/roll/index",(function(){t([1,"pop"],[0,1],[0,1],[{input:[.5],output:[.5]}]),t([1,3,-1,"roll"],[0,1,0,1],[0,1,0,1,0,1],[{input:[.25,.5],output:[.5,1,.25]}]),t([1,3,1,"roll"],[0,1,0,1],[0,1,0,1,0,1],[{input:[.25,.5],output:[1,.25,.5]}]),t([1,3,1.5,"roll"],[0,1,0,1],[0,1,0,1,0,1],null),t([1,1,"index"],[0,1],[0,1,0,1,0,1],[{input:[.5],output:[.5,1,.5]}]),t([1,3,"index","pop"],[0,1],[0,1],null),t([1,.5,"index","pop"],[0,1],[0,1],null)})),it("check input boundaries",(function(){t([],[0,.5],[0,1],[{input:[1],output:[.5]}]),t([],[.5,1],[0,1],[{input:[0],output:[.5]}]),t(["dup"],[.5,.75],[0,1,0,1],[{input:[0],output:[.5,.5]}]),t([],[100,1001],[0,1e4],[{input:[1e3],output:[1e3]}])})),it("check output boundaries",(function(){t([],[0,1],[0,.5],[{input:[1],output:[.5]}]),t([],[0,1],[.5,1],[{input:[0],output:[.5]}]),t(["dup"],[0,1],[.5,1,.75,1],[{input:[0],output:[.5,.75]}]),t([],[0,1e4],[100,1001],[{input:[1e3],output:[1e3]}])})),it("compile optimized",(function(){var t=new _function.PostScriptCompiler,e=[0,"add",1,1,3,-1,"roll","sub","sub",1,"mul"],a=t.compile(e,[0,1],[0,1]);expect(a).toEqual("dest[destOffset + 0] = Math.max(0, Math.min(1, src[srcOffset + 0]));")}))}))}));