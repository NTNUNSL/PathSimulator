function resizeEditor() {
    var container = document.getElementById("editor_container");
    var editor = document.getElementById("editor");
    var current_width = parseFloat(window.getComputedStyle(container).width);
    var current_height = parseFloat(window.getComputedStyle(document.getElementById("simulator")).height);
    editor.style.height = current_height + "px";
    editor.style.width = (current_width-40) + "px";
}
                resizeEditor();
                document.getElementById("editor").style.height = "800px";
                
                var editor = ace.edit("editor");
                editor.setTheme("ace/theme/twilight");
                editor.setFontSize(18);
                var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
                editor.session.setMode(new JavaScriptMode());
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                });
