var sqrs = document.getElementsByClassName("square");
var chosenClr = "rgb(255, 255, 255)";
var chosenSqr = Math.floor(Math.random() * 6);
var h1 = document.querySelector("#gameTitle");
var chosenSpan = document.querySelector(".chosen");
var refresh = document.querySelector("#refresh");
var easyBtn = document.querySelector("#easy")
var hardBtn = document.querySelector("#hard")
var difficulty = "none";
var msg = document.querySelector("#message");

// Change the difficulty to easy
// (3 squares instead of 6)
easyBtn.addEventListener("click", function() {
	//Difficulty already easy, no need to do anything.
	if(difficulty === "easy") {
		return;
	}

	this.classList.add("selected");
	hardBtn.classList.remove("selected");
	difficulty = "easy";
	init();
});

// Change the difficulty to hard (default)
hardBtn.addEventListener("click", function() {
	//Difficulty already hard, no need to do anything.
	if(difficulty === "hard") {
		return;
	}

	this.classList.add("selected");
	easyBtn.classList.remove("selected");
	difficulty = "hard";
	init();
});

//Add event listener to new color/ new game button
refresh.addEventListener("click", function() {
	init();
});

//Initialize the game for first time.
init();

/* Funnction: init
 * arguments: none
 * 
 * The init function initializes all color
 * squares with a random color, picks one
 * of those colors to be guessed,
 * and sets up event listeners for each
 * color square.
*/
function init() {
	var numSqrs = 0;

	//If this is the first time init() is called
	// then set the difficulty to the default 
	// of hard.
	if( difficulty === "none" ) {
		hardBtn.click();
	}

	//Determine the difficulty to the right number
	//Of random colors can be chosen and a square
	//within the the range of filled squares is chosen
	//as the color to be guessed.
	if( difficulty === "hard" ) {
		numSqrs = 6
		chosenSqr = Math.floor(Math.random() * 6);
	} else {
		numSqrs = 3;
		chosenSqr = Math.floor(Math.random() * 3);
	}

	//Select random colors and add event listeners.
	for( var i = 0; i < sqrs.length; i++ ) {
		var clr = ranColor();

		if( i >= numSqrs ) {
			sqrs[i].style.backgroundColor = "#232323";
		} else {
			sqrs[i].style.backgroundColor = clr;
		}

		if( i == Number(chosenSqr) ){
			chosenClr = clr;
		}

		sqrs[i].addEventListener("click", function() {
			// this.style.background = ranColor();
			var bColor = this.style.backgroundColor;

			if( String(bColor) === String(chosenClr) ) {
				changeSqrColors();
			} else {
				this.style.backgroundColor = "#232323";
				msg.textContent = "Try Again!";
			}
		});
	}

	//Change the text in the game title to give the player
	//the RGB info needed to guess the right color.
	chosenSpan.textContent = chosenClr;
	chosenSpan.style.textTransform = "uppercase";
	refresh.textContent = "New Color";
	h1.style.backgroundColor = "#232323";
	msg.textContent = "";
}

//Generate a random color.
function ranColor() {
	return "rgb(" 
		   + Math.floor(Math.random() * 256)
		   + ", "
		   + Math.floor(Math.random() * 256)
		   + ", "
		   + Math.floor(Math.random() * 256)
		   + ")";
}

function changeSqrColors() {
	//Change all the squares to be the same color.
	for( var i = 0; i < sqrs.length; i++ ) {
		if( difficulty === "easy" && i >= 3 ) {
			break;
		}

		sqrs[i].style.backgroundColor = chosenClr;
	}

	//Change the game title to be the same color as the
	//chosen color.
	h1.style.backgroundColor = chosenClr;

	//Player has won, offer to play again by
	//changing the "new color" button to say
	//"play again"
	refresh.textContent = "Play Again";
	msg.textContent = "Correct!";
}