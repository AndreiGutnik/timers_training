import { useEffect, useRef, useState } from 'react';
import * as css from './style.css'

import * as dayjs from 'dayjs'
import { ITimer } from '../../types';
import { isTimerActive } from '../../utils/isTimerActive';

interface TimerCardProps {
	timer:ITimer;
	onPlay: ()=> void;
	onPause: ()=>void;
	onDelete: ()=> void;
}

export const TimerCard = (props: TimerCardProps)=>{
	const {addTime, elapsedTime} = props.timer;

	const isActive = isTimerActive(props.timer)

	const intervalId = useRef(null);
	const [displayTime, setDisplayTime] = useState(elapsedTime);

	useEffect(() => {
		if(!isActive){
			setDisplayTime(elapsedTime);
			return;
		}
		intervalId.current = setInterval(() => {
			const currentTime = dayjs().diff(addTime) + elapsedTime;
			setDisplayTime(currentTime);
		}, 1000);
		return () => {
			if (intervalId.current) {
				clearInterval(intervalId.current);
			}
		};
	}, [isActive, addTime, elapsedTime]);

	const getValue =()=>{
		const newDuration = dayjs.duration(displayTime)
		return newDuration.format('HH:mm:ss')
	}

	return(
		<div className={css.timer}>
				<div key='container'>{getValue()}
				<div key='action'>
					<div>
						<button onClick={props.onPlay} disabled={isActive}>Play</button>
						<button onClick={props.onPause} disabled={!isActive}>Pause</button>
						<button onClick={props.onDelete}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	)
}