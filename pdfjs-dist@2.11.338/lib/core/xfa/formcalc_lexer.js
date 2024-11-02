"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TOKEN=exports.Token=exports.Lexer=void 0;const KEYWORDS=new Set(["and","break","continue","do","downto","else","elseif","end","endfor","endfunc","endif","endwhile","eq","exit","for","foreach","func","ge","gt","if","in","infinity","le","lt","nan","ne","not","null","or","return","step","then","this","throw","upto","var","while"]),TOKEN={and:0,divide:1,dot:2,dotDot:3,dotHash:4,dotStar:5,eq:6,ge:7,gt:8,le:9,leftBracket:10,leftParen:11,lt:12,minus:13,ne:14,not:15,null:16,number:17,or:18,plus:19,rightBracket:20,rightParen:21,string:22,this:23,times:24,identifier:25,break:26,continue:27,do:28,for:29,foreach:30,func:31,if:32,var:33,while:34,assign:35,comma:36,downto:37,else:38,elseif:39,end:40,endif:41,endfor:42,endfunc:43,endwhile:44,eof:45,exit:46,in:47,infinity:48,nan:49,return:50,step:51,then:52,throw:53,upto:54};exports.TOKEN=TOKEN;const hexPattern=/^[uU]([0-9a-fA-F]{4,8})/,numberPattern=/^\d*(?:\.\d*)?(?:[Ee][+-]?\d+)?/,dotNumberPattern=/^\d*(?:[Ee][+-]?\d+)?/,eolPattern=/[\r\n]+/,identifierPattern=new RegExp("^[\\p{L}_$!][\\p{L}\\p{N}_$]*","u");class Token{constructor(t,e=null){this.id=t,this.value=e}}exports.Token=Token;const Singletons=function(){const t=Object.create(null),e=new Set(["identifier","string","number","nan","infinity"]);for(const[s,n]of Object.entries(TOKEN))e.has(s)||(t[s]=new Token(n));return t.nan=new Token(TOKEN.number,NaN),t.infinity=new Token(TOKEN.number,1/0),t}();class Lexer{constructor(t){this.data=t,this.pos=0,this.len=t.length,this.strBuf=[]}skipUntilEOL(){const t=this.data.slice(this.pos).match(eolPattern);t?this.pos+=t.index+t[0].length:this.pos=this.len}getIdentifier(){this.pos--;const t=this.data.slice(this.pos).match(identifierPattern);if(!t)throw new Error(`Invalid token in FormCalc expression at position ${this.pos}.`);const e=this.data.slice(this.pos,this.pos+t[0].length);this.pos+=t[0].length;const s=e.toLowerCase();return KEYWORDS.has(s)?Singletons[s]:new Token(TOKEN.identifier,e)}getString(){const t=this.strBuf,e=this.data;let s=this.pos;while(this.pos<this.len){const n=e.charCodeAt(this.pos++);if(34===n){if(34===e.charCodeAt(this.pos)){t.push(e.slice(s,this.pos++)),s=this.pos;continue}break}if(92===n){const n=e.substring(this.pos,this.pos+10).match(hexPattern);if(!n)continue;t.push(e.slice(s,this.pos-1));const i=n[1];4===i.length?(t.push(String.fromCharCode(parseInt(i,16))),s=this.pos+=5):8!==i.length?(t.push(String.fromCharCode(parseInt(i.slice(0,4),16))),s=this.pos+=5):(t.push(String.fromCharCode(parseInt(i,16))),s=this.pos+=9)}}const n=e.slice(s,this.pos-1);if(0===t.length)return new Token(TOKEN.string,n);t.push(n);const i=t.join("");return t.length=0,new Token(TOKEN.string,i)}getNumber(t){const e=this.data.substring(this.pos).match(numberPattern);if(!e)return t-48;const s=parseFloat(this.data.substring(this.pos-1,this.pos+e[0].length));return this.pos+=e[0].length,new Token(TOKEN.number,s)}getCompOperator(t,e){return 61===this.data.charCodeAt(this.pos)?(this.pos++,t):e}getLower(){const t=this.data.charCodeAt(this.pos);return 61===t?(this.pos++,Singletons.le):62===t?(this.pos++,Singletons.ne):Singletons.lt}getSlash(){return 47!==this.data.charCodeAt(this.pos)||(this.skipUntilEOL(),!1)}getDot(){const t=this.data.charCodeAt(this.pos);if(46===t)return this.pos++,Singletons.dotDot;if(42===t)return this.pos++,Singletons.dotStar;if(35===t)return this.pos++,Singletons.dotHash;if(48<=t&&t<=57){this.pos++;const e=this.data.substring(this.pos).match(dotNumberPattern);if(!e)return new Token(TOKEN.number,(t-48)/10);const s=this.pos+e[0].length,n=parseFloat(this.data.substring(this.pos-2,s));return this.pos=s,new Token(TOKEN.number,n)}return Singletons.dot}next(){while(this.pos<this.len){const t=this.data.charCodeAt(this.pos++);switch(t){case 9:case 10:case 11:case 12:case 13:case 32:break;case 34:return this.getString();case 38:return Singletons.and;case 40:return Singletons.leftParen;case 41:return Singletons.rightParen;case 42:return Singletons.times;case 43:return Singletons.plus;case 44:return Singletons.comma;case 45:return Singletons.minus;case 46:return this.getDot();case 47:if(this.getSlash())return Singletons.divide;break;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.getNumber(t);case 59:this.skipUntilEOL();break;case 60:return this.getLower();case 61:return this.getCompOperator(Singletons.eq,Singletons.assign);case 62:return this.getCompOperator(Singletons.ge,Singletons.gt);case 91:return Singletons.leftBracket;case 93:return Singletons.rightBracket;case 124:return Singletons.or;default:return this.getIdentifier()}}return Singletons.eof}}exports.Lexer=Lexer;