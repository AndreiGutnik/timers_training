import { useState } from 'react';
import { Timer, TimerDef } from '../Timer/Timer';
import * as dayjs from 'dayjs'

import './style.css'

export const TimersWall = ()=>{
	const [timers, setTimers] = useState<TimerDef[]>([]);

	const handleAddTimer = ()=>{
		setTimers(prevTimers => [...prevTimers, {addTime: dayjs()}])
	}

	return(
		<div className='timersWall'>
			<div className='timersWallBtn'>
				<button onClick={handleAddTimer}>+ Add timer</button>
			</div>
			<div className='timersWallContainer'>
				{timers.map((timer)=>(
					<Timer value={timer}/>
				))}
			</div>
		</div>
	)
}