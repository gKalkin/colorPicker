var sqrs = document.getElementsByClassName("square");
var chosenSqr = Math.floor(Math.random() * 6);
var chosenClr = "rgb(255, 255, 255)";
var h1 = document.querySelector("#gameTitle");

for( var i = 0; i < sqrs.length; i++ ) {
	var clr = ranColor();
	sqrs[i].style.backgroundColor = clr;

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
		}
	});
}

document.querySelector("h2").textContent = chosenClr;
document.querySelector("h2").style.color = chosenClr;

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
	for( var i = 0; i < sqrs.length; i++ ) {
		sqrs[i].style.backgroundColor = chosenClr;
	}

	h1.style.backgroundColor = chosenClr;
}