import React from "react";
import classNames from "classnames";

import Cell from "./Cell";

const Board = (props) => {
	const classes = classNames("board-root", props.difficulty);

	const startGame = (row, col) => {
		props.startGame(row, col);
	};

	return (
		<>
			<div className={classes}>
				{props.board.map((row, rowIdx) => {
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
		</>
	);
};

export default Board;
