import React, { useState, useEffect } from "react";

import GameInfo from "./GameInfo";
import Board from "./Board";
import gameStatus from "../gameStatus.json";
import { difficulties } from "../helpers";

const Game = () => {
	const [gameState, setGameState] = useState(gameStatus.NOT_STARTED);
	const [difficulty, setDifficulty] = useState(difficulties("easy"));
	const [bombCount, setBombCount] = useState(difficulty.bombs);
	const [cellsToOpen, setCellsToOpen] = useState(
		difficulty.rows * difficulty.cols - difficulty.bombs
	);
	const [time, setTime] = useState(0);

	useEffect(() => {
		if (cellsToOpen === 0) {
			setGameState(gameStatus.WON);
		}
	}, [cellsToOpen]);

	const startGame = () => setGameState(gameStatus.IN_PROGRESS);
	const endGame = () => setGameState(gameStatus.LOST);

	const handleCellCount = () => {
		setCellsToOpen((cellsToOpen) => cellsToOpen - 1);
	};

	const handleBombCount = (flagged) => {
		setBombCount(flagged ? bombCount + 1 : bombCount - 1);
	};

	return (
		<>
			<GameInfo
				bombCount={bombCount}
				time={time}
				cellsToOpen={cellsToOpen}
				timerActive={gameState === gameStatus.IN_PROGRESS}
				setTime={(time) => setTime(time)}
			/>
			<Board
				difficulty={difficulty.name}
				rows={difficulty.rows}
				cols={difficulty.cols}
				bombCount={bombCount}
				gameState={gameState}
				startGame={startGame}
				endGame={endGame}
				handleCellCount={handleCellCount}
				handleBombCount={handleBombCount}
				bombsLeft={bombCount !== 0}
			/>
			{gameState === gameStatus.LOST ? <div>YOU LOSE</div> : null}
			{gameState === gameStatus.WON ? <div>YOU WIN</div> : null}
		</>
	);
};

export default Game;
