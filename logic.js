// variables are storage of values
// variables - reusable names that represent a value
let board;
let score = 0;
let rows = 4;
let columns = 4;


// functions - reusable tasks
function setGame(){

	board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,2,2,0]
	]; // Goal, we will use this backend board to create our frontend board.

	// loops are code to repeat the tasks inside it, until it fulfill / completed the whole task. (in our context, until our board will have a tile with there proper colors)
	for(let r=0; r < rows; r++){
		for(let c=0; c < columns; c++){
			
			// create and design a tile

			// Created tile using div 
			let tile = document.createElement("div");

			// each tile will have an invisible id
			tile.id = r.toString() + "-" + c.toString();

			// number of the tile
			let num = board[r][c];

			updateTile(tile, num);

			document.getElementById("board").append(tile)
		}
	}
}


// updateTile() - updates the appearance of the tile (that is should have tile number and background color)
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

	tile.classList.add("tile");

	// updateTile() uses our prepared styles in style.css
	if(num > 0){
		tile.innerText = num.toString();
	
		if(num <= 4096){
							// class -> x2, class -> x4, x8, x16
			tile.classList.add("x" + num.toString());
		}

		else{
			tile.classList.add("x8192");
		}
	}
}


window.onload = function(){
	setGame();
}


function handleSlide(event){
	console.log(event.code); // event.code - is the pressed key in our keyboard

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)){

		event.preventDefault(); // Prevents the default behavior in our browser, when pressing arrow keys (default behaviour to prevent: whenever pressing arrow keys, the whole game also joins in sliding);

		if(event.code == "ArrowLeft"){
			slideLeft();
		}
		else if(event.code == "ArrowRight"){
			slideRight();
		}
		else if(event.code == "ArrowUp"){
			slideUp();
		}
		else if(event.code == "ArrowDown"){
			slideDown();
		}
	}
}

document.addEventListener("keydown", handleSlide);

function slideLeft(){
	for(let r=0; r<rows; r++){
		let row = board[r]
		row = slide(row);
		board[r] = row;

		for(let c = 0; c<columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile,num);
		}
	}
}

function filterZero(row){
	return row.filter(num => num != 0);
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice().reverse();
        row = slide(row);
        board[r] = row.reverse();

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let col = [ board[0][c], board[1][c], board[2][c], board[3][c]];

        col = slide(col);

        for (let r = 0; r < rows; r++) {
            board[r][c] = col[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [];
        for (let r = 0; r < rows; r++) {
            row.push(board[r][c]);
        }
        row = slide(row.reverse()).reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slide(row){
	row = filterZero(row);
	for(let i = 0; i<row.length - 1; i++){
		if(row[i] == row[i+1]){
			row[i] *= 2;
			row[i+1] = 0;
		}
	}

	// Add zeroes back
	while(row.length < columns){
		row.push(0);
	}

	return row;

}

function hasEmptyTile(){

	// loop
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			if(board[r][c]==0){
				return true;
			}
		}
	}

	return false;

}

function setTwo(){

	if(hasEmptyTile() == false){
		return; // "I will do nothing, I don't need to generate a new tile"
	}

}