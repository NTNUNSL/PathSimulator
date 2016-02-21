var canvas = document.getElementById("simulator");

canvas.width = parseFloat(window.getComputedStyle(canvas).width);
canvas.height = 800;

var ctx = canvas.getContext("2d");
var frame_rate = 60;
var is_start = false;
var is_pause = false;
var simulator;
var update_algorithm;
var rssi_radius = 200;
var alpha = 0.9;
var boundary_space = 10;
var drone = {};
var path = {}; // dummy, for readibility
path.algorithm = [];
function init_envvar() {
   drone.cur_x = 100;
   drone.cur_y = 100;
   drone.speed_x = 0;
   drone.speed_y = 0;
   drone.acc_x = 0;
   drone.acc_y = 0;
   drone.rssi;
   drone.shape = [[0,-15],[-5,0],[5,0]]
   // user control
   drone.head = 180; // degree
   drone.acc = 0;
   drone.turn_left = function(degree) {
      drone.head -= degree;
      drone.head = drone.head % 360;
   }
   drone.turn_right = function(degree) {
      drone.head += degree;
      drone.head = drone.head % 360;
   }
}

function init_rssi() {
   var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, rssi_radius, canvas.width/2, canvas.height/2, 0);
   grd.addColorStop(1, "red");
   grd.addColorStop(0, "white");
   ctx.fillStyle = grd;
   ctx.beginPath();
   ctx.arc(canvas.width/2, canvas.height/2, rssi_radius, 0, 2 * Math.PI);
   ctx.fill();
   ctx.closePath();
}

function update_drone() {
   if(!is_pause) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      init_rssi();
      var p = ctx.getImageData(drone.cur_x, drone.cur_y, 10, 10).data;
      drone.rssi = p[1] == 0 ? 0 : 255-p[1];
      ctx.save();
      ctx.translate(drone.cur_x, drone.cur_y);
      ctx.rotate(drone.head*Math.PI/180);
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.moveTo(drone.shape[0][0],drone.shape[0][1]);
      ctx.lineTo(drone.shape[1][0],drone.shape[1][1]);
      ctx.lineTo(drone.shape[2][0],drone.shape[2][1]);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
      // project of acc on x, y
      drone.acc_x = drone.acc * Math.cos((drone.head-90)*Math.PI/180);
      drone.acc_y = drone.acc * Math.sin((drone.head-90)*Math.PI/180);
      // v = v + at
      drone.speed_x += drone.acc_x/frame_rate;
      drone.speed_y += drone.acc_y/frame_rate;
      // fading
      drone.speed_x *= alpha;
      drone.speed_y *= alpha;
      drone.cur_x += drone.speed_x;
      drone.cur_y += drone.speed_y;
      
      // boundary
      if (drone.cur_x >= canvas.width-boundary_space | drone.cur_x <= boundary_space) {
         drone.cur_x = Math.min(Math.max(boundary_space, drone.cur_x), canvas.width-boundary_space);
      }
      if (drone.cur_y >= canvas.height-boundary_space | drone.cur_y <= boundary_space) {
         drone.cur_y = Math.min(Math.max(boundary_space, drone.cur_y), canvas.height-boundary_space);
      }
      
      main(); 
      document.getElementById("x").innerHTML = drone.cur_x;
      document.getElementById("y").innerHTML = drone.cur_y;
      document.getElementById("v_x").innerHTML = drone.speed_x;
      document.getElementById("v_y").innerHTML = drone.speed_y;
      document.getElementById("a_x").innerHTML = drone.acc_x;
      document.getElementById("a_y").innerHTML = drone.acc_y;
      document.getElementById("rssi").innerHTML = drone.rssi;
      document.getElementById("head").innerHTML = drone.head;
      document.getElementById("acc").innerHTML = drone.acc;
   }
}

function start() {
   if (!is_start) {
      eval(user_cont);
      simulator = setInterval(update_drone, 1000/frame_rate);
      is_start = true;
   }
}

function pause() {
   is_pause = ~is_pause;
   eval(user_cont);
   document.getElementById("button_pause").innerHTML = (is_pause) ? "Resume" : "Pause"; 
}

function reset() {
   clearInterval(simulator);
   ctx.clearRect(0, 0, canvas.width, canvas.width);
   init_rssi();
   init_envvar();
   //init_algorithmlist();
   is_start = false;
   is_pause = false;
   document.getElementById("x").innerHTML = "";
   document.getElementById("y").innerHTML = "";
   document.getElementById("v_x").innerHTML = "";
   document.getElementById("v_y").innerHTML = "";
   document.getElementById("a_x").innerHTML = "";
   document.getElementById("a_y").innerHTML = "";
   document.getElementById("rssi").innerHTML = "";
}
init_rssi();
init_envvar();
