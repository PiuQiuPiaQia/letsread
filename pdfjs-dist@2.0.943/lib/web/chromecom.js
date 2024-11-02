"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ChromeCom=void 0;var ChromeCom,chromeFileAccessOverlayPromise,port,storageArea,ChromePreferences,ChromeExternalServices,_regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}}(),_app=require("./app"),_app_options=require("./app_options"),_preferences=require("./preferences"),_download_manager=require("./download_manager"),_genericl10n=require("./genericl10n"),_pdf=require("../pdf");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise((function(e,t){function o(n,i){try{var a=r[n](i),s=a.value}catch(l){return void t(l)}if(!a.done)return Promise.resolve(s).then((function(e){o("next",e)}),(function(e){o("throw",e)}));e(s)}return o("next")}))}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!==typeof r&&"function"!==typeof r?e:r}function _inherits(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}throw new Error('Module "pdfjs-web/chromecom" shall not be used outside CHROME build.');function getEmbedderOrigin(e){var r=window===top?location.origin:location.ancestorOrigins[0];"null"===r?getParentOrigin(e):e(r)}function getParentOrigin(e){ChromeCom.request("getParentOrigin",null,e)}function isAllowedFileSchemeAccess(e){ChromeCom.request("isAllowedFileSchemeAccess",null,e)}function isRuntimeAvailable(){try{if(chrome.runtime&&chrome.runtime.getManifest())return!0}catch(e){}return!1}function reloadIfRuntimeIsUnavailable(){isRuntimeAvailable()||location.reload()}function requestAccessToLocalFile(e,r,t){var o=null;top!==window&&(window.addEventListener("focus",reloadIfRuntimeIsUnavailable),o=function(){window.removeEventListener("focus",reloadIfRuntimeIsUnavailable),reloadIfRuntimeIsUnavailable(),r.close("chromeFileAccessOverlay")}),chromeFileAccessOverlayPromise||(chromeFileAccessOverlayPromise=r.register("chromeFileAccessOverlay",document.getElementById("chromeFileAccessOverlay"),o,!0)),chromeFileAccessOverlayPromise.then((function(){var o=chrome.runtime.getManifest().icons[48];document.getElementById("chrome-pdfjs-logo-bg").style.backgroundImage="url("+chrome.runtime.getURL(o)+")";var n={am:"\u1208\u134b\u12ed\u120d \u12e9\u12a0\u122d\u12a4\u120d\u12ce\u127d \u1218\u12f3\u1228\u123b \u134d\u1240\u12f5",ar:"\u200f\u0627\u0644\u0633\u0645\u0627\u062d \u0628\u0627\u0644\u062f\u062e\u0648\u0644 \u0625\u0644\u0649 \u0639\u0646\u0627\u0648\u064a\u0646 URL \u0644\u0644\u0645\u0644\u0641\u0627\u062a",bg:"\u0414\u0430 \u0441\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0438 \u0434\u043e\u0441\u0442\u044a\u043f \u0434\u043e URL \u0430\u0434\u0440\u0435\u0441\u0438\u0442\u0435 \u043d\u0430 \u0444\u0430\u0439\u043b\u043e\u0432\u0435\u0442\u0435",bn:"\u09ab\u09be\u0987\u09b2 URL\u0997\u09c1\u09b2\u09bf\u09a4\u09c7 \u0985\u09cd\u09af\u09be\u0995\u09cd\u09b8\u09c7\u09b8 \u09ae\u099e\u09cd\u099c\u09c1\u09b0 \u0995\u09b0\u09c1\u09a8",ca:"Permet l'acc\xe9s als URL de fitxer",cs:"Umo\u017enit p\u0159\xedstup k adres\xe1m URL soubor\u016f",da:"Tillad adgang til webadresser p\xe5 filer",de:"Zugriff auf Datei-URLs zulassen",el:"\u039d\u03b1 \u03b5\u03c0\u03b9\u03c4\u03c1\u03ad\u03c0\u03b5\u03c4\u03b1\u03b9 \u03b7 \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7 \u03c3\u03b5 \u03b4\u03b9\u03b5\u03c5\u03b8\u03cd\u03bd\u03c3\u03b5\u03b9\u03c2 URL \u03b1\u03c1\u03c7\u03b5\u03af\u03c9\u03bd","en-GB":"Allow access to file URLs",es:"Permitir acceso a URL de archivo","es-419":"Permitir el acceso a las URL del archivo",et:"Luba juurdep\xe4\xe4s failide URL-idele",fa:"\u200f\u0627\u062c\u0627\u0632\u0647\u0654 \u062f\u0633\u062a\u0631\u0633\u06cc \u0628\u0647 URL \u0647\u0627\u06cc \u0641\u0627\u06cc\u0644",fi:"Salli tiedostojen URL-osoitteiden k\xe4ytt\xf6",fil:"Payagan ang access na mag-file ng mga URL",fr:"Autoriser l'acc\xe8s aux URL de fichier",gu:"URL \u0aab\u0abe\u0a87\u0ab2 \u0a95\u0ab0\u0ab5\u0abe \u0a8d\u0a95\u0acd\u0ab8\u0ac7\u0ab8\u0aa8\u0ac0 \u0aae\u0a82\u0a9c\u0ac2\u0ab0\u0ac0 \u0a86\u0aaa\u0acb",hi:"\u092b\u093c\u093e\u0907\u0932 URL \u0924\u0915 \u092a\u0939\u0941\u0902\u091a\u0928\u0947 \u0915\u0940 \u0905\u0928\u0941\u092e\u0924\u093f \u0926\u0947\u0902",hr:"Dozvoli pristup URL-ovima datoteke",hu:"F\xe1jl URL-ekhez val\xf3 hozz\xe1f\xe9r\xe9s enged\xe9lyez\xe9se",id:"Izinkan akses ke URL file",it:"Consenti l'accesso agli URL dei file",iw:"\u05d0\u05e4\u05e9\u05e8 \u05d2\u05d9\u05e9\u05d4 \u05dc\u05db\u05ea\u05d5\u05d1\u05d5\u05ea \u05d0\u05ea\u05e8\u05d9\u05dd \u05e9\u05dc \u05e7\u05d1\u05e6\u05d9\u05dd",ja:"\u30d5\u30a1\u30a4\u30eb\u306e URL \u3078\u306e\u30a2\u30af\u30bb\u30b9\u3092\u8a31\u53ef\u3059\u308b",kn:"URL \u0c97\u0cb3\u0ca8\u0ccd\u0ca8\u0cc1 \u0cab\u0cc8\u0cb2\u0ccd\u200c\u0c97\u0cb3\u0cbf\u0c97\u0cc6 \u0caa\u0ccd\u0cb0\u0cb5\u0cc7\u0cb6\u0cbf\u0cb8\u0cb2\u0cc1 \u0c85\u0ca8\u0cc1\u0cae\u0ca4\u0cbf\u0cb8\u0cbf",ko:"\ud30c\uc77c URL\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4 \ud5c8\uc6a9",lt:"Leisti pasiekti failo URL",lv:"At\u013caut piek\u013cuvi faila vietr\u0101\u017eiem URL",ml:"URL \u0d15\u0d33\u0d4d\u200d\u200c \u0d2b\u0d2f\u0d32\u0d4d\u200d\u200c \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d28\u0d4d\u0d28\u0d24\u0d3f\u0d28\u0d4d \u0d06\u0d15\u0d4d\u200d\u0d38\u0d38\u0d4d\u0d38\u0d4d \u0d05\u0d28\u0d41\u0d35\u0d26\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d15",mr:"\u092b\u093e\u0907\u0932 URL \u092e\u0927\u094d\u092f\u0947 \u092a\u094d\u0930\u0935\u0947\u0936\u093e\u0938 \u0905\u0928\u0941\u092e\u0924\u0940 \u0926\u094d\u092f\u093e",ms:"Membenarkan akses ke URL fail",nl:"Toegang tot bestand-URL's toestaan",no:"Tillat tilgang til filnettadresser",pl:"Zezwalaj na dost\u0119p do adres\xf3w URL plik\xf3w","pt-BR":"Permitir acesso aos URLs do arquivo","pt-PT":"Permitir acesso a URLs de ficheiro",ro:"Permite accesul la adresele URL de fi\u0219iere",ru:"\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u0442\u044c \u0444\u0430\u0439\u043b\u044b \u043f\u043e \u0441\u0441\u044b\u043b\u043a\u0430\u043c",sk:"Povoli\u0165 pr\xedstup k webov\xfdm adres\xe1m s\xfaboru",sl:"Dovoli dostop do URL-jev datoteke",sr:"\u0414\u043e\u0437\u0432\u043e\u043b\u0438 \u043f\u0440\u0438\u0441\u0442\u0443\u043f URL \u0430\u0434\u0440\u0435\u0441\u0430\u043c\u0430 \u0434\u0430\u0442\u043e\u0442\u0435\u043a\u0430",sv:"Till\xe5t \xe5tkomst till webbadresser i filen",sw:"Ruhusu kufikia URL za faili",ta:"\u0b95\u0bcb\u0baa\u0bcd\u0baa\u0bc1  URL\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b85\u0ba3\u0bc1\u0b95\u0bb2\u0bc8 \u0b85\u0ba9\u0bc1\u0bae\u0ba4\u0bbf",te:"\u0c2b\u0c48\u0c32\u0c4d URL\u0c32\u0c15\u0c41 \u0c2a\u0c4d\u0c30\u0c3e\u0c2a\u0c4d\u0c24\u0c3f\u0c28\u0c3f \u0c05\u0c28\u0c41\u0c2e\u0c24\u0c3f\u0c02\u0c1a\u0c41",th:"\u0e2d\u0e19\u0e38\u0e0d\u0e32\u0e15\u0e43\u0e2b\u0e49\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e44\u0e1f\u0e25\u0e4c URL",tr:"Dosya URL'lerine eri\u015fime izin ver",uk:"\u041d\u0430\u0434\u0430\u0432\u0430\u0442\u0438 \u0434\u043e\u0441\u0442\u0443\u043f \u0434\u043e URL-\u0430\u0434\u0440\u0435\u0441 \u0444\u0430\u0439\u043b\u0443",vi:"Cho ph\xe9p truy c\u1eadp v\xe0o c\xe1c URL c\u1ee7a t\u1ec7p","zh-CN":"\u5141\u8bb8\u8bbf\u95ee\u6587\u4ef6\u7f51\u5740","zh-TW":"\u5141\u8a31\u5b58\u53d6\u6a94\u6848\u7db2\u5740"}[chrome.i18n.getUILanguage&&chrome.i18n.getUILanguage()];n&&(document.getElementById("chrome-file-access-label").textContent=n);var i=document.getElementById("chrome-link-to-extensions-page");i.href="chrome://extensions/?id="+chrome.runtime.id,i.onclick=function(e){e.preventDefault(),ChromeCom.request("openExtensionsPageForFileAccess",{newTab:e.ctrlKey||e.metaKey||1===e.button||window!==top})},document.getElementById("chrome-url-of-local-file").textContent=e,document.getElementById("chrome-file-fallback").onchange=function(){var o=this.files[0];if(o){var n=decodeURIComponent(e.split("/").pop()),i=e;if(n!==o.name){var a="The selected file does not match the original file.\nOriginal: "+n+"\nSelected: "+o.name+"\nDo you want to open the selected file?";if(!confirm(a))return void(this.value="");i="file:///fakepath/to/"+encodeURIComponent(o.name)}t(_pdf.URL.createObjectURL(o),o.size,i),r.close("chromeFileAccessOverlay")}},r.open("chromeFileAccessOverlay")}))}function setReferer(e,r){function t(e){if(e){var r=window.history.state||{};r.chromecomState=e,window.history.replaceState(r,"")}n()}function o(){port=null,r()}function n(){port.onDisconnect.removeListener(o),port.onMessage.removeListener(t),r()}port||(port=chrome.runtime.connect({name:"chromecom-referrer"})),port.onDisconnect.addListener(o),port.onMessage.addListener(t),port.postMessage({referer:window.history.state&&window.history.state.chromecomState,requestUrl:e})}