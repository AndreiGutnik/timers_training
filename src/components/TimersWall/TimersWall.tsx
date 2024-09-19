import { useState } from 'react';
import { TimerCard } from '../Timer/Timer';
import * as dayjs from 'dayjs'

import * as css from './style.css'
import { ITimer } from '../../types';
import { useTimers } from '../../hooks/useTimers';


export const TimersWall = ()=>{
	const {timers, addTimer, updateTimer, deleteTimer} = useTimers()

	const handleAddTimer = ()=>{
		const timer: ITimer = {addTime: null, elapsedTime: 0}
		addTimer(timer)
	}

	const getTimer = (id: string) => {
		const timer = timers.get(id)
		if(timer) return timer

		throw new Error(`Unable to find timer with id = ${id}`)
	}

	const handlePlay = (id: string) => {
		const timer = getTimer(id)
		updateTimer(id, {...timer, addTime: dayjs()})
	};

	const handlePause = (id: string) => {
		const timer = getTimer(id)
		const currentElapsedTime = dayjs().diff(timer.addTime);
		updateTimer(id, {...timer, elapsedTime: timer.elapsedTime + currentElapsedTime, addTime: null})
	};

	const handleDelete = (id:string)=>{
		deleteTimer(id)
	}

	return(
		<div className={css.timersWall}>
			<div key='timersWallActions'>
				<button onClick={handleAddTimer}>+ Add timer</button>
			</div>
			<div className={css.timersWallContainer}>
				{Array.from(timers).map(([id, timer])=>(
					<TimerCard key={id} timer={timer} onPlay={()=>handlePlay(id)} onPause={()=>handlePause(id)} onDelete={() => handleDelete(id)}/>
				))}
			</div>
		</div>
	)
}