// AI Code (Finally!)

/*
Hello whoever reads this! Welcome to Polly's code. 
Here we have one of the two most important people in the entire program. She's the one who solves all the mazes Mel makes for her.
Why? Heck if I know I'm just the guy who made her do it. 
Anyway, order of the code is pretty simple, it's sorted (mostly) by the order Polly runs it all. 
*/
/*
HOW THE HECK SHE WORKS (Without code as guide)
She essentially works through a modified form of depth first search.
To put that in English, she basically goes through the maze, but when she encounters a place with multiple pathways,
Polly will explore one path to its entirety (with all turns within it included) before returning back and checking another. 
She marks where she has been and said pathways with markers.
Those turns can be in three stages:
 - Unexplored, for when she hasn't explored them yet.
 - Explored, for when she has either mostly explored a place or is still in the process of exploring it
 - Dead End, for when a pathway has been fully explored and did not lead to the goal.
 You will notice her throwing these down pretty quickly as she goes through the code. 
With explanation of her marking out of the way, let me break down the process in which her brain ticks. ONTO THE CODE!


Polly we gotta have a talk. Did you forget that you're supposed to follow the laws of physics at the beginning? 
Polly why are you going through walls? 
That's, like, HOW?
Polly you're disappointing me here, and I really don't appreciate it.
I'm gonna try to see if this isn't your fault and check the walls. 
I'll do everything I can but if you don't start working I'm not gonna have any choice but to assume that it's your fault.


update: she did in fact start following physics again. 
*/


// The first function here acts as initial thoughts, she'll go through this to see what kind of moves she can make and what all she can do.
// Decision should be made.
function preCheckPolly() {
    const pollyCord = new coordinates(pathPrevailerPolly.x, pathPrevailerPolly.y);
    var Moves = checkPossibleMoves();
    var moveSum = Moves[0]+Moves[1]+Moves[2]+Moves[3];
    console.log("-----------------------");
    console.log("Strating the Pre-Check!");
    
	// What this does is if she has marked anything as explored, she will look around to see if she is at one of those explored markers. If she is, she'll mark it as a dead end since she just finished exploring. If not, this code does nothing.
    if (BlockID[pollyCord.x][pollyCord.y].type == 4) {
        BlockID[pollyCord.x][pollyCord.y].type = 5;
        console.log("Got a dead end here!");
    }
	// Same for this one, but with unexplored markers and explored markers.
    if (BlockID[pollyCord.x][pollyCord.y].type == 3) {
        BlockID[pollyCord.x][pollyCord.y].type = 4;
        console.log("Exploring this path now!");
    }
    // Pretty obvious given Polly's excitement to me. She only runs this if she is at the goal.
    if (BlockID[pollyCord.x][pollyCord.y].type == 2) {
        console.log("I'm done Kadin! I got to the goal!");
        pathPrevailerPolly.x = 0;
        pathPrevailerPolly.y = 0;
        moveLog = [];
        clearInterval(intv);
        fillWall();
    }
	
	// This is when she uses her common sense and vision. Her vision contains everything she can see around her before encountering a wall. 
	// If she can see the goal before encountering a wall she'll go straight toward the goal and disregard all markers and turns. 
    else if	(checkPollyVision(pollyCord) != -1) {
            movePolly(checkPollyVision(pollyCord));
            console.log("Heading straight for the goal!");
    }
	// This is also a common sense one. If she only has one way to go, she'll just pick that way and go.
    else if (moveSum == 1) {
        for (let i = 0; i < 4; i++) {  // The reason this exists is because I stored the 4 values in something called an array. What this does is find out where in that array the direction she can go is. 
            if (Moves[i] > 0) {
                console.log("Only one way to go.");
                movePolly(i);
            }
        }
    }
	
	// And finally, if she has no other choice she will start using her massive brain.
    else {
        pollySolveMaze(Moves);
    }
}
function pollySolveMaze(theMove) {
    /*
     GOAL : FINISH MAZE.
     CHALLENGE : WALLS IN WAY. CANNOT BE PASSED.
     
     Solution: Begin having the AI not just calculate it's move based on distance to objective, but also on other factors. What factors? I have NO idea.
    */
    const pollyCord = new coordinates(pathPrevailerPolly.x, pathPrevailerPolly.y);
    const prevMove = moveLog[moveLog.length - 1];
    const moveString = ["up", "down", "left", "right"];
    var possibleMove = [];
    console.log("===================");
    console.log("I last moved " + moveString[prevMove]);

    switch (prevMove) {  // Makes it so it can't just go backwards randomly.
        case 1:
            theMove[0] = 0;
            break;
        case 0:
            theMove[1] = 0;
            break;
        case 3:
            theMove[2] = 0;
            break;
        case 2:
            theMove[3] = 0;
            break;
        default:
            break;
    }

    /*
    Polly's Priorities:
    The first thing she'll look for is unexplored markers. 
    If there is more than one marker around her, she will choose one randomly. 
    
    Her next priority is explored markers. If she finds one near her and there are no unexplored markers, she will
    choose to go back that way as that would mean that all other paths are dead ends.
    */
    let unexploredMarksAdj = getAdjacentMarkers(3, pollyCord);
    if (unexploredMarksAdj.length >= 1) {
        if (unexploredMarksAdj.length == 1) {
            console.log("Found an unexplored path, I'll go that way.");
            movePolly(unexploredMarksAdj[0]);
            return;
        }
        else {
            let rand = Math.floor(Math.random() * unexploredMarksAdj.length);
            console.log("Hm... I got a few unexplored paths. I'll choose this one!");
            movePolly(unexploredMarksAdj[rand]);
            return;
        }
    }

    // If all else fails, she makes a random move based on what moves she has previously done as well as what she saw in the checkPossibleMoves function. That or she makes a random move.
    for (let i = 0; i < 4; i++) {
        if (theMove[i] == 0) {
            continue;
        }
        possibleMove.push(moveString[i]);
    }

    console.log("Possible moves are: ");
    for (let i = 0; i < possibleMove.length; i++) {
        console.log(possibleMove[i] + " ")
    }

    // Now for the dreaded part, Kadin. It's time to actually make the thing function as an AI. Time to make a maze solver.
    // ^ yep.
    if (possibleMove.length < 2) {
        movePolly(possibleMove[0]);
        return;
    }
    else {
        let random = Math.floor(Math.random() * possibleMove.length);
        movePolly(possibleMove[random]);
        return;
    }


    }
function getAdjacentMarkers(markType, pollyCord) {
    var marks = [];
    for (let i = 0; i < 4; i++) {
        if (pollyCord.checkType(i) == markType) {
            marks.push(i);
        }
    }
    return marks;
}
function movePolly(dir) {
    console.log("I am moving " + dir);
    console.log("===================");
    switch (dir) {
        case 0: // Up
        case "up":
            pathPrevailerPolly.y -= 30;
            moveLog.push(0);
            break;
        case 1: // Down
        case "down":
            pathPrevailerPolly.y += 30;
            moveLog.push(1);
            break;
        case 2: // Left
        case "left":
            pathPrevailerPolly.x -= 30;
            moveLog.push(2);
            break;
        case 3: // Right
        case "right":
            pathPrevailerPolly.x += 30;
            moveLog.push(3);
            break;
    }
}
// Checks if bot is at a turn or not. 
/* ^ Okay Kadin you really understated this function.
THIS function does that and checks all the possible moves that Polly can make. 
It acts as a part of her vision, so to speak. She can look around to see if there are walls, markers, or other
things that may possibly prevent her from going forwards towards her beloved goal. 
*/
function checkPossibleMoves() {
    var posMoves; // Possible Moves Total.
    var pollyCord = new coordinates(pathPrevailerPolly.x, pathPrevailerPolly.y);
    var moves = [1, 1, 1, 1];
    // For every wall that exists in the code this will loop, basically checking to see where walls are in terms of where Polly is.
    console.log("I'm currently at " + pollyCord);
    if (pollyCord.y <= 0 || (pollyCord.up().type == 1 || pollyCord.up().type == 5)) {
        moves[0] = 0;
    }
    if (pollyCord.y >= 20 || (pollyCord.down().type == 1 || pollyCord.down().type == 5)) {
        moves[1] = 0;
    }
    if (pollyCord.x <= 0 || (pollyCord.left().type == 1 || pollyCord.left().type == 5)) {
        moves[2] = 0;
    }
    if (pollyCord.x >= 20 || (pollyCord.right().type == 1 || pollyCord.right().type == 5)) {
        moves[3] = 0;
    }
    posMoves = moves[0] + moves[1] + moves[2] + moves[3];

    if (posMoves > 2) { // If there's more two ways to go (forward and backward), she knows she's at a turn and will mark it accordingly.
        pollyMarkTurn(pollyCord); // < Through that function right there.
    }
    return moves; // Her eyes send the data gotten by this function to whatever called it, usually her brain or precheck.
}

    // Given Polly's Current Location, it determines if she can make it to the goal or not.
    // It returns the direction she'd need to go to make it to the goal.
	// In short, it's her common sense vision.
function checkPollyVision() {
    const pCord = [pathPrevailerPolly.x, pathPrevailerPolly.y];
    for (let i = 0; i < 4; i++) {
        let tempCords = new coordinates(pCord[0], pCord[1]);
        for (let j = 0; j < 20; j++) {
            if (tempCords.type() == 1 || tempCords.x == 0 || tempCords.y == 0) {
                break;
            }
            if (tempCords.type() == 2) {
                return i;
            }
            tempCords.move(i);

        }
    }
    return -1;
    // If all else fails and it never finds a way to which it can see the goal, it returns -1.
    // This signifies that it cannot reach it, and will terminate the function, going back to
    // Its roaming phase.
    }
    /*
     Kadin this is why you explain your code. I just had to spend a good few minutes trying to relearn how this function works
     because you didn't comment beyond what was obvious about the function. Thankfully, I was able to read my own code pretty well, 
     considering I wrote it and stuff. Either way though, I know for certain this will be another function that will get 
     heavily simplified thanks to the rewrite. And this time I'll actually make it good.
     My God, I remember how overlapping marks was actually a problem. Thankfully the new way I'm doing things will make that never happen anymore. < i made it worse
     */
function pollyMarkTurn() {
        const opposite = [1, 0, 3, 2];                                                              // Constant gives the opposite move to what it is called. ie. opposite of 0 (up) is 1 (down).
    const prevMove = moveLog[moveLog.length - 1];                                               // Previous move
    const pollyCord = [pathPrevailerPolly.x, pathPrevailerPolly.y];
    let pCord = new coordinates(pollyCord[0], pollyCord[1]);
        for (let i = 0; i < 4; i++) {                                                               // Iterates through the number of moves are possible. 
            if (pCord.checkType(i) == 0) {
                if (prevMove == opposite[i]) {                                                   // Checks if the move is where Polly came from.
                    let temp = new coordinates(pollyCord[0], pollyCord[1]);                          // If it is, it will mark it with an explored marker so that it doesn't go backwards.
                    console.log("pollyCord before moving: " + pollyCord);
                    console.log("Temp before moving: " + temp);
                    temp.move(i);                                                                // Using temp because of the way coordiantes are currently structured. May update at a later point.
                    temp.setType(4);
                    console.log("Marked explored at " + temp);
                    console.log("pollyCord after moving temp: " + pollyCord);
                }
                else {                                                                                  // Otherwise, it will mark it with an unexplored marker.
                    let temp = new coordinates(pollyCord[0], pollyCord[1]);
                    console.log("Temp before moving: " + temp);
                    temp.move(i);
                    temp.setType(3);
                    console.log("Marked unexplored at " + temp);
                }
            }
        }
    }