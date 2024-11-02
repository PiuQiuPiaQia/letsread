"use strict";var _annotation_storage=require("../../display/annotation_storage.js");describe("AnnotationStorage",(function(){describe("GetOrDefaultValue",(function(){it("should get and set a new value in the annotation storage",(function(){const e=new _annotation_storage.AnnotationStorage;let t=e.getValue("123A",{value:"hello world"}).value;expect(t).toEqual("hello world"),e.setValue("123A",{value:"hello world"}),t=e.getValue("123A",{value:"an other string"}).value,expect(t).toEqual("hello world")})),it("should get set values and default ones in the annotation storage",(function(){const e=new _annotation_storage.AnnotationStorage;e.setValue("123A",{value:"hello world",hello:"world"});const t=e.getValue("123A",{value:"an other string",world:"hello"});expect(t).toEqual({value:"hello world",hello:"world",world:"hello"})}))})),describe("SetValue",(function(){it("should set a new value in the annotation storage",(function(){const e=new _annotation_storage.AnnotationStorage;e.setValue("123A",{value:"an other string"});const t=e.getAll()["123A"].value;expect(t).toEqual("an other string")})),it("should call onSetModified() if value is changed",(function(){const e=new _annotation_storage.AnnotationStorage;let t=!1;const o=function(){t=!0};e.onSetModified=o,e.setValue("asdf",{value:"original"}),expect(t).toBe(!0),e.setValue("asdf",{value:"modified"}),expect(t).toBe(!0),t=!1,e.setValue("asdf",{value:"modified"}),expect(t).toBe(!1)}))})),describe("ResetModified",(function(){it("should call onResetModified() if set",(function(){const e=new _annotation_storage.AnnotationStorage;let t=!1;const o=function(){t=!0};e.onResetModified=o,e.setValue("asdf",{value:"original"}),e.resetModified(),expect(t).toBe(!0),t=!1,e.setValue("asdf",{value:"original"}),e.resetModified(),expect(t).toBe(!1),e.setValue("asdf",{value:"modified"}),e.resetModified(),expect(t).toBe(!0)}))}))}));