"use strict";var _encodings=require("../../core/encodings.js");describe("encodings",(function(){describe("getEncoding",(function(){it("fetches a valid array for known encoding names",(function(){const n=["ExpertEncoding","MacExpertEncoding","MacRomanEncoding","StandardEncoding","SymbolSetEncoding","WinAnsiEncoding","ZapfDingbatsEncoding"];for(const o of n){const n=(0,_encodings.getEncoding)(o);expect(Array.isArray(n)).toEqual(!0),expect(n.length).toEqual(256);for(const o of n)expect(typeof o).toEqual("string")}})),it("fetches `null` for unknown encoding names",(function(){expect((0,_encodings.getEncoding)("FooBarEncoding")).toEqual(null)}))}))}));