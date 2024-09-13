import { useState } from 'react';
import { TimerCard } from '../Timer/Timer';
import * as dayjs from 'dayjs'

import * as css from './style.css'
import { generateKey } from '../../utils/generateKey';
import { ITimer } from '../../types';


export const TimersWall = ()=>{
	const [timers, setTimers] = useState<ITimer[]>([]);

	const handleAddTimer = ()=>{
		setTimers(prevTimers => [...prevTimers, {id: generateKey(), addTime: null, elapsedTime: 0, isActive: false}])
	}

	const handlePlay = (timer: ITimer) => {
    const newTimers = timers.map((t) => {
      if (t.id === timer.id) {
        return {
          ...t,
          addTime: dayjs(),
          isActive: true,
        };
      }
      return t;
    });

    setTimers(newTimers);
  };

	const handlePause = (timer: ITimer) => {
    const newTimers = timers.map((t) => {
      if (t.id === timer.id) {
        const currentElapsedTime = dayjs().diff(t.addTime);
        return {
          ...t,
          elapsedTime: t.elapsedTime + currentElapsedTime,
					addTime: null,
          isActive: false,
        };
      }
      return t;
    });

    setTimers(newTimers);
  };

	const handleDelete = (id:string)=>{
		setTimers(prevTimers => prevTimers.filter(t=>t.id !== id))
	}

	return(
		<div className={css.timersWall}>
			<div className='timersWallActions'>
				<button onClick={handleAddTimer}>+ Add timer</button>
			</div>
			<div className={css.timersWallContainer}>
				{timers.map((timer)=>(
					<TimerCard key={timer.id} value={timer} onPlay={()=>handlePlay(timer)} onPause={()=>handlePause(timer)} onDelete={() => handleDelete(timer.id)}/>
				))}
			</div>
		</div>
	)
}