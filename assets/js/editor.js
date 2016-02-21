default_algorithm = `token = 0;
var last_rssi;
var last_move; // 0 for left, 1 for right
var in_region = 0;


main = function() {

    token += 1;
    token = token % 15;
    if (token === 0) {
    
        if (drone.rssi > 0) {
            drone.acc = 100;
            if (in_region === 0) {
	        if (Math.random() > 0.5) {
                    drone.turn_left(5);
                    last_move = 0;
                }
	        else {
                    drone.turn_right(5);
                    last_move = 1;
                }
                in_region = 1;
            }
            else {
                if (drone.rssi > last_rssi) {
                    // do nothing, keep going
                }
                else {
                    if (last_move === 0) drone.turn_left(180-10*Math.random());
                    else drone.turn_right(180-10*Math.random());
                }
            }
            last_rssi = drone.rssi;
        }

        else {
            in_region = 0;
            drone.acc = 200;
                if (Math.random() > 0.5)
                    drone.turn_left(Math.random()*50);
	        else
                    drone.turn_right(Math.random()*50);
        }
    
    }
    else {
        drone.acc = 0;
    }
}
`

document.getElementById("editor").innerHTML = default_algorithm;

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

editor.session.on('change', function() {
    updateProgram();
});

var user_cont;

function updateProgram() {
    user_cont = editor.getValue();
}

updateProgram();
