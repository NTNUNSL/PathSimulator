define("ace/snippets","require exports module ace/lib/oop ace/lib/event_emitter ace/lib/lang ace/range ace/anchor ace/keyboard/hash_handler ace/tokenizer ace/lib/dom ace/editor".split(" "),function(f,m,y){var q=f("./lib/oop"),v=f("./lib/event_emitter").EventEmitter,h=f("./lib/lang"),p=f("./range").Range;f("./anchor");var x=f("./keyboard/hash_handler").HashHandler,t=f("./tokenizer").Tokenizer,n=p.comparePoints,g=function(){this.snippetMap={};this.snippetNameMap={}};(function(){q.implement(this,v);
this.getTokenizer=function(){function a(a,c,e){a=a.substr(1);return/^\d+$/.test(a)&&!e.inFormatString?[{tabstopId:parseInt(a,10)}]:[{text:a}]}function c(a){return"(?:[^\\\\"+a+"]|\\\\.)"}g.$tokenizer=new t({start:[{regex:/:/,onMatch:function(a,c,e){return e.length&&e[0].expectIf?(e[0].expectIf=!1,e[0].elseBranch=e[0],[e[0]]):":"}},{regex:/\\./,onMatch:function(a,c,e){c=a[1];"}"==c&&e.length?a=c:-1!="`$\\".indexOf(c)?a=c:e.inFormatString&&("n"==c?a="\n":"t"==c?a="\n":-1!="ulULE".indexOf(c)&&(a={changeCase:c,
local:"a"<c}));return[a]}},{regex:/}/,onMatch:function(a,c,e){return[e.length?e.shift():a]}},{regex:/\$(?:\d+|\w+)/,onMatch:a},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(c,b,e){c=a(c.substr(1),b,e);e.unshift(c[0]);return c},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+c("\\|")+"*\\|",onMatch:function(a,c,e){e[0].choices=a.slice(1,-1).split(",")},next:"start"},{regex:"/("+c("/")+"+)/(?:("+c("/")+"*)/)(\\w*):?",onMatch:function(a,c,e){c=e[0];c.fmtString=a;a=this.splitRegex.exec(a);
c.guard=a[1];c.fmt=a[2];c.flag=a[3];return""},next:"start"},{regex:"`"+c("`")+"*`",onMatch:function(a,c,e){e[0].code=a.splice(1,-1);return""},next:"start"},{regex:"\\?",onMatch:function(a,c,e){e[0]&&(e[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+c("/")+"+)/",token:"regex"},{regex:"",onMatch:function(a,c,e){e.inFormatString=!0},next:"start"}]});g.prototype.getTokenizer=function(){return g.$tokenizer};return g.$tokenizer};this.tokenizeTmSnippet=
function(a,c){return this.getTokenizer().getLineTokens(a,c).tokens.map(function(a){return a.value||a})};this.$getDefaultValue=function(a,c){if(/^[A-Z]\d+$/.test(c)){var b=c.substr(1);return(this.variables[c[0]+"__"]||{})[b]}if(/^\d+$/.test(c))return(this.variables.__||{})[c];c=c.replace(/^TM_/,"");if(a)switch(b=a.session,c){case "CURRENT_WORD":var d=b.getWordRange();case "SELECTION":case "SELECTED_TEXT":return b.getTextRange(d);case "CURRENT_LINE":return b.getLine(a.getCursorPosition().row);case "PREV_LINE":return b.getLine(a.getCursorPosition().row-
1);case "LINE_INDEX":return a.getCursorPosition().column;case "LINE_NUMBER":return a.getCursorPosition().row+1;case "SOFT_TABS":return b.getUseSoftTabs()?"YES":"NO";case "TAB_SIZE":return b.getTabSize();case "FILENAME":case "FILEPATH":return"";case "FULLNAME":return"Ace"}};this.variables={};this.getVariableValue=function(a,c){return this.variables.hasOwnProperty(c)?this.variables[c](a,c)||"":this.$getDefaultValue(a,c)||""};this.tmStrFormat=function(a,c,b){var d=c.guard,d=RegExp(d,(c.flag||"").replace(/[^gi]/,
"")),e=this.tokenizeTmSnippet(c.fmt,"formatString"),k=this;a=a.replace(d,function(){k.variables.__=arguments;for(var a=k.resolveVariables(e,b),c="E",d=0;d<a.length;d++){var l=a[d];if("object"==typeof l)if(a[d]="",l.changeCase&&l.local){var g=a[d+1];g&&"string"==typeof g&&(a[d]="u"==l.changeCase?g[0].toUpperCase():g[0].toLowerCase(),a[d+1]=g.substr(1))}else l.changeCase&&(c=l.changeCase);else"U"==c?a[d]=l.toUpperCase():"L"==c&&(a[d]=l.toLowerCase())}return a.join("")});this.variables.__=null;return a};
this.resolveVariables=function(a,c){function b(c){c=a.indexOf(c,e+1);-1!=c&&(e=c)}for(var d=[],e=0;e<a.length;e++){var k=a[e];if("string"==typeof k)d.push(k);else if("object"==typeof k)if(k.skip)b(k);else if(!(k.processed<e))if(k.text){var w=this.getVariableValue(c,k.text);w&&k.fmtString&&(w=this.tmStrFormat(w,k));k.processed=e;null==k.expectIf?w&&(d.push(w),b(k)):w?k.skip=k.elseBranch:b(k)}else null!=k.tabstopId?d.push(k):null!=k.changeCase&&d.push(k)}return d};this.insertSnippetForSelection=function(a,
c){function b(a){for(var e=[],c=0;c<a.length;c++){var d=a[c];if("object"==typeof d){if(g[d.tabstopId])continue;var k=a.lastIndexOf(d,c-1),d=e[k]||{tabstopId:d.tabstopId}}e[c]=d}return e}var l=a.getCursorPosition(),e=a.session.getLine(l.row),k=a.session.getTabString(),w=e.match(/^\s*/)[0];l.column<w.length&&(w=w.slice(0,l.column));var r=this.tokenizeTmSnippet(c),r=this.resolveVariables(r,a),r=r.map(function(a){return"\n"==a?a+w:"string"==typeof a?a.replace(/\t/g,k):a}),s=[];r.forEach(function(a,e){if("object"==
typeof a){var c=a.tabstopId,b=s[c];b||(b=s[c]=[],b.index=c,b.value="");if(-1===b.indexOf(a)&&(b.push(a),c=r.indexOf(a,e+1),-1!==c))if(c=r.slice(e+1,c),c.some(function(a){return"object"===typeof a})&&!b.value)b.value=c;else if(c.length&&(!b.value||"string"!==typeof b.value))b.value=c.join("")}});s.forEach(function(a){a.length=0});for(var g={},l=0;l<r.length;l++)if(e=r[l],"object"==typeof e){var f=e.tabstopId,p=r.indexOf(e,l+1);if(g[f])g[f]===e&&(g[f]=null);else{var h=s[f],n="string"==typeof h.value?
[h.value]:b(h.value);n.unshift(l+1,Math.max(0,p-l));n.push(e);g[f]=e;r.splice.apply(r,n);-1===h.indexOf(e)&&h.push(e)}}var m=0,v=0,x="";r.forEach(function(a){"string"===typeof a?("\n"===a[0]?(v=a.length-1,m++):v+=a.length,x+=a):a.start?a.end={row:m,column:v}:a.start={row:m,column:v}});l=a.getSelectionRange();e=a.session.replace(l,x);(new d(a)).addTabstops(s,l.start,e,a.inVirtualSelectionMode&&a.selection.index)};this.insertSnippet=function(a,c){var b=this;if(a.inVirtualSelectionMode)return b.insertSnippetForSelection(a,
c);a.forEachSelection(function(){b.insertSnippetForSelection(a,c)},null,{keepOrder:!0});a.tabstopManager&&a.tabstopManager.tabNext()};this.$getScope=function(a){var c=a.session.$mode.$id||"",c=c.split("/").pop();if("html"===c||"php"===c){"php"===c&&!a.session.$mode.inlinePhp&&(c="html");var b=a.getCursorPosition();a=a.session.getState(b.row);"object"===typeof a&&(a=a[0]);a.substring&&("js-"==a.substring(0,3)?c="javascript":"css-"==a.substring(0,4)?c="css":"php-"==a.substring(0,4)&&(c="php"))}return c};
this.getActiveScopes=function(a){a=this.$getScope(a);var c=[a],b=this.snippetMap;b[a]&&b[a].includeScopes&&c.push.apply(c,b[a].includeScopes);c.push("_");return c};this.expandWithTab=function(a,c){var b=this,d=a.forEachSelection(function(){return b.expandSnippetForSelection(a,c)},null,{keepOrder:!0});d&&a.tabstopManager&&a.tabstopManager.tabNext();return d};this.expandSnippetForSelection=function(a,c){var b=a.getCursorPosition(),d=a.session.getLine(b.row),e=d.substring(0,b.column),k=d.substr(b.column),
w=this.snippetMap,r;this.getActiveScopes(a).some(function(a){(a=w[a])&&(r=this.findMatchingSnippet(a,e,k));return!!r},this);if(!r)return!1;if(c&&c.dryRun)return!0;a.session.doc.removeInLine(b.row,b.column-r.replaceBefore.length,b.column+r.replaceAfter.length);this.variables.M__=r.matchBefore;this.variables.T__=r.matchAfter;this.insertSnippetForSelection(a,r.content);this.variables.M__=this.variables.T__=null;return!0};this.findMatchingSnippet=function(a,c,b){for(var d=a.length;d--;){var e=a[d];if(!e.startRe||
e.startRe.test(c))if(!e.endRe||e.endRe.test(b))if(e.startRe||e.endRe)return e.matchBefore=e.startRe?e.startRe.exec(c):[""],e.matchAfter=e.endRe?e.endRe.exec(b):[""],e.replaceBefore=e.triggerRe?e.triggerRe.exec(c)[0]:"",e.replaceAfter=e.endTriggerRe?e.endTriggerRe.exec(b)[0]:"",e}};this.snippetMap={};this.snippetNameMap={};this.register=function(a,c){function b(a){a&&!/^\^?\(.*\)\$?$|^\\b$/.test(a)&&(a="(?:"+a+")");return a||""}function d(a,c,e){a=b(a);c=b(c);e?(a=c+a)&&"$"!=a[a.length-1]&&(a+="$"):
(a+=c)&&"^"!=a[0]&&(a="^"+a);return RegExp(a)}function e(a){a.scope||(a.scope=c||"_");c=a.scope;k[c]||(k[c]=[],w[c]={});var e=w[c];if(a.name){var b=e[a.name];b&&r.unregister(b);e[a.name]=a}k[c].push(a);a.tabTrigger&&!a.trigger&&(!a.guard&&/^\w/.test(a.tabTrigger)&&(a.guard="\\b"),a.trigger=h.escapeRegExp(a.tabTrigger));if(a.trigger||a.guard||a.endTrigger||a.endGuard)a.startRe=d(a.trigger,a.guard,!0),a.triggerRe=RegExp(a.trigger,"",!0),a.endRe=d(a.endTrigger,a.endGuard,!0),a.endTriggerRe=RegExp(a.endTrigger,
"",!0)}var k=this.snippetMap,w=this.snippetNameMap,r=this;a||(a=[]);a&&a.content?e(a):Array.isArray(a)&&a.forEach(e);this._signal("registerSnippets",{scope:c})};this.unregister=function(a,c){function b(a){var u=e[a.scope||c];u&&u[a.name]&&(delete u[a.name],a=(u=d[a.scope||c])&&u.indexOf(a),0<=a&&u.splice(a,1))}var d=this.snippetMap,e=this.snippetNameMap;a.content?b(a):Array.isArray(a)&&a.forEach(b)};this.parseSnippetFile=function(a){a=a.replace(/\r/g,"");for(var c=[],b={},d=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm,
e;e=d.exec(a);){if(e[1])try{b=JSON.parse(e[1]),c.push(b)}catch(k){}if(e[4])b.content=e[4].replace(/^\t/gm,""),c.push(b),b={};else{var g=e[2];e=e[3];"regex"==g?(g=/\/((?:[^\/\\]|\\.)*)|$/g,b.guard=g.exec(e)[1],b.trigger=g.exec(e)[1],b.endTrigger=g.exec(e)[1],b.endGuard=g.exec(e)[1]):"snippet"==g?(b.tabTrigger=e.match(/^\S*/)[0],b.name||(b.name=e)):b[g]=e}}return c};this.getSnippetByName=function(a,c){var b=this.snippetNameMap,d;this.getActiveScopes(c).some(function(c){(c=b[c])&&(d=c[a]);return!!d},
this);return d}}).call(g.prototype);var d=function(a){if(a.tabstopManager)return a.tabstopManager;a.tabstopManager=this;this.$onChange=this.onChange.bind(this);this.$onChangeSelection=h.delayedCall(this.onChangeSelection.bind(this)).schedule;this.$onChangeSession=this.onChangeSession.bind(this);this.$onAfterExec=this.onAfterExec.bind(this);this.attach(a)};(function(){this.attach=function(a){this.index=0;this.ranges=[];this.tabstops=[];this.selectedTabstop=this.$openTabstops=null;this.editor=a;this.editor.on("change",
this.$onChange);this.editor.on("changeSelection",this.$onChangeSelection);this.editor.on("changeSession",this.$onChangeSession);this.editor.commands.on("afterExec",this.$onAfterExec);this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)};this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this);this.selectedTabstop=this.tabstops=this.ranges=null;this.editor.removeListener("change",this.$onChange);this.editor.removeListener("changeSelection",this.$onChangeSelection);this.editor.removeListener("changeSession",
this.$onChangeSession);this.editor.commands.removeListener("afterExec",this.$onAfterExec);this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);this.editor=this.editor.tabstopManager=null};this.onChange=function(a){var c="r"==a.action[0],b=a.start,d=a.end;a=b.row;var e=d.row-a,k=d.column-b.column;c&&(e=-e,k=-k);if(!this.$inChange&&c){var g=this.selectedTabstop;if(g&&!g.some(function(a){return 0>=n(a.start,b)&&0<=n(a.end,d)}))return this.detach()}for(var g=this.ranges,r=0;r<g.length;r++){var s=
g[r];s.end.row<b.row||(c&&0>n(b,s.start)&&0<n(d,s.end)?(this.removeRange(s),r--):(s.start.row==a&&s.start.column>b.column&&(s.start.column+=k),s.end.row==a&&s.end.column>=b.column&&(s.end.column+=k),s.start.row>=a&&(s.start.row+=e),s.end.row>=a&&(s.end.row+=e),0<n(s.start,s.end)&&this.removeRange(s)))}g.length||this.detach()};this.updateLinkedFields=function(){var a=this.selectedTabstop;if(a&&a.hasLinkedRanges){this.$inChange=!0;for(var c=this.editor.session,b=c.getTextRange(a.firstNonLinked),d=a.length;d--;){var e=
a[d];if(e.linked){var k=m.snippetManager.tmStrFormat(b,e.original);c.replace(e,k)}}this.$inChange=!1}};this.onAfterExec=function(a){a.command&&!a.command.readOnly&&this.updateLinkedFields()};this.onChangeSelection=function(){if(this.editor){for(var a=this.editor.selection.lead,c=this.editor.selection.anchor,b=this.editor.selection.isEmpty(),d=this.ranges.length;d--;)if(!this.ranges[d].linked){var e=this.ranges[d].contains(a.row,a.column),k=b||this.ranges[d].contains(c.row,c.column);if(e&&k)return}this.detach()}};
this.onChangeSession=function(){this.detach()};this.tabNext=function(a){var c=this.tabstops.length;a=this.index+(a||1);a=Math.min(Math.max(a,1),c);a==c&&(a=0);this.selectTabstop(a);0===a&&this.detach()};this.selectTabstop=function(a){this.$openTabstops=null;var c=this.tabstops[this.index];c&&this.addTabstopMarkers(c);this.index=a;if((c=this.tabstops[this.index])&&c.length){this.selectedTabstop=c;if(this.editor.inVirtualSelectionMode)this.editor.selection.setRange(c.firstNonLinked);else{a=this.editor.multiSelect;
a.toSingleRange(c.firstNonLinked.clone());for(var b=c.length;b--;)(!c.hasLinkedRanges||!c[b].linked)&&a.addRange(c[b].clone(),!0);a.ranges[0]&&a.addRange(a.ranges[0].clone())}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}};this.addTabstops=function(a,c,d){this.$openTabstops||(this.$openTabstops=[]);a[0]||(d=p.fromPoints(d,d),b(d.start,c),b(d.end,c),a[0]=[d],a[0].index=0);var l=[this.index+1,0],e=this.ranges;a.forEach(function(a,b){for(var d=this.$openTabstops[b]||a,g=a.length;g--;){var u=
a[g],f=p.fromPoints(u.start,u.end||u.start),h=f.start,n=c;0==h.row&&(h.column+=n.column);h.row+=n.row;h=f.end;n=c;0==h.row&&(h.column+=n.column);h.row+=n.row;f.original=u;f.tabstop=d;e.push(f);d!=a?d.unshift(f):d[g]=f;u.fmtString?(f.linked=!0,d.hasLinkedRanges=!0):d.firstNonLinked||(d.firstNonLinked=f)}d.firstNonLinked||(d.hasLinkedRanges=!1);d===a&&(l.push(d),this.$openTabstops[b]=d);this.addTabstopMarkers(d)},this);2<l.length&&(this.tabstops.length&&l.push(l.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,
l))};this.addTabstopMarkers=function(a){var b=this.editor.session;a.forEach(function(a){a.markerId||(a.markerId=b.addMarker(a,"ace_snippet-marker","text"))})};this.removeTabstopMarkers=function(a){var b=this.editor.session;a.forEach(function(a){b.removeMarker(a.markerId);a.markerId=null})};this.removeRange=function(a){var b=a.tabstop.indexOf(a);a.tabstop.splice(b,1);b=this.ranges.indexOf(a);this.ranges.splice(b,1);this.editor.session.removeMarker(a.markerId);a.tabstop.length||(b=this.tabstops.indexOf(a.tabstop),
-1!=b&&this.tabstops.splice(b,1),this.tabstops.length||this.detach())};this.keyboardHandler=new x;this.keyboardHandler.bindKeys({Tab:function(a){(!m.snippetManager||!m.snippetManager.expandWithTab(a))&&a.tabstopManager.tabNext(1)},"Shift-Tab":function(a){a.tabstopManager.tabNext(-1)},Esc:function(a){a.tabstopManager.detach()},Return:function(a){return!1}})}).call(d.prototype);var b=function(a,b){a.row==b.row&&(a.column-=b.column);a.row-=b.row};f("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}");
m.snippetManager=new g;f=f("./editor").Editor;(function(){this.insertSnippet=function(a,b){return m.snippetManager.insertSnippet(this,a,b)};this.expandSnippet=function(a){return m.snippetManager.expandWithTab(this,a)}}).call(f.prototype)});
define("ace/autocomplete/popup","require exports module ace/virtual_renderer ace/editor ace/range ace/lib/event ace/lib/lang ace/lib/dom".split(" "),function(f,m,y){var q=f("../virtual_renderer").VirtualRenderer,v=f("../editor").Editor,h=f("../range").Range,p=f("../lib/event"),x=f("../lib/lang"),t=f("../lib/dom"),n=function(g){g=new q(g);g.$maxLines=4;g=new v(g);g.setHighlightActiveLine(!1);g.setShowPrintMargin(!1);g.renderer.setShowGutter(!1);g.renderer.setHighlightGutterLine(!1);g.$mouseHandler.$focusWaitTimout=
0;g.$highlightTagPending=!0;return g};t.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);}.ace_editor.ace_autocomplete .ace_line-hover {    position: absolute;    z-index: 2;}.ace_editor.ace_autocomplete .ace_scroller {   background: none;   border: none;   box-shadow: none;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #000;    text-shadow: 0 0 0.01em;}.ace_editor.ace_autocomplete {    width: 280px;    z-index: 200000;    background: #fbfbfb;    color: #444;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;}");
m.AcePopup=function(g){var d=t.createElement("div"),b=new n(d);g&&g.appendChild(d);d.style.display="none";b.renderer.content.style.cursor="default";b.renderer.setStyle("ace_autocomplete");b.setOption("displayIndentGuides",!1);b.setOption("dragDelay",150);g=function(){};b.focus=g;b.$isFocused=!0;b.renderer.$cursorLayer.restartTimer=g;b.renderer.$cursorLayer.element.style.opacity=0;b.renderer.$maxLines=8;b.renderer.$keepTextAreaAtCursor=!1;b.setHighlightActiveLine(!1);b.session.highlight("");b.session.$searchHighlight.clazz=
"ace_highlight-marker";b.on("mousedown",function(a){var c=a.getDocumentPosition();b.selection.moveToPosition(c);f.start.row=f.end.row=c.row;a.stop()});var a,c=new h(-1,0,-1,Infinity),f=new h(-1,0,-1,Infinity);f.id=b.session.addMarker(f,"ace_active-line","fullLine");b.setSelectOnHover=function(a){a?c.id&&(b.session.removeMarker(c.id),c.id=null):c.id=b.session.addMarker(c,"ace_line-hover","fullLine")};b.setSelectOnHover(!1);b.on("mousemove",function(e){a?a.x==e.x&&a.y==e.y||(a=e,a.scrollTop=b.renderer.scrollTop,
e=a.getDocumentPosition().row,c.start.row!=e&&(c.id||b.setRow(e),l(e))):a=e});b.renderer.on("beforeRender",function(){if(a&&-1!=c.start.row){a.$pos=null;var e=a.getDocumentPosition().row;c.id||b.setRow(e);l(e,!0)}});b.renderer.on("afterRender",function(){var a=b.getRow(),c=b.renderer.$textLayer,a=c.element.childNodes[a-c.config.firstRow];a!=c.selectedNode&&(c.selectedNode&&t.removeCssClass(c.selectedNode,"ace_selected"),(c.selectedNode=a)&&t.addCssClass(a,"ace_selected"))});var d=function(){l(-1)},
l=function(a,d){a!==c.start.row&&(c.start.row=c.end.row=a,d||b.session._emit("changeBackMarker"),b._emit("changeHoverMarker"))};b.getHoveredRow=function(){return c.start.row};p.addListener(b.container,"mouseout",d);b.on("hide",d);b.on("changeSelection",d);b.session.doc.getLength=function(){return b.data.length};b.session.doc.getLine=function(a){a=b.data[a];return"string"==typeof a?a:a&&a.value||""};d=b.session.bgTokenizer;d.$tokenizeRow=function(a){a=b.data[a];var c=[];if(!a)return c;"string"==typeof a&&
(a={value:a});a.caption||(a.caption=a.value||a.name);for(var d=-1,l,g,f=0;f<a.caption.length;f++)g=a.caption[f],l=a.matchMask&1<<f?1:0,d!==l?(c.push({type:a.className||""+(l?"completion-highlight":""),value:g}),d=l):c[c.length-1].value+=g;a.meta&&(d=b.renderer.$size.scrollerWidth/b.renderer.layerConfig.characterWidth,l=a.meta,l.length+a.caption.length>d-2&&(l=l.substr(0,d-a.caption.length-3)+"\u2026"),c.push({type:"rightAlignedText",value:l}));return c};d.$updateOnChange=g;d.start=g;b.session.$computeWidth=
function(){return this.screenWidth=0};b.$blockScrolling=Infinity;b.isOpen=!1;b.isTopdown=!1;b.data=[];b.setData=function(a){b.setValue(x.stringRepeat("\n",a.length),-1);b.data=a||[];b.setRow(0)};b.getData=function(a){return b.data[a]};b.getRow=function(){return f.start.row};b.setRow=function(a){a=Math.max(0,Math.min(this.data.length,a));f.start.row!=a&&(b.selection.clearSelection(),f.start.row=f.end.row=a||0,b.session._emit("changeBackMarker"),b.moveCursorTo(a||0,0),b.isOpen&&b._signal("select"))};
b.on("changeSelection",function(){b.isOpen&&b.setRow(b.selection.lead.row);b.renderer.scrollCursorIntoView()});b.hide=function(){this.container.style.display="none";this._signal("hide");b.isOpen=!1};b.show=function(c,d,l){var g=this.container,f=window.innerHeight,h=window.innerWidth,u=this.renderer,n=1.4*u.$maxLines*d,p=c.top+this.$borderSize;p>f/2&&!l&&p+d+n>f?(u.$maxPixelHeight=p-2*this.$borderSize,g.style.top="",g.style.bottom=f-p+"px",b.isTopdown=!1):(p+=d,u.$maxPixelHeight=f-p-0.2*d,g.style.top=
p+"px",g.style.bottom="",b.isTopdown=!0);g.style.display="";this.renderer.$textLayer.checkForSizeChanges();c=c.left;c+g.offsetWidth>h&&(c=h-g.offsetWidth);g.style.left=c+"px";this._signal("show");a=null;b.isOpen=!0};b.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize};b.$imageSize=0;b.$borderSize=1;return b}});
define("ace/autocomplete/util",["require","exports","module"],function(f,m,y){m.parForEach=function(f,h,p){var m=0,t=f.length;0===t&&p();for(var n=0;n<t;n++)h(f[n],function(g,d){m++;m===t&&p(g,d)})};var q=/[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;m.retrievePrecedingIdentifier=function(f,h,p){p=p||q;var m=[];for(h-=1;0<=h;h--)if(p.test(f[h]))m.push(f[h]);else break;return m.reverse().join("")};m.retrieveFollowingIdentifier=function(f,h,p){p=p||q;for(var m=[];h<f.length;h++)if(p.test(f[h]))m.push(f[h]);else break;
return m};m.getCompletionPrefix=function(f){var h=f.getCursorPosition(),p=f.session.getLine(h.row),m;f.completers.forEach(function(f){f.identifierRegexps&&f.identifierRegexps.forEach(function(f){!m&&f&&(m=this.retrievePrecedingIdentifier(p,h.column,f))}.bind(this))}.bind(this));return m||this.retrievePrecedingIdentifier(p,h.column)}});
define("ace/autocomplete","require exports module ace/keyboard/hash_handler ace/autocomplete/popup ace/autocomplete/util ace/lib/event ace/lib/lang ace/lib/dom ace/snippets".split(" "),function(f,m,y){var q=f("./keyboard/hash_handler").HashHandler,v=f("./autocomplete/popup").AcePopup,h=f("./autocomplete/util");f("./lib/event");var p=f("./lib/lang"),x=f("./lib/dom"),t=f("./snippets").snippetManager,n=function(){this.autoInsert=!1;this.autoSelect=!0;this.exactMatch=!1;this.gatherCompletionsId=0;this.keyboardHandler=
new q;this.keyboardHandler.bindKeys(this.commands);this.blurListener=this.blurListener.bind(this);this.changeListener=this.changeListener.bind(this);this.mousedownListener=this.mousedownListener.bind(this);this.mousewheelListener=this.mousewheelListener.bind(this);this.changeTimer=p.delayedCall(function(){this.updateCompletions(!0)}.bind(this));this.tooltipTimer=p.delayedCall(this.updateDocTooltip.bind(this),50)};(function(){this.$init=function(){this.popup=new v(document.body||document.documentElement);
this.popup.on("click",function(d){this.insertMatch();d.stop()}.bind(this));this.popup.focus=this.editor.focus.bind(this.editor);this.popup.on("show",this.tooltipTimer.bind(null,null));this.popup.on("select",this.tooltipTimer.bind(null,null));this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null));return this.popup};this.getPopup=function(){return this.popup||this.$init()};this.openPopup=function(d,b,a){this.popup||this.$init();this.popup.setData(this.completions.filtered);d.keyBinding.addKeyboardHandler(this.keyboardHandler);
var c=d.renderer;this.popup.setRow(this.autoSelect?0:-1);if(a)a&&!b&&this.detach();else{this.popup.setTheme(d.getTheme());this.popup.setFontSize(d.getFontSize());b=c.layerConfig.lineHeight;a=c.$cursorLayer.getPixelPosition(this.base,!0);a.left-=this.popup.getTextLeftOffset();var f=d.container.getBoundingClientRect();a.top+=f.top-c.layerConfig.offset;a.left+=f.left-d.renderer.scrollLeft;a.left+=c.gutterWidth;this.popup.show(a,b)}};this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
this.editor.off("changeSelection",this.changeListener);this.editor.off("blur",this.blurListener);this.editor.off("mousedown",this.mousedownListener);this.editor.off("mousewheel",this.mousewheelListener);this.changeTimer.cancel();this.hideDocTooltip();this.gatherCompletionsId+=1;this.popup&&this.popup.isOpen&&this.popup.hide();this.base&&this.base.detach();this.activated=!1;this.completions=this.base=null};this.changeListener=function(d){d=this.editor.selection.lead;(d.row!=this.base.row||d.column<
this.base.column)&&this.detach();this.activated?this.changeTimer.schedule():this.detach()};this.blurListener=function(d){var b=document.activeElement,a=this.editor.textInput.getElement(),c=d.relatedTarget&&d.relatedTarget==this.tooltipNode,f=this.popup&&this.popup.container;b!=a&&(b.parentNode!=f&&!c&&b!=this.tooltipNode&&d.relatedTarget!=a)&&this.detach()};this.mousedownListener=function(d){this.detach()};this.mousewheelListener=function(d){this.detach()};this.goTo=function(d){var b=this.popup.getRow(),
a=this.popup.session.getLength()-1;switch(d){case "up":b=0>=b?a:b-1;break;case "down":b=b>=a?-1:b+1;break;case "start":b=0;break;case "end":b=a}this.popup.setRow(b)};this.insertMatch=function(d,b){d||(d=this.popup.getData(this.popup.getRow()));if(!d)return!1;if(d.completer&&d.completer.insertMatch)d.completer.insertMatch(this.editor,d);else{if(this.completions.filterText)for(var a=this.editor.selection.getAllRanges(),c=0,f;f=a[c];c++)f.start.column-=this.completions.filterText.length,this.editor.session.remove(f);
d.snippet?t.insertSnippet(this.editor,d.snippet):this.editor.execCommand("insertstring",d.value||d)}this.detach()};this.commands={Up:function(d){d.completer.goTo("up")},Down:function(d){d.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(d){d.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(d){d.completer.goTo("end")},Esc:function(d){d.completer.detach()},Return:function(d){return d.completer.insertMatch()},"Shift-Return":function(d){d.completer.insertMatch(null,{deleteSuffix:!0})},Tab:function(d){var b=
d.completer.insertMatch();if(!b&&!d.tabstopManager)d.completer.goTo("down");else return b},PageUp:function(d){d.completer.popup.gotoPageUp()},PageDown:function(d){d.completer.popup.gotoPageDown()}};this.gatherCompletions=function(d,b){var a=d.getSession(),c=d.getCursorPosition();a.getLine(c.row);var f=h.getCompletionPrefix(d);this.base=a.doc.createAnchor(c.row,c.column-f.length);this.base.$insertRight=!0;var l=[],e=d.completers.length;d.completers.forEach(function(g,h){g.getCompletions(d,a,c,f,function(c,
g){!c&&g&&(l=l.concat(g));var k=d.getCursorPosition();a.getLine(k.row);b(null,{prefix:f,matches:l,finished:0===--e})})});return!0};this.showPopup=function(d){this.editor&&this.detach();this.activated=!0;this.editor=d;d.completer!=this&&(d.completer&&d.completer.detach(),d.completer=this);d.on("changeSelection",this.changeListener);d.on("blur",this.blurListener);d.on("mousedown",this.mousedownListener);d.on("mousewheel",this.mousewheelListener);this.updateCompletions()};this.updateCompletions=function(d){if(d&&
this.base&&this.completions){var b=this.editor.getCursorPosition(),b=this.editor.session.getTextRange({start:this.base,end:b});if(b!=this.completions.filterText){this.completions.setFilter(b);if(!this.completions.filtered.length||1==this.completions.filtered.length&&this.completions.filtered[0].value==b&&!this.completions.filtered[0].snippet)return this.detach();this.openPopup(this.editor,b,d)}}else{var a=this.gatherCompletionsId;this.gatherCompletions(this.editor,function(b,f){var l=function(){if(f.finished)return this.detach()}.bind(this),
e=f.prefix,k=f&&f.matches;if(!k||!k.length)return l();if(!(0!==e.indexOf(f.prefix)||a!=this.gatherCompletionsId)){this.completions=new g(k);this.exactMatch&&(this.completions.exactMatch=!0);this.completions.setFilter(e);k=this.completions.filtered;if(!k.length||1==k.length&&k[0].value==e&&!k[0].snippet)return l();if(this.autoInsert&&1==k.length&&f.finished)return this.insertMatch(k[0]);this.openPopup(this.editor,e,d)}}.bind(this))}};this.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()};
this.updateDocTooltip=function(){var d=this.popup,b=d.data,a=b&&(b[d.getHoveredRow()]||b[d.getRow()]),c=null;if(!a||!this.editor||!this.popup.isOpen)return this.hideDocTooltip();this.editor.completers.some(function(b){b.getDocTooltip&&(c=b.getDocTooltip(a));return c});c||(c=a);"string"==typeof c&&(c={docText:c});if(!c||!c.docHTML&&!c.docText)return this.hideDocTooltip();this.showDocTooltip(c)};this.showDocTooltip=function(d){this.tooltipNode||(this.tooltipNode=x.createElement("div"),this.tooltipNode.className=
"ace_tooltip ace_doc-tooltip",this.tooltipNode.style.margin=0,this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this));var b=this.tooltipNode;d.docHTML?b.innerHTML=d.docHTML:d.docText&&(b.textContent=d.docText);b.parentNode||document.body.appendChild(b);d=this.popup;var a=d.container.getBoundingClientRect();b.style.top=d.container.style.top;b.style.bottom=d.container.style.bottom;320>window.innerWidth-a.right?(b.style.right=window.innerWidth-
a.left+"px",b.style.left=""):(b.style.left=a.right+1+"px",b.style.right="");b.style.display="block"};this.hideDocTooltip=function(){this.tooltipTimer.cancel();if(this.tooltipNode){var d=this.tooltipNode;!this.editor.isFocused()&&document.activeElement==d&&this.editor.focus();this.tooltipNode=null;d.parentNode&&d.parentNode.removeChild(d)}}}).call(n.prototype);n.startCommand={name:"startAutocomplete",exec:function(d){d.completer||(d.completer=new n);d.completer.autoInsert=!1;d.completer.autoSelect=
!0;d.completer.showPopup(d);d.completer.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var g=function(d,b){this.filtered=this.all=d;this.filterText=b||"";this.exactMatch=!1};(function(){this.setFilter=function(d){var b=d.length>this.filterText&&0===d.lastIndexOf(this.filterText,0)?this.filtered:this.all;this.filterText=d;var b=this.filterCompletions(b,this.filterText),b=b.sort(function(a,b){return b.exactMatch-a.exactMatch||b.score-a.score}),a=null;this.filtered=b=b.filter(function(b){b=
b.snippet||b.caption||b.value;if(b===a)return!1;a=b;return!0})};this.filterCompletions=function(d,b){var a=[],c=b.toUpperCase(),f=b.toLowerCase(),l=0,e;a:for(;e=d[l];l++){var g=e.value||e.caption||e.snippet;if(g){var h=-1,m=0,p=0,n,q;if(this.exactMatch){if(b!==g.substr(0,b.length))continue a}else for(var t=0;t<b.length;t++){n=g.indexOf(f[t],h+1);q=g.indexOf(c[t],h+1);n=0<=n?0>q||n<q?n:q:q;if(0>n)continue a;q=n-h-1;0<q&&(-1===h&&(p+=10),p+=q);m|=1<<n;h=n}e.matchMask=m;e.exactMatch=p?0:1;e.score=(e.score||
0)-p;a.push(e)}}return a}}).call(g.prototype);m.Autocomplete=n;m.FilteredList=g});
define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(f,m,y){function q(f,m){var q=f.getTextRange(v.fromPoints({row:0,column:0},m)).split(h).length-1,n=f.getValue().split(h),g=Object.create(null),d=n[q];n.forEach(function(b,a){if(b&&b!==d){var c=Math.abs(q-a),c=n.length-c;g[b]=g[b]?Math.max(c,g[b]):c}});return g}var v=f("../range").Range,h=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;m.getCompletions=function(f,h,m,n,g){var d=q(h,m,n);f=Object.keys(d);g(null,
f.map(function(b){return{caption:b,value:b,score:d[b],meta:"local"}}))}});
define("ace/ext/language_tools","require exports module ace/snippets ace/autocomplete ace/config ace/lib/lang ace/autocomplete/util ace/autocomplete/text_completer ace/editor ace/config".split(" "),function(f,m,y){var q=f("../snippets").snippetManager,v=f("../autocomplete").Autocomplete,h=f("../config"),p=f("../lib/lang"),x=f("../autocomplete/util");y=f("../autocomplete/text_completer");var t={getCompletions:function(a,b,c,d,f){if(b.$mode.completer)return b.$mode.completer.getCompletions(a,b,c,d,
f);a=a.session.getState(c.row);b=b.$mode.getCompletions(a,b,c,d);f(null,b)}},n={getCompletions:function(a,b,c,d,f){var g=q.snippetMap,h=[];q.getActiveScopes(a).forEach(function(a){a=g[a]||[];for(var b=a.length;b--;){var c=a[b],d=c.name||c.tabTrigger;d&&h.push({caption:d,snippet:c.content,meta:c.tabTrigger&&!c.name?c.tabTrigger+"\u21e5 ":"snippet",type:"snippet"})}},this);f(null,h)},getDocTooltip:function(a){"snippet"==a.type&&!a.docHTML&&(a.docHTML=["<b>",p.escapeHTML(a.caption),"</b><hr></hr>",p.escapeHTML(a.snippet)].join(""))}},
g=[n,y,t];m.setCompleters=function(a){g.length=0;a&&g.push.apply(g,a)};m.addCompleter=function(a){g.push(a)};m.textCompleter=y;m.keyWordCompleter=t;m.snippetCompleter=n;var d={name:"expandSnippet",exec:function(a){return q.expandWithTab(a)},bindKey:"Tab"},b=function(b,c){a(c.session.$mode)},a=function(b){var d=b.$id;q.files||(q.files={});c(d);b.modes&&b.modes.forEach(a)},c=function(a){if(a&&!q.files[a]){var b=a.replace("mode","snippets");q.files[a]={};h.loadModule(b,function(b){b&&(q.files[a]=b,!b.snippets&&
b.snippetText&&(b.snippets=q.parseSnippetFile(b.snippetText)),q.register(b.snippets||[],b.scope),b.includeScopes&&(q.snippetMap[b.scope].includeScopes=b.includeScopes,b.includeScopes.forEach(function(a){c("ace/mode/"+a)})))})}},u=function(a){var b=a.editor,c=b.completer&&b.completer.activated;"backspace"===a.command.name?c&&!x.getCompletionPrefix(b)&&b.completer.detach():"insertstring"===a.command.name&&(x.getCompletionPrefix(b)&&!c)&&(b.completer||(b.completer=new v),b.completer.autoInsert=!1,b.completer.showPopup(b))};
m=f("../editor").Editor;f("../config").defineOptions(m.prototype,"editor",{enableBasicAutocompletion:{set:function(a){a?(this.completers||(this.completers=Array.isArray(a)?a:g),this.commands.addCommand(v.startCommand)):this.commands.removeCommand(v.startCommand)},value:!1},enableLiveAutocompletion:{set:function(a){a?(this.completers||(this.completers=Array.isArray(a)?a:g),this.commands.on("afterExec",u)):this.commands.removeListener("afterExec",u)},value:!1},enableSnippets:{set:function(a){a?(this.commands.addCommand(d),
this.on("changeMode",b),b(null,this)):(this.commands.removeCommand(d),this.off("changeMode",b))},value:!1}})});(function(){window.require(["ace/ext/language_tools"],function(){})})();