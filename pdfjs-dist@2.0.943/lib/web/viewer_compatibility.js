"use strict";var compatibilityParams=Object.create(null),userAgent="undefined"!==typeof navigator&&navigator.userAgent||"",isAndroid=/Android/.test(userAgent),isIOS=/\b(iPad|iPhone|iPod)(?=;)/.test(userAgent);(function(){(isIOS||isAndroid)&&(compatibilityParams.maxCanvasPixels=5242880)})(),exports.viewerCompatibilityParams=Object.freeze(compatibilityParams);