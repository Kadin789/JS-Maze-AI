/* 
Hello future Kadin!
Welcome to Maze Maker Mel's Code.
Being that he's the more simple one out of the two, I'll be able to explain him pretty easily. 
He uses first depth just like polly, but he uses it with e f f i c i e n c y. 
Starting off, he's placed in the barren landscape of an endless place full of walls. Mel hates walls, but loves mazes.
So you know what he does? He goes around yeeting walls until he makes an entire randomly generated maze.
*/
// Mel Code

// Mel starts off with a precheck code. What this does is it determines what he'll do based on his possible options. If there are no options, he'll assume he's done. In most cases he usually is right. 
function preCheckMel() {
    if  (melCheck("up") == true || melCheck("down") == true || melCheck("left") == true || melCheck("right") == true) { // If he can make at least one move he will start using his big brain to make the maze.
        melMakeMaze();
        console.log("Moving forwards!");
    }
    else if (moveLog.length>0) { // If he's stuck, but remembers making moves, he'll go backwards until he can make a move.
        melGoBack();
        console.log("Moving back!");
    }
    else { // In the event he never CAN make a move, he assumes he's done.
        console.log("Okay Kadin, I'm done!");
        clearInterval(intv);
        intv = setInterval(preCheckPolly, pollySpeed);
        moveLog = [];
        mazeMakerMel.x = 0;
        mazeMakerMel.y = 0;
        BlockID[20][20].type = 2;
    }
    }

// His massive brain. This is what does it all.     
function melMakeMaze() {
    var dir;
    var i;
        for (i=0; i<4; i++) {
            dir=Math.floor(Math.random()*4);
    
            switch(dir) {
                case 0: // Up
                    if (mazeMakerMel.y-60<0) 
                        break;
                    if (melCheck("up")==true) {
                        moveMel("up", 2);
                        moveLog.push(dir);
                    }
                    break;
                case 1: // Down
                    if (mazeMakerMel.y + 60 > 630)
                        break;
                    if (melCheck("down")==true) {
                        moveMel("down", 2);
                        moveLog.push(dir);
                    }
                    break;
                case 2: // Left
                    if (mazeMakerMel.x-60<0) 
                        break;
                    if (melCheck("left")==true) {
                        moveMel("left", 2);
                        moveLog.push(dir);
                    }
                    break;
                case 3: // Right
                    if (mazeMakerMel.x + 60 > 630)
                        break;
                    if (melCheck("right")==true) {
                        moveMel("right", 2);
                        moveLog.push(dir);
                    }
                    break;
            }
    
        }
    }
    
 /* Past Kadin was pretty good with this way of doing this, but now I've grown to do something not only better but also faster and more understandable.
  * Basically, what this function does is takes the direction Mel wants to go, checks if there's walls there, and if there are walls, he can go
  * if not, he won't go. 
  */
    function melCheck(dir) {
        const melCords = [mazeMakerMel.x, mazeMakerMel.y];                                                                          // Gives Mel's current position to the function
        switch (dir) {                                                                                                              // Switch statement for direction.
            case "up":                                                                                                              // Case for going up
                if (melCords[1] - 60 < 0) {                                                                                         // Checks if Mel would be going out of bounds by going up.
                    return false;                                                                                                   // Returns false if he is.
                }
                return checkForWall(melCords[0], melCords[1] - 30) && checkForWall(melCords[0], melCords[1] - 60);                  // Otherwise, it returns if there are two walls in the given direction. 
            case "down":                                                                                                            // Case for down, same as up but with down.
                if (melCords[1] + 60 > 630) {
                    return false;
                }
                return checkForWall(melCords[0], melCords[1] + 30) && checkForWall(melCords[0], melCords[1] + 60);
            case "left":                                                                                                            // Left case
                if (melCords[0] - 60 < 0) {
                    return false;
                }
                return checkForWall(melCords[0] - 30, melCords[1]) && checkForWall(melCords[0] - 60, melCords[1]);
            case "right":                                                                                                           // Right case
                if (melCords[0] + 60 > 630) {
                    return false;
                }
                return checkForWall(melCords[0] + 30, melCords[1]) && checkForWall(melCords[0] + 60, melCords[1]);
            default:
                console.log("If you're reading this, you really messed up somewhere. You didn't give Mel a direction to check.");
                return false;
        }
    }
    
	// Moves Mel. Pretty simple.
function moveMel(dir, dis) {
    var i;
        for (i=0; i<dis; i++) {
            switch(dir) {
                case "up":                                                                            // Moves Mel Up
                    mazeMakerMel.y-=30;
                    removeWall(mazeMakerMel.x / 30, mazeMakerMel.y / 30);
                    break;
                case "down":                                                                          // Moves Mel Down
                    mazeMakerMel.y+=30;
                    removeWall(mazeMakerMel.x / 30, mazeMakerMel.y / 30);
                    break;
                case "left":                                                                          // Moves Mel Left
                    mazeMakerMel.x-=30;
                    removeWall(mazeMakerMel.x / 30, mazeMakerMel.y / 30);
                    break;
                case "right":                                                                         // Moves Mel Right
                    mazeMakerMel.x+=30;
                    removeWall(mazeMakerMel.x / 30, mazeMakerMel.y / 30);
                    break;
            }
        }
    }
    // This function allows for Mel to retrace his steps and go back to where he was previously. This is so that he can get himself unstuck if he ever gets trapped. Moves will be opposite what they normally are.
    function melGoBack() {  
         switch(moveLog[moveLog.length-1]) {
        case 0:  // Down
            moveMel("down", 2); 
            moveLog.pop();
            break;
        case 1: // Up 
            moveMel("up", 2);
            moveLog.pop();
            break;
        case 2: // Right
            moveMel("right", 2);
            moveLog.pop();
            break;
        case 3: // Left
            moveMel("left", 2);
            moveLog.pop();
            break;
        }
    }