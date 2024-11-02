"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TestReporter=void 0;const TestReporter=function(e){function t(s,n,o){const i=new XMLHttpRequest;i.open("POST",s,!0),i.setRequestHeader("Content-Type","application/json"),i.onreadystatechange=function(e){4===i.readyState&&(200!==i.status?t(s,n,o):o&&o())},n.browser=e,i.send(JSON.stringify(n))}function s(e){t("/info",{message:e})}function n(e,s,n){const o={status:e,description:s};"undefined"!==typeof n&&(o.error=n),t("/submit_task_results",o)}function o(){t(`/tellMeToQuit?browser=${escape(e)}`,{})}this.now=function(){return Date.now()},this.jasmineStarted=function(t){this.runnerStartTime=this.now();const n=t.totalSpecsDefined,o=t.order.seed;s(`Started ${n} tests for ${e} with seed ${o}.`)},this.suiteStarted=function(e){if(e.failedExpectations.length>0){let t="";for(const s of e.failedExpectations)t+=`${s.message} `;n("TEST-UNEXPECTED-FAIL",e.description,t)}},this.specStarted=function(e){},this.specDone=function(e){if(0===e.failedExpectations.length)n("TEST-PASSED",e.description);else{let t="";for(const s of e.failedExpectations)t+=`${s.message} `;n("TEST-UNEXPECTED-FAIL",e.description,t)}},this.suiteDone=function(e){},this.jasmineDone=function(){setTimeout(o,500)}};exports.TestReporter=TestReporter;