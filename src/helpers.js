export const emptyBoard = (row, col) => {
	let outerArray = [];
	for (let i = 0; i < row; i++) {
		let innerArray = [];
		for (let j = 0; j < col; j++) {
			innerArray.push("");
		}
		outerArray.push(innerArray);
	}
	return outerArray;
};

export const bombsBoard = (emptyBoard, count, initRow, initCol) => {
	const [row, col] = [emptyBoard.length, emptyBoard[0].length];
	while (count) {
		const [x, y] = [~~(Math.random() * row), ~~(Math.random() * col)];
		if (
			!emptyBoard[x][y] &&
			(![initRow - 1, initRow, initRow + 1].includes(x) ||
				![initCol - 1, initCol, initCol + 1].includes(y))
		) {
			emptyBoard[x][y] = "☀";
			count--;
		}
	}
	return emptyBoard;
};

export const fullBoard = (bombsBoard) => {
	return bombsBoard.map((row, rowIdx) => {
		return row.map((cell, colIdx) => {
			return cell === "☀"
				? cell
				: countAdjacentBombs(bombsBoard, rowIdx, colIdx);
		});
	});
};

export const countAdjacentBombs = (array, row, col) => {
	let count = 0;
	for (let i = row - 1; i < row + 2; i++) {
		if (array[i] !== undefined) {
			for (let j = col - 1; j < col + 2; j++) {
				if ((i !== row || j !== col) && array[i][j] === "☀") {
					count++;
				}
			}
		}
	}

	return count || "";
};

export const difficulties = (difficulty) => {
	switch (difficulty) {
		case "easy":
		default:
			return {
				name: "easy",
				rows: 8,
				cols: 8,
				bombs: 10,
			};
		case "medium":
			return {
				name: "medium",
				rows: 16,
				cols: 16,
				bombs: 40,
			};
		case "hard":
			return {
				name: "hard",
				rows: 16,
				cols: 30,
				bombs: 99,
			};
	}
};

export const formatTime = (time) => {
	return `${~~((time % 3600) / 60)}:${(~~time % 60).toLocaleString("en-GB", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	})}`;
};
