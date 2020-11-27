import React, { useState } from "react";
import classNames from "classnames";

import gameStatus from "../gameStatus.json";

const recursionClick = (target, row, col) => {
	target.id = `${row}_${col}_`;
	const rowList = [row - 1, row, row + 1];
	const colList = [col - 1, col, col + 1];
	for (let i of rowList) {
		for (let j of colList) {
			setImmediate(() => {
				if (document.getElementById(`${i}_${j}`)) {
					document.getElementById(`${i}_${j}`).click();
				}
			});
		}
	}
};

const Cell = (props) => {
	const [opened, setOpened] = useState(false);
	const [flagged, setFlagged] = useState(false);

	const classes = classNames(
		"cell",
		{ opened: opened },
		{ flagged: flagged },
		{ bomb: props.value === "☀" && !flagged }
	);

	const handleClick = ({ target }) => {
		if (props.gameState === gameStatus.NOT_STARTED) {
			console.log("hi");
			props.startGame(props.row, props.col);
			setOpened(true);
			props.handleCellCount();
			recursionClick(target, props.row, props.col);
		} else if (props.gameState === gameStatus.IN_PROGRESS) {
			if (!flagged && !opened) {
				setOpened(true);
				props.handleCellCount();
			}
			if (!flagged && props.value === "☀") props.endGame();
			if (props.value === "" && target.id === `${props.row}_${props.col}`) {
				recursionClick(target, props.row, props.col);
			}
		}
	};

	const handleContextMenu = (e) => {
		e.preventDefault();
		if (
			!opened &&
			props.gameState === gameStatus.IN_PROGRESS &&
			(props.bombsLeft || flagged)
		) {
			setFlagged(!flagged);
			props.handleBombCount(flagged);
		}
	};

	return (
		<div
			className={classes}
			id={`${props.row}_${props.col}`}
			onClick={handleClick}
			onMouseDown={(e) => e.preventDefault()}
			onMouseMove={(e) => e.preventDefault()}
			onContextMenu={handleContextMenu}>
			{opened && !flagged ? props.value : ""}
			{flagged ? "⚑" : null}
		</div>
	);
};

export default Cell;
