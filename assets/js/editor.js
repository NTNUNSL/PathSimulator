document.getElementById("editor").innerHTML=default_algorithm;function resizeEditor(){var a=document.getElementById("editor_container"),b=document.getElementById("editor"),a=parseFloat(window.getComputedStyle(a).width),c=parseFloat(window.getComputedStyle(document.getElementById("simulator")).height);b.style.height=c+"px";b.style.width=a-40+"px"}resizeEditor();document.getElementById("editor").style.height="800px";var editor=ace.edit("editor");editor.setTheme("ace/theme/twilight");editor.setFontSize(18);
var JavaScriptMode=ace.require("ace/mode/javascript").Mode;editor.session.setMode(new JavaScriptMode);editor.setOptions({enableBasicAutocompletion:!0,enableSnippets:!0,enableLiveAutocompletion:!0});editor.session.on("change",function(){updateProgram()});var user_cont;function updateProgram(){user_cont=editor.getValue()}updateProgram();
