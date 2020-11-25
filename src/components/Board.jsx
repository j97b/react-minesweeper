import React, { useState } from "react";
import classNames from "classnames";

import {
	bombsBoard,
	emptyBoard,
	fullBoard,
	difficultySwitch,
} from "../helpers";
import Cell from "./Cell";

const Board = (props) => {
	const classes = classNames("board-root", props.difficulty);
	const [rows, cols, bombCount] = difficultySwitch(props.difficulty);
	const [board, setBoard] = useState(emptyBoard(rows, cols));
	const [gameStarted, setGameStarted] = useState(false);

	const startGame = (row, col) => {
		setBoard(
			fullBoard(bombsBoard(emptyBoard(rows, cols), bombCount, row, col))
		);
		setGameStarted(true);
	};
	const endGame = () => {
		console.log("YOU LOSE");
	};

	return (
		<div className={classes}>
			{board.map((row, rowIdx) => {
				return row.map((cell, colIdx) => {
					return (
						<Cell
							key={colIdx}
							row={rowIdx}
							col={colIdx}
							value={cell}
							endGame={endGame}
							gameStarted={gameStarted}
							startGame={startGame}
						/>
					);
				});
			})}
		</div>
	);
};

export default Board;
