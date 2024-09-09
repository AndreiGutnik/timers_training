import { useEffect, useState } from 'react';
import './style.css'

import * as dayjs from 'dayjs'

export interface TimerDef{
	addTime: dayjs.Dayjs;
}

interface TimerProps {
	value:TimerDef;
}

export const Timer = (props: TimerProps)=>{
	const {addTime} = props.value;

	const [duration, setduration] = useState(dayjs.duration(0));

	useEffect(() => {
		setInterval(()=>{
			updateDuration()
		}, 1000)
	}, []);

	const updateDuration = ()=>{
		const currentTime = dayjs()
		const newDuration = dayjs.duration(currentTime.diff(addTime))
		setduration(newDuration)
	}

	const getValue =()=>{
		return duration.format('HH:mm:ss')
	}

	return(
		<div className="timer">
				<div key='container'>{getValue()}
				<div key='action'>
					<div>
						<button>start</button>
						<button>pause</button>
						<button>delete</button>
					</div>
				</div>
			</div>
		</div>
	)
}