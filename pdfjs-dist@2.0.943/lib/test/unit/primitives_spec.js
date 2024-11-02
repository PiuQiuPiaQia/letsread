"use strict";var _primitives=require("../../core/primitives"),_test_utils=require("./test_utils");describe("primitives",(function(){describe("Name",(function(){it("should retain the given name",(function(){var e="Font",t=_primitives.Name.get(e);expect(t.name).toEqual(e)})),it("should create only one object for a name and cache it",(function(){var e=_primitives.Name.get("Font"),t=_primitives.Name.get("Font"),i=_primitives.Name.get("Subtype"),n=_primitives.Name.get("Subtype");expect(e).toBe(t),expect(i).toBe(n),expect(e).not.toBe(i)}))})),describe("Cmd",(function(){it("should retain the given cmd name",(function(){var e="BT",t=_primitives.Cmd.get(e);expect(t.cmd).toEqual(e)})),it("should create only one object for a command and cache it",(function(){var e=_primitives.Cmd.get("BT"),t=_primitives.Cmd.get("BT"),i=_primitives.Cmd.get("ET"),n=_primitives.Cmd.get("ET");expect(e).toBe(t),expect(i).toBe(n),expect(e).not.toBe(i)}))})),describe("Dict",(function(){var e,t,i,n=function(e){expect(e.has()).toBeFalsy(),expect(e.has("Prev")).toBeFalsy()},o=function(e){expect(e.get()).toBeUndefined(),expect(e.get("Prev")).toBeUndefined(),expect(e.get("Decode","D")).toBeUndefined(),expect(e.get("FontFile","FontFile2","FontFile3")).toBeNull()},c=42,s="file1",a="file2",r="file3";beforeAll((function(n){e=new _primitives.Dict,t=new _primitives.Dict,t.set("Size",c),i=new _primitives.Dict,i.set("FontFile",s),i.set("FontFile2",a),i.set("FontFile3",r),n()})),afterAll((function(){e=t=i=null})),it("should return invalid values for unknown keys",(function(){n(e),o(e)})),it("should return correct value for stored Size key",(function(){expect(t.has("Size")).toBeTruthy(),expect(t.get("Size")).toEqual(c),expect(t.get("Prev","Size")).toEqual(c),expect(t.get("Prev","Root","Size")).toEqual(c)})),it("should return invalid values for unknown keys when Size key is stored",(function(){n(t),o(t)})),it("should return correct value for stored Size key with undefined value",(function(){var e=new _primitives.Dict;e.set("Size"),expect(e.has("Size")).toBeTruthy(),o(e)})),it("should return correct values for multiple stored keys",(function(){expect(i.has("FontFile")).toBeTruthy(),expect(i.has("FontFile2")).toBeTruthy(),expect(i.has("FontFile3")).toBeTruthy(),expect(i.get("FontFile3")).toEqual(r),expect(i.get("FontFile2","FontFile3")).toEqual(a),expect(i.get("FontFile","FontFile2","FontFile3")).toEqual(s)})),it("should asynchronously fetch unknown keys",(function(e){var n=[i.getAsync("Size"),t.getAsync("FontFile","FontFile2","FontFile3")];Promise.all(n).then((function(t){expect(t[0]).toBeUndefined(),expect(t[1]).toBeNull(),e()})).catch((function(t){e.fail(t)}))})),it("should asynchronously fetch correct values for multiple stored keys",(function(e){var t=[i.getAsync("FontFile3"),i.getAsync("FontFile2","FontFile3"),i.getAsync("FontFile","FontFile2","FontFile3")];Promise.all(t).then((function(t){expect(t[0]).toEqual(r),expect(t[1]).toEqual(a),expect(t[2]).toEqual(s),e()})).catch((function(t){e.fail(t)}))})),it("should callback for each stored key",(function(){var e=jasmine.createSpy("spy on callback in dictionary");i.forEach(e),expect(e).toHaveBeenCalled();var t=e.calls;expect(t.argsFor(0)).toEqual(["FontFile",s]),expect(t.argsFor(1)).toEqual(["FontFile2",a]),expect(t.argsFor(2)).toEqual(["FontFile3",r]),expect(t.count()).toEqual(3)})),it("should handle keys pointing to indirect objects, both sync and async",(function(e){var t=new _primitives.Ref(1,0),i=new _test_utils.XRefMock([{ref:t,data:s}]),n=new _primitives.Dict(i);n.set("FontFile",t),expect(n.getRaw("FontFile")).toEqual(t),expect(n.get("FontFile","FontFile2","FontFile3")).toEqual(s),n.getAsync("FontFile","FontFile2","FontFile3").then((function(t){expect(t).toEqual(s),e()})).catch((function(t){e.fail(t)}))})),it("should handle arrays containing indirect objects",(function(){var e=new _primitives.Ref(1,0),t=new _primitives.Ref(2,0),i=0,n=1,o=new _test_utils.XRefMock([{ref:e,data:i},{ref:t,data:n}]),c=new _primitives.Dict(o);c.set("BBox",[i,n,e,t]),expect(c.get("BBox")).toEqual([i,n,e,t]),expect(c.getArray("BBox")).toEqual([i,n,i,n])})),it("should get all key names",(function(){var e=["FontFile","FontFile2","FontFile3"],t=i.getKeys();expect(t.sort()).toEqual(e)})),it("should create only one object for Dict.empty",(function(){var t=_primitives.Dict.empty,i=_primitives.Dict.empty;expect(t).toBe(i),expect(t).not.toBe(e)})),it("should correctly merge dictionaries",(function(){var e=["FontFile","FontFile2","FontFile3","Size"],n=new _primitives.Dict;n.set("FontFile","Type1 font file");var o=_primitives.Dict.merge(null,[i,t,n]),c=o.getKeys();expect(c.sort()).toEqual(e),expect(o.get("FontFile")).toEqual(s)}))})),describe("Ref",(function(){it("should retain the stored values",(function(){var e=4,t=2,i=new _primitives.Ref(e,t);expect(i.num).toEqual(e),expect(i.gen).toEqual(t)}))})),describe("RefSet",(function(){it("should have a stored value",(function(){var e=new _primitives.Ref(4,2),t=new _primitives.RefSet;t.put(e),expect(t.has(e)).toBeTruthy()})),it("should not have an unknown value",(function(){var e=new _primitives.Ref(4,2),t=new _primitives.RefSet;expect(t.has(e)).toBeFalsy(),t.put(e);var i=new _primitives.Ref(2,4);expect(t.has(i)).toBeFalsy()}))})),describe("isName",(function(){it("handles non-names",(function(){var e={};expect((0,_primitives.isName)(e)).toEqual(!1)})),it("handles names",(function(){var e=_primitives.Name.get("Font");expect((0,_primitives.isName)(e)).toEqual(!0)})),it("handles names with name check",(function(){var e=_primitives.Name.get("Font");expect((0,_primitives.isName)(e,"Font")).toEqual(!0),expect((0,_primitives.isName)(e,"Subtype")).toEqual(!1)}))})),describe("isCmd",(function(){it("handles non-commands",(function(){var e={};expect((0,_primitives.isCmd)(e)).toEqual(!1)})),it("handles commands",(function(){var e=_primitives.Cmd.get("BT");expect((0,_primitives.isCmd)(e)).toEqual(!0)})),it("handles commands with cmd check",(function(){var e=_primitives.Cmd.get("BT");expect((0,_primitives.isCmd)(e,"BT")).toEqual(!0),expect((0,_primitives.isCmd)(e,"ET")).toEqual(!1)}))})),describe("isDict",(function(){it("handles non-dictionaries",(function(){var e={};expect((0,_primitives.isDict)(e)).toEqual(!1)})),it("handles empty dictionaries with type check",(function(){var e=_primitives.Dict.empty;expect((0,_primitives.isDict)(e)).toEqual(!0),expect((0,_primitives.isDict)(e,"Page")).toEqual(!1)})),it("handles dictionaries with type check",(function(){var e=new _primitives.Dict;e.set("Type",_primitives.Name.get("Page")),expect((0,_primitives.isDict)(e,"Page")).toEqual(!0),expect((0,_primitives.isDict)(e,"Contents")).toEqual(!1)}))})),describe("isRef",(function(){it("handles non-refs",(function(){var e={};expect((0,_primitives.isRef)(e)).toEqual(!1)})),it("handles refs",(function(){var e=new _primitives.Ref(1,0);expect((0,_primitives.isRef)(e)).toEqual(!0)}))})),describe("isRefsEqual",(function(){it("should handle different Refs pointing to the same object",(function(){var e=new _primitives.Ref(1,0),t=new _primitives.Ref(1,0);expect((0,_primitives.isRefsEqual)(e,t)).toEqual(!0)})),it("should handle Refs pointing to different objects",(function(){var e=new _primitives.Ref(1,0),t=new _primitives.Ref(2,0);expect((0,_primitives.isRefsEqual)(e,t)).toEqual(!1)}))}))}));