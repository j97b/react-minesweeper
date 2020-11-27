import React, { useState } from "react";
import classNames from "classnames";

import { bombsBoard, emptyBoard, fullBoard } from "../helpers";
import Cell from "./Cell";

const Board = (props) => {
	const classes = classNames("board-root", props.difficulty);
	const [rows, cols, bombCount] = [props.rows, props.cols, props.bombCount];
	const [board, setBoard] = useState(emptyBoard(rows, cols));

	const startGame = (row, col) => {
		setBoard(
			fullBoard(bombsBoard(emptyBoard(rows, cols), bombCount, row, col))
		);
		props.startGame();
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
							endGame={props.endGame}
							gameState={props.gameState}
							startGame={startGame}
							handleCellCount={props.handleCellCount}
							handleBombCount={props.handleBombCount}
							bombsLeft={props.bombsLeft}
						/>
					);
				});
			})}
		</div>
	);
};

export default Board;
