default_algorithm = `// "init" got called once the page loaded, "main" will be called every 1/60 seconds

init = function() {
    env.token = 0;
    env.last_rssi;
    env.last_move; // 0 for left, 1 for right
    env.in_region = 0;
}


main = function() {
    env.token += 1;
    env.token = env.token % 15;
    if (env.token === 0) {
    
        if (drone.rssi > 0) {
            drone.acc = 100;
            if (env.in_region === 0) {
	        if (Math.random() > 0.5) {
                    drone.turn_left(5);
                    env.last_move = 0;
                }
	        else {
                    drone.turn_right(5);
                    env.last_move = 1;
                }
                env.in_region = 1;
            }
            else {
                if (drone.rssi > env.last_rssi) {
                    // do nothing, keep going
                }
                else {
                    if (env.last_move === 0) drone.turn_left(180-10*Math.random());
                    else drone.turn_right(180-10*Math.random());
                }
            }
            env.last_rssi = drone.rssi;
        }

        else {
            env.in_region = 0;
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

