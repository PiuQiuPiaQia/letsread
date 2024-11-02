"use strict";var _slicedToArray=function(){function t(t,e){var n=[],o=!0,i=!1,a=void 0;try{for(var r,s=t[Symbol.iterator]();!(o=(r=s.next()).done);o=!0)if(n.push(r.value),e&&n.length===e)break}catch(u){i=!0,a=u}finally{try{!o&&s["return"]&&s["return"]()}finally{if(i)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_test_utils=require("./test_utils"),_util=require("../../shared/util"),_dom_utils=require("../../display/dom_utils"),_api=require("../../display/api"),_worker_options=require("../../display/worker_options"),_is_node=require("../../shared/is_node"),_is_node2=_interopRequireDefault(_is_node),_metadata=require("../../display/metadata");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}describe("api",(function(){var t="basicapi.pdf",e=105779,n=(0,_test_utils.buildGetDocumentParams)(t),o=void 0;function i(t){var e=10;setTimeout((function(){t()}),e)}beforeAll((function(t){(0,_is_node2.default)()||(o=new _dom_utils.DOMCanvasFactory),t()})),afterAll((function(t){o=null,t()})),describe("getDocument",(function(){it("creates pdf doc from URL",(function(t){var e=(0,_api.getDocument)(n),o=!1,i=(0,_util.createPromiseCapability)();e.onProgress=function(t){o||(o=!0,i.resolve(t))};var a=[i.promise,e.promise];Promise.all(a).then((function(n){expect(n[0].loaded/n[0].total>=0).toEqual(!0),expect(n[1]instanceof _api.PDFDocumentProxy).toEqual(!0),expect(e).toEqual(n[1].loadingTask),e.destroy().then(t)})).catch(t.fail)})),it("creates pdf doc from URL and aborts before worker initialized",(function(t){var e=(0,_api.getDocument)(n),o=e.destroy();e.promise.then((function(e){t.fail("shall fail loading")})).catch((function(e){expect(!0).toEqual(!0),o.then(t)}))})),it("creates pdf doc from URL and aborts loading after worker initialized",(function(t){var e=(0,_api.getDocument)(n),o=e._worker.promise.then((function(){return e.destroy()}));o.then((function(e){expect(!0).toEqual(!0),t()})).catch(t.fail)})),it("creates pdf doc from typed array",(function(n){var o;if((0,_is_node2.default)())o=_test_utils.NodeFileReaderFactory.fetch({path:_test_utils.TEST_PDFS_PATH.node+t});else{var i=!1,a=new XMLHttpRequest;a.open("GET",_test_utils.TEST_PDFS_PATH.dom+t,!1);try{a.responseType="arraybuffer",i="arraybuffer"!==a.responseType}catch(u){i=!0}i&&a.overrideMimeType&&a.overrideMimeType("text/plain; charset=x-user-defined"),a.send(null),o=i?(0,_util.stringToBytes)(a.responseText):new Uint8Array(a.response)}expect(o.length).toEqual(e);var r=(0,_api.getDocument)(o),s=(0,_util.createPromiseCapability)();r.onProgress=function(t){s.resolve(t)},Promise.all([r.promise,s.promise]).then((function(t){expect(t[0]instanceof _api.PDFDocumentProxy).toEqual(!0),expect(t[1].loaded/t[1].total).toEqual(1),r.destroy().then(n)})).catch(n.fail)})),it("creates pdf doc from invalid PDF file",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("bug1020226.pdf"));e.promise.then((function(){t.fail("shall fail loading")})).catch((function(n){expect(n instanceof _util.InvalidPDFException).toEqual(!0),e.destroy().then(t)}))})),it("creates pdf doc from non-existent URL",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("non-existent.pdf"));e.promise.then((function(e){t.fail("shall fail loading")})).catch((function(n){expect(n instanceof _util.MissingPDFException).toEqual(!0),e.destroy().then(t)}))})),it("creates pdf doc from PDF file protected with user and owner password",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("pr6531_1.pdf")),n=!1,o=(0,_util.createPromiseCapability)(),i=!1,a=(0,_util.createPromiseCapability)();e.onPassword=function(t,e){return e!==_util.PasswordResponses.NEED_PASSWORD||n?e!==_util.PasswordResponses.INCORRECT_PASSWORD||i?void expect(!1).toEqual(!0):(i=!0,a.resolve(),void t("asdfasdf")):(n=!0,o.resolve(),void t("qwerty"))};var r=[o.promise,a.promise,e.promise];Promise.all(r).then((function(n){expect(n[2]instanceof _api.PDFDocumentProxy).toEqual(!0),e.destroy().then(t)})).catch(t.fail)})),it("creates pdf doc from PDF file protected with only a user password",(function(t){var e="pr6531_2.pdf",n=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e,{password:""})),o=n.promise.then((function(){return t.fail("shall fail with no password"),Promise.reject(new Error("loadingTask should be rejected"))}),(function(t){return expect(t instanceof _util.PasswordException).toEqual(!0),expect(t.code).toEqual(_util.PasswordResponses.NEED_PASSWORD),n.destroy()})),i=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e,{password:"qwerty"})),a=i.promise.then((function(){return t.fail("shall fail with wrong password"),Promise.reject(new Error("loadingTask should be rejected"))}),(function(t){return expect(t instanceof _util.PasswordException).toEqual(!0),expect(t.code).toEqual(_util.PasswordResponses.INCORRECT_PASSWORD),i.destroy()})),r=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e,{password:"asdfasdf"})),s=r.promise.then((function(t){return expect(t instanceof _api.PDFDocumentProxy).toEqual(!0),r.destroy()}));Promise.all([o,a,s]).then((function(){t()})).catch(t.fail)})),it("creates pdf doc from password protected PDF file and aborts/throws in the onPassword callback (issue 7806)",(function(t){var e="issue3371.pdf",n=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e)),o=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e,{password:"qwerty"})),i=void 0;n.onPassword=function(t,e){e!==_util.PasswordResponses.NEED_PASSWORD?expect(!1).toEqual(!0):i=n.destroy()};var a=n.promise.then((function(){return t.fail("shall fail since the loadingTask should be destroyed"),Promise.reject(new Error("loadingTask should be rejected"))}),(function(t){return expect(t instanceof _util.PasswordException).toEqual(!0),expect(t.code).toEqual(_util.PasswordResponses.NEED_PASSWORD),i}));o.onPassword=function(t,e){if(e===_util.PasswordResponses.INCORRECT_PASSWORD)throw new Error("Incorrect password");expect(!1).toEqual(!0)};var r=o.promise.then((function(){return t.fail("shall fail since the onPassword callback should throw"),Promise.reject(new Error("loadingTask should be rejected"))}),(function(t){return expect(t instanceof _util.PasswordException).toEqual(!0),expect(t.code).toEqual(_util.PasswordResponses.INCORRECT_PASSWORD),o.destroy()}));Promise.all([a,r]).then((function(){t()})).catch(t.fail)}))})),describe("PDFWorker",(function(){it("worker created or destroyed",(function(t){(0,_is_node2.default)()&&pending("Worker is not supported in Node.js.");var e=new _api.PDFWorker({name:"test1"});e.promise.then((function(){expect(e.name).toEqual("test1"),expect(!!e.port).toEqual(!0),expect(e.destroyed).toEqual(!1),expect(!!e._webWorker).toEqual(!0),expect(e.port===e._webWorker).toEqual(!0),e.destroy(),expect(!!e.port).toEqual(!1),expect(e.destroyed).toEqual(!0),t()})).catch(t.fail)})),it("worker created or destroyed by getDocument",(function(t){(0,_is_node2.default)()&&pending("Worker is not supported in Node.js.");var e,o=(0,_api.getDocument)(n);o.promise.then((function(){e=o._worker,expect(!!e).toEqual(!0)}));var i=o.promise.then((function(){return o.destroy()}));i.then((function(){var n=o._worker;expect(!!n).toEqual(!1),expect(e.destroyed).toEqual(!0),t()})).catch(t.fail)})),it("worker created and can be used in getDocument",(function(e){(0,_is_node2.default)()&&pending("Worker is not supported in Node.js.");var n=new _api.PDFWorker({name:"test1"}),o=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(t,{worker:n}));o.promise.then((function(){var t=o._worker;expect(!!t).toEqual(!1);var e=o._transport.messageHandler.comObj;expect(e===n.port).toEqual(!0)}));var i=o.promise.then((function(){return o.destroy()}));i.then((function(){expect(n.destroyed).toEqual(!1),n.destroy(),e()})).catch(e.fail)})),it("creates more than one worker",(function(t){(0,_is_node2.default)()&&pending("Worker is not supported in Node.js.");var e=new _api.PDFWorker({name:"test1"}),n=new _api.PDFWorker({name:"test2"}),o=new _api.PDFWorker({name:"test3"}),i=Promise.all([e.promise,n.promise,o.promise]);i.then((function(){expect(e.port!==n.port&&e.port!==o.port&&n.port!==o.port).toEqual(!0),e.destroy(),n.destroy(),o.destroy(),t()})).catch(t.fail)})),it("gets current workerSrc",(function(){(0,_is_node2.default)()&&pending("Worker is not supported in Node.js.");var t=_api.PDFWorker.getWorkerSrc();expect("undefined"===typeof t?"undefined":_typeof(t)).toEqual("string"),expect(t).toEqual(_worker_options.GlobalWorkerOptions.workerSrc)}))})),describe("PDFDocument",(function(){var t,o;beforeAll((function(e){t=(0,_api.getDocument)(n),t.promise.then((function(t){o=t,e()}))})),afterAll((function(e){t.destroy().then(e)})),it("gets number of pages",(function(){expect(o.numPages).toEqual(3)})),it("gets fingerprint",(function(){var t=o.fingerprint;expect("undefined"===typeof t?"undefined":_typeof(t)).toEqual("string"),expect(t.length>0).toEqual(!0)})),it("gets page",(function(t){var e=o.getPage(1);e.then((function(e){expect(e instanceof _api.PDFPageProxy).toEqual(!0),expect(e.pageIndex).toEqual(0),t()})).catch(t.fail)})),it("gets non-existent page",(function(t){var e=o.getPage(100),n=o.getPage(2.5),i=o.getPage("1");e=e.then((function(){throw new Error("shall fail for out-of-range pageNumber parameter")}),(function(t){expect(t instanceof Error).toEqual(!0)})),n=n.then((function(){throw new Error("shall fail for non-integer pageNumber parameter")}),(function(t){expect(t instanceof Error).toEqual(!0)})),i=i.then((function(){throw new Error("shall fail for non-number pageNumber parameter")}),(function(t){expect(t instanceof Error).toEqual(!0)})),Promise.all([e,n,i]).then((function(){t()})).catch(t.fail)})),it("gets page index",(function(t){var e={num:17,gen:0},n=o.getPageIndex(e);n.then((function(e){expect(e).toEqual(1),t()})).catch(t.fail)})),it("gets invalid page index",(function(t){var e={num:3,gen:0},n=o.getPageIndex(e);n.then((function(){t.fail("shall fail for invalid page reference.")})).catch((function(e){expect(e instanceof Error).toEqual(!0),t()}))})),it("gets destinations, from /Dests dictionary",(function(t){var e=o.getDestinations();e.then((function(e){expect(e).toEqual({chapter1:[{gen:0,num:17},{name:"XYZ"},0,841.89,null]}),t()})).catch(t.fail)})),it("gets a destination, from /Dests dictionary",(function(t){var e=o.getDestination("chapter1");e.then((function(e){expect(e).toEqual([{gen:0,num:17},{name:"XYZ"},0,841.89,null]),t()})).catch(t.fail)})),it("gets a non-existent destination, from /Dests dictionary",(function(t){var e=o.getDestination("non-existent-named-destination");e.then((function(e){expect(e).toEqual(null),t()})).catch(t.fail)})),it("gets destinations, from /Names (NameTree) dictionary",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue6204.pdf")),n=e.promise.then((function(t){return t.getDestinations()}));n.then((function(n){expect(n).toEqual({"Page.1":[{num:1,gen:0},{name:"XYZ"},0,375,null],"Page.2":[{num:6,gen:0},{name:"XYZ"},0,375,null]}),e.destroy().then(t)})).catch(t.fail)})),it("gets a destination, from /Names (NameTree) dictionary",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue6204.pdf")),n=e.promise.then((function(t){return t.getDestination("Page.1")}));n.then((function(n){expect(n).toEqual([{num:1,gen:0},{name:"XYZ"},0,375,null]),e.destroy().then(t)})).catch(t.fail)})),it("gets a non-existent destination, from /Names (NameTree) dictionary",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue6204.pdf")),n=e.promise.then((function(t){return t.getDestination("non-existent-named-destination")}));n.then((function(n){expect(n).toEqual(null),e.destroy().then(t)})).catch(t.fail)})),it("gets non-string destination",(function(t){var e=o.getDestination(4.3),n=o.getDestination(!0),i=o.getDestination([{num:17,gen:0},{name:"XYZ"},0,841.89,null]);e=e.then((function(){throw new Error("shall fail for non-string destination.")}),(function(t){expect(t instanceof Error).toEqual(!0)})),n=n.then((function(){throw new Error("shall fail for non-string destination.")}),(function(t){expect(t instanceof Error).toEqual(!0)})),i=i.then((function(){throw new Error("shall fail for non-string destination.")}),(function(t){expect(t instanceof Error).toEqual(!0)})),Promise.all([e,n,i]).then(t,t.fail)})),it("gets non-existent page labels",(function(t){var e=o.getPageLabels();e.then((function(e){expect(e).toEqual(null),t()})).catch(t.fail)})),it("gets page labels",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("bug793632.pdf")),n=e.promise.then((function(t){return t.getPageLabels()})),o=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue1453.pdf")),i=o.promise.then((function(t){return t.getPageLabels()})),a=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("rotation.pdf")),r=a.promise.then((function(t){return t.getPageLabels()})),s=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("bad-PageLabels.pdf")),u=s.promise.then((function(t){return t.getPageLabels()}));Promise.all([n,i,r,u]).then((function(n){expect(n[0]).toEqual(["i","ii","iii","1"]),expect(n[1]).toEqual(["Front Page1"]),expect(n[2]).toEqual(["1","2"]),expect(n[3]).toEqual(["X3"]),Promise.all([e.destroy(),o.destroy(),a.destroy(),s.destroy()]).then(t)})).catch(t.fail)})),it("gets default page mode",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("tracemonkey.pdf"));e.promise.then((function(t){return t.getPageMode()})).then((function(n){expect(n).toEqual("UseNone"),e.destroy().then(t)})).catch(t.fail)})),it("gets non-default page mode",(function(t){o.getPageMode().then((function(e){expect(e).toEqual("UseOutlines"),t()})).catch(t.fail)})),it("gets non-existent attachments",(function(t){var e=o.getAttachments();e.then((function(e){expect(e).toEqual(null),t()})).catch(t.fail)})),it("gets attachments",(function(t){(0,_is_node2.default)()&&pending("TODO: Use a non-linked test-case.");var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("bug766138.pdf")),n=e.promise.then((function(t){return t.getAttachments()}));n.then((function(n){var o=n["Press Quality.joboptions"];expect(o.filename).toEqual("Press Quality.joboptions"),expect(o.content instanceof Uint8Array).toBeTruthy(),expect(o.content.length).toEqual(30098),e.destroy().then(t)})).catch(t.fail)})),it("gets javascript",(function(t){var e=o.getJavaScript();e.then((function(e){expect(e).toEqual(null),t()})).catch(t.fail)}));var i=/\bprint\s*\(/;it("gets javascript with printing instructions (Print action)",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("bug1001080.pdf")),n=e.promise.then((function(t){return t.getJavaScript()}));n.then((function(n){expect(n).toEqual(["print({});"]),expect(n[0]).toMatch(i),e.destroy().then(t)})).catch(t.fail)})),it("gets javascript with printing instructions (JS action)",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue6106.pdf")),n=e.promise.then((function(t){return t.getJavaScript()}));n.then((function(n){expect(n).toEqual(["this.print({bUI:true,bSilent:false,bShrinkToFit:true});"]),expect(n[0]).toMatch(i),e.destroy().then(t)})).catch(t.fail)})),it("gets non-existent outline",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("tracemonkey.pdf")),n=e.promise.then((function(t){return t.getOutline()}));n.then((function(n){expect(n).toEqual(null),e.destroy().then(t)})).catch(t.fail)})),it("gets outline",(function(t){var e=o.getOutline();e.then((function(e){expect(Array.isArray(e)).toEqual(!0),expect(e.length).toEqual(2);var n=e[1];expect(n.title).toEqual("Chapter 1"),expect(Array.isArray(n.dest)).toEqual(!0),expect(n.url).toEqual(null),expect(n.unsafeUrl).toBeUndefined(),expect(n.newWindow).toBeUndefined(),expect(n.bold).toEqual(!0),expect(n.italic).toEqual(!1),expect(n.color).toEqual(new Uint8ClampedArray([0,64,128])),expect(n.items.length).toEqual(1),expect(n.items[0].title).toEqual("Paragraph 1.1"),t()})).catch(t.fail)})),it("gets outline containing a url",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue3214.pdf"));e.promise.then((function(n){n.getOutline().then((function(n){expect(Array.isArray(n)).toEqual(!0),expect(n.length).toEqual(5);var o=n[2];expect(_typeof(o.title)).toEqual("string"),expect(o.dest).toEqual(null),expect(o.url).toEqual("http://google.com/"),expect(o.unsafeUrl).toEqual("http://google.com"),expect(o.newWindow).toBeUndefined();var i=n[1];expect(i.bold).toEqual(!1),expect(i.italic).toEqual(!0),expect(i.color).toEqual(new Uint8ClampedArray([0,0,0])),e.destroy().then(t)}))})).catch(t.fail)})),it("gets non-existent permissions",(function(t){o.getPermissions().then((function(e){expect(e).toEqual(null),t()})).catch(t.fail)})),it("gets permissions",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue9972-1.pdf")),n=e.promise.then((function(t){return t.getPermissions()})),o=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue9972-2.pdf")),i=o.promise.then((function(t){return t.getPermissions()})),a=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue9972-3.pdf")),r=a.promise.then((function(t){return t.getPermissions()})),s=Object.keys(_util.PermissionFlag).length;Promise.all([n,i,r]).then((function(n){expect(n[0].length).toEqual(s-1),expect(n[0].includes(_util.PermissionFlag.MODIFY_CONTENTS)).toBeFalsy(),expect(n[1].length).toEqual(s-2),expect(n[1].includes(_util.PermissionFlag.PRINT)).toBeFalsy(),expect(n[1].includes(_util.PermissionFlag.PRINT_HIGH_QUALITY)).toBeFalsy(),expect(n[2].length).toEqual(s-1),expect(n[2].includes(_util.PermissionFlag.COPY)).toBeFalsy(),Promise.all([e.destroy(),o.destroy(),a.destroy()]).then(t)})).catch(t.fail)})),it("gets metadata",(function(t){var e=o.getMetadata();e.then((function(e){var n=e.info,o=e.metadata,i=e.contentDispositionFilename;expect(n["Title"]).toEqual("Basic API Test"),expect(n["PDFFormatVersion"]).toEqual("1.7"),expect(n["IsLinearized"]).toEqual(!1),expect(n["IsAcroFormPresent"]).toEqual(!1),expect(n["IsXFAPresent"]).toEqual(!1),expect(o instanceof _metadata.Metadata).toEqual(!0),expect(o.get("dc:title")).toEqual("Basic API Test"),expect(i).toEqual(null),t()})).catch(t.fail)})),it("gets data",(function(t){var n=o.getData();n.then((function(n){expect(n instanceof Uint8Array).toEqual(!0),expect(n.length).toEqual(e),t()})).catch(t.fail)})),it("gets download info",(function(t){var n=o.getDownloadInfo();n.then((function(n){expect(n).toEqual({length:e}),t()})).catch(t.fail)})),it("gets document stats",(function(t){var e=o.getStats();e.then((function(e){expect(e).toEqual({streamTypes:[],fontTypes:[]}),t()})).catch(t.fail)})),it("checks that fingerprints are unique",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue4436r.pdf")),n=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("issue4575.pdf")),o=[e.promise,n.promise];Promise.all(o).then((function(o){var i=o[0].fingerprint;expect("undefined"===typeof i?"undefined":_typeof(i)).toEqual("string"),expect(i.length>0).toEqual(!0);var a=o[1].fingerprint;expect("undefined"===typeof a?"undefined":_typeof(a)).toEqual("string"),expect(a.length>0).toEqual(!0),expect(i).not.toEqual(a),Promise.all([e.destroy(),n.destroy()]).then(t)})).catch(t.fail)})),describe("Cross-origin",(function(){var t;function e(e,n,o){(0,_is_node2.default)()&&pending("Cannot simulate cross-origin requests in Node.js");var i=(0,_test_utils.buildGetDocumentParams)(n,o),a=new URL(i.url);return"localhost"===a.hostname?a.hostname="127.0.0.1":"127.0.0.1"===i.url.hostname?a.hostname="localhost":pending("Can only run cross-origin test on localhost!"),i.url=a.href,t=(0,_api.getDocument)(i),t.promise.then((function(t){return t.destroy()})).then((function(){expect(e).toEqual(!0)}),(function(t){e&&expect(t).toEqual("There should not be any error"),expect(e).toEqual(!1)}))}function n(t,n){return e(!0,t,n)}function o(t,n){return e(!1,t,n)}afterEach((function(e){t?t.destroy().then(e):e()})),it("server disallows cors",(function(t){o("basicapi.pdf").then(t)})),it("server allows cors without credentials, default withCredentials",(function(t){n("basicapi.pdf?cors=withoutCredentials").then(t)})),it("server allows cors without credentials, and withCredentials=false",(function(t){n("basicapi.pdf?cors=withoutCredentials",{withCredentials:!1}).then(t)})),it("server allows cors without credentials, but withCredentials=true",(function(t){o("basicapi.pdf?cors=withoutCredentials",{withCredentials:!0}).then(t)})),it("server allows cors with credentials, and withCredentials=true",(function(t){n("basicapi.pdf?cors=withCredentials",{withCredentials:!0}).then(t)})),it("server allows cors with credentials, and withCredentials=false",(function(t){n("basicapi.pdf?cors=withCredentials",{withCredentials:!1}).then(t)}))}))})),describe("Page",(function(){var e,i,a;beforeAll((function(t){e=(0,_api.getDocument)(n),e.promise.then((function(e){i=e,i.getPage(1).then((function(e){a=e,t()}))})).catch(t.fail)})),afterAll((function(t){e.destroy().then(t)})),it("gets page number",(function(){expect(a.pageNumber).toEqual(1)})),it("gets rotate",(function(){expect(a.rotate).toEqual(0)})),it("gets ref",(function(){expect(a.ref).toEqual({num:15,gen:0})})),it("gets userUnit",(function(){expect(a.userUnit).toEqual(1)})),it("gets view",(function(){expect(a.view).toEqual([0,0,595.28,841.89])})),it("gets viewport",(function(){var t=a.getViewport(1.5,90);expect(t.viewBox).toEqual(a.view),expect(t.scale).toEqual(1.5),expect(t.rotation).toEqual(90),expect(t.transform).toEqual([0,1.5,1.5,0,0,0]),expect(t.width).toEqual(1262.835),expect(t.height).toEqual(892.92)})),it('gets viewport respecting "dontFlip" argument',(function(){var t=1,e=135,n=a.getViewport(t,e),o=a.getViewport(t,e,!0);expect(o).not.toEqual(n),expect(o).toEqual(n.clone({dontFlip:!0})),expect(n.transform).toEqual([1,0,0,-1,0,841.89]),expect(o.transform).toEqual([1,0,-0,1,0,0])})),it("gets annotations",(function(t){var e=a.getAnnotations().then((function(t){expect(t.length).toEqual(4)})),n=a.getAnnotations({intent:"display"}).then((function(t){expect(t.length).toEqual(4)})),o=a.getAnnotations({intent:"print"}).then((function(t){expect(t.length).toEqual(4)}));Promise.all([e,n,o]).then((function(){t()})).catch(t.fail)})),it("gets annotations containing relative URLs (bug 766086)",(function(t){var e="bug766086.pdf",n=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e)),o=n.promise.then((function(t){return t.getPage(1).then((function(t){return t.getAnnotations()}))})),i=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e,{docBaseUrl:"http://www.example.com/test/pdfs/qwerty.pdf"})),a=i.promise.then((function(t){return t.getPage(1).then((function(t){return t.getAnnotations()}))})),r=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(e,{docBaseUrl:"qwerty.pdf"})),s=r.promise.then((function(t){return t.getPage(1).then((function(t){return t.getAnnotations()}))}));Promise.all([o,a,s]).then((function(e){var o=e[0],a=e[1],s=e[2];expect(o[0].url).toBeUndefined(),expect(o[0].unsafeUrl).toEqual("../../0021/002156/215675E.pdf#15"),expect(a[0].url).toEqual("http://www.example.com/0021/002156/215675E.pdf#15"),expect(a[0].unsafeUrl).toEqual("../../0021/002156/215675E.pdf#15"),expect(s[0].url).toBeUndefined(),expect(s[0].unsafeUrl).toEqual("../../0021/002156/215675E.pdf#15"),Promise.all([n.destroy(),i.destroy(),r.destroy()]).then(t)})).catch(t.fail)})),it("gets text content",(function(t){var e=a.getTextContent(),n=a.getTextContent({normalizeWhitespace:!0,disableCombineTextItems:!0}),o=[e,n];Promise.all(o).then((function(e){expect(!!e[0].items).toEqual(!0),expect(e[0].items.length).toEqual(7),expect(!!e[0].styles).toEqual(!0),expect(JSON.stringify(e[0])).toEqual(JSON.stringify(e[1])),t()})).catch(t.fail)})),it("gets operator list",(function(t){var e=a.getOperatorList();e.then((function(e){expect(!!e.fnArray).toEqual(!0),expect(!!e.argsArray).toEqual(!0),expect(e.lastChunk).toEqual(!0),t()})).catch(t.fail)})),it("gets operatorList with JPEG image (issue 4888)",(function(t){var e=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)("cmykjpeg.pdf"));e.promise.then((function(e){e.getPage(1).then((function(e){e.getOperatorList().then((function(n){var o=n.fnArray.indexOf(_util.OPS.paintImageXObject),i=n.argsArray[o],a=e.objs.get(i[0]),r=a.data;expect(r instanceof Uint8ClampedArray).toEqual(!0),expect(r.length).toEqual(9e4),t()}))}))})).catch(t.fail)})),it("gets document stats after parsing page",(function(t){var e=a.getOperatorList().then((function(){return i.getStats()})),n=[];n[_util.StreamType.FLATE]=!0;var o=[];o[_util.FontType.TYPE1]=!0,o[_util.FontType.CIDFONTTYPE2]=!0,e.then((function(e){expect(e).toEqual({streamTypes:n,fontTypes:o}),t()})).catch(t.fail)})),it("gets page stats after parsing page, without `pdfBug` set",(function(t){a.getOperatorList().then((function(t){return a.stats})).then((function(e){expect(e).toEqual(null),t()}),t.fail)})),it("gets page stats after parsing page, with `pdfBug` set",(function(e){var n=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(t,{pdfBug:!0}));n.promise.then((function(t){return t.getPage(1).then((function(t){return t.getOperatorList().then((function(e){return t.stats}))}))})).then((function(t){expect(t instanceof _dom_utils.StatTimer).toEqual(!0),expect(t.times.length).toEqual(1);var o=_slicedToArray(t.times,1),i=o[0];expect(i.name).toEqual("Page Request"),expect(i.end-i.start).toBeGreaterThan(0),n.destroy().then(e)}),e.fail)})),it("gets page stats after rendering page, with `pdfBug` set",(function(e){(0,_is_node2.default)()&&pending("TODO: Support Canvas testing in Node.js.");var n=(0,_api.getDocument)((0,_test_utils.buildGetDocumentParams)(t,{pdfBug:!0})),i=void 0;n.promise.then((function(t){return t.getPage(1).then((function(t){var e=t.getViewport(1);i=o.create(e.width,e.height);var n=t.render({canvasContext:i.context,viewport:e});return n.promise.then((function(){return t.stats}))}))})).then((function(t){expect(t instanceof _dom_utils.StatTimer).toEqual(!0),expect(t.times.length).toEqual(3);var a=_slicedToArray(t.times,3),r=a[0],s=a[1],u=a[2];expect(r.name).toEqual("Page Request"),expect(r.end-r.start).toBeGreaterThan(0),expect(s.name).toEqual("Rendering"),expect(s.end-s.start).toBeGreaterThan(0),expect(u.name).toEqual("Overall"),expect(u.end-u.start).toBeGreaterThan(0),o.destroy(i),n.destroy().then(e)}),e.fail)})),it("cancels rendering of page",(function(t){(0,_is_node2.default)()&&pending("TODO: Support Canvas testing in Node.js.");var e=a.getViewport(1),n=o.create(e.width,e.height),i=a.render({canvasContext:n.context,viewport:e});i.cancel(),i.promise.then((function(){t.fail("shall cancel rendering")})).catch((function(e){expect(e instanceof _dom_utils.RenderingCancelledException).toEqual(!0),expect(e.type).toEqual("canvas"),o.destroy(n),t()}))})),it("re-render page, using the same canvas, after cancelling rendering",(function(t){(0,_is_node2.default)()&&pending("TODO: Support Canvas testing in Node.js.");var e=a.getViewport(1),n=o.create(e.width,e.height),i=a.render({canvasContext:n.context,viewport:e});i.cancel(),i.promise.then((function(){throw new Error("shall cancel rendering")}),(function(t){expect(t instanceof _dom_utils.RenderingCancelledException).toEqual(!0)})).then((function(){var t=a.render({canvasContext:n.context,viewport:e});return t.promise})).then((function(){o.destroy(n),t()}),t.fail)})),it("multiple render() on the same canvas",(function(t){(0,_is_node2.default)()&&pending("TODO: Support Canvas testing in Node.js.");var e=a.getViewport(1),n=o.create(e.width,e.height),i=a.render({canvasContext:n.context,viewport:e}),r=a.render({canvasContext:n.context,viewport:e});Promise.all([i.promise,r.promise.then((function(){t.fail("shall fail rendering")}),(function(t){expect(/multiple render\(\)/.test(t.message)).toEqual(!0)}))]).then(t)}))})),describe("Multiple `getDocument` instances",(function(){var t=(0,_test_utils.buildGetDocumentParams)("tracemonkey.pdf"),e=(0,_test_utils.buildGetDocumentParams)("TAMReview.pdf"),n=(0,_test_utils.buildGetDocumentParams)("issue6068.pdf"),i=[],a=[];function r(t){var e=(0,_api.getDocument)(t);return i.push(e),e.promise.then((function(t){return a.push(t),t.getPage(1)})).then((function(t){var e=t.getViewport(1.2),n=o.create(e.width,e.height);return t.render({canvasContext:n.context,viewport:e}).then((function(){var t=n.canvas.toDataURL();return o.destroy(n),t}))}))}afterEach((function(t){var e=a.map((function(t){return t.destroy()})),n=i.map((function(t){return t.destroy()}));Promise.all(e.concat(n)).then((function(){t()}))})),it("should correctly render PDFs in parallel",(function(o){var i,a,s;(0,_is_node2.default)()&&pending("TODO: Support Canvas testing in Node.js.");var u=r(t).then((function(t){return i=t,r(e)})).then((function(t){return a=t,r(n)})).then((function(o){return s=o,Promise.all([r(t),r(e),r(n)])})).then((function(t){return expect(t[0]).toEqual(i),expect(t[1]).toEqual(a),expect(t[2]).toEqual(s),!0}));u.then((function(){o()})).catch(o.fail)}))})),describe("PDFDataRangeTransport",(function(){var t;function e(){var e=new URL("../pdfs/tracemonkey.pdf",window.location).href;return t||(t=new Promise((function(t,n){var o=new XMLHttpRequest(e);o.open("GET",e),o.responseType="arraybuffer",o.onload=function(){t(new Uint8Array(o.response))},o.onerror=function(){n(new Error("PDF is not loaded"))},o.send()})),t)}it("should fetch document info and page using ranges",(function(t){var n;(0,_is_node2.default)()&&pending("XMLHttpRequest is not supported in Node.js.");var o,a=4e3,r=0,s=e().then((function(t){var e=t.subarray(0,a);n=new _api.PDFDataRangeTransport(t.length,e),n.requestDataRange=function(e,o){r++,i((function(){n.onDataProgress(4e3),n.onDataRange(e,t.subarray(e,o))}))};var o=(0,_api.getDocument)(n);return o.promise})),u=s.then((function(t){o=t;var e=o.getPage(10);return e}));u.then((function(e){expect(o.numPages).toEqual(14),expect(e.rotate).toEqual(0),expect(r).toBeGreaterThan(2),t()})).catch(t.fail)})),it("should fetch document info and page using range and streaming",(function(t){var n;(0,_is_node2.default)()&&pending("XMLHttpRequest is not supported in Node.js.");var o,a=4e3,r=0,s=e().then((function(t){var e=t.subarray(0,a);n=new _api.PDFDataRangeTransport(t.length,e),n.requestDataRange=function(e,o){r++,1===r&&n.onDataProgressiveRead(t.subarray(a)),i((function(){n.onDataRange(e,t.subarray(e,o))}))};var o=(0,_api.getDocument)(n);return o.promise})),u=s.then((function(t){o=t;var e=o.getPage(10);return e}));u.then((function(e){expect(o.numPages).toEqual(14),expect(e.rotate).toEqual(0),expect(r).toEqual(1),t()})).catch(t.fail)}))}))}));