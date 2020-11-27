import React, { useEffect } from "react";
import { formatTime } from "../helpers";

const GameInfo = (props) => {
	useEffect(() => {
		let interval = null;
		if (props.timerActive) {
			interval = setInterval(() => {
				props.setTime(props.time + 1);
			}, 1000);
		} else if (!props.timerActive && props.time !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [props]);

	return (
		<>
			<div>Bombs remaining: {props.bombCount}</div>
			<div>Cells to open: {props.cellsToOpen}</div>
			<div>Time: {formatTime(props.time)}</div>
		</>
	);
};

export default GameInfo;
