"use strict";var _stream=require("../../core/stream"),_primitives=require("../../core/primitives");describe("stream",(function(){beforeEach((function(){jasmine.addMatchers({toMatchTypedArray:function(e,r){return{compare:function(e,r){var t={};if(e.length!==r.length)return t.pass=!1,t.message="Array length: "+e.length+", expected: "+r.length,t;t.pass=!0;for(var a=0,i=r.length;a<i;a++){var n=e[a],s=r[a];if(n!==s){t.pass=!1;break}}return t}}}})})),describe("PredictorStream",(function(){it("should decode simple predictor data",(function(){var e=new _primitives.Dict;e.set("Predictor",12),e.set("Colors",1),e.set("BitsPerComponent",8),e.set("Columns",2);var r=new _stream.Stream(new Uint8Array([2,100,3,2,1,255,2,1,255]),0,9,e),t=new _stream.PredictorStream(r,9,e),a=t.getBytes(6);expect(a).toMatchTypedArray(new Uint8Array([100,3,101,2,102,1])),t.reset();var i=t.getBytes(6,!0);expect(i).toEqual(new Uint8ClampedArray([100,3,101,2,102,1]))}))}))}));