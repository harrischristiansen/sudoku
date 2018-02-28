/*
	@ Harris Christiansen (Harris@HarrisChristiansen.com)
	File Created: November 2017
	Project: Sudoku
*/

let ROW_INDEXES = COL_INDEXES = [0,1,2,3,4,5,6,7,8];


$(document).ready(function() {
	$(".updatePossibilities").click(function(evt) {
		updatePossibilities();
	});

	$(".highlightTest").click(function(evt) {
		$(".possibility-1").addClass("highlight");
	});
});

function updatePossibilities() {
	board = readBoard();

	$("#sudoku td").each(function(i, item) {
		possibilities = getPossibilitiesString(board, i);
		$(this).find(".tile_overlay").html(possibilities);
	});
}

function readBoard() {
	var board = [];
	$('#sudoku tr').has('td').each(function() {
		var board_row = []
		$('td', $(this)).each(function(i, item) {
			value = $(item).find("input").val()
			if (!(value in [1,2,3,4,5,6,7,8,9])) {
				value = 0;
			}
			board_row.push(value)
		});
		board.push(board_row);
	});
	return board;
}

function getPossibilities(board, index) {
	x = index % 9;
	y = parseInt(index / 9);
	if (board[y][x] != 0) {
		return [];
	}

	sq_x = parseInt(x / 3);
	sq_y = parseInt(y / 3);

	possibilities = [1,2,3,4,5,6,7,8,9];

	// Check Row
	for (c in ROW_INDEXES) {
		value = parseInt(board[y][c]);
		var i = possibilities.indexOf(value);
		if (i != -1) {
			possibilities.splice(i, 1);
		}
	}

	// Check Column
	for (r in COL_INDEXES) {
		value = parseInt(board[r][x]);
		var i = possibilities.indexOf(value);
		if (i != -1) {
			possibilities.splice(i, 1);
		}
	}

	// Check Square
	for (c in [0,1,2]) {
		for (r in [0,1,2]) {
			value = parseInt(board[(sq_y*3) + parseInt(r)][(sq_x*3) + parseInt(c)]);
			var i = possibilities.indexOf(value);
			if (i != -1) {
				possibilities.splice(i, 1);
			}
		}
	}

	return possibilities;
}

function getPossibilitiesString(board, index) {
	possibilities = getPossibilities(board, i);
	result = "";
	for (i in possibilites) {
		result += '<span class="possibility-'+i+'">i</span>';
	}
	return result;
}