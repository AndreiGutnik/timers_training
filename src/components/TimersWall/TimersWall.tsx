import { TimerCard } from '../Timer/Timer';
import * as css from './style.css';
import { ITimer, TimerType } from '../../types';
import { useTimers } from '../../hooks/useTimers';
import { AddStopWatchPanel } from '../AddStopWatchPanel/AddStopWatchPanel';
import { AddCountDownPanel } from '../AddCountDownPanel/AddCountDownPanel';
import { TimerStopWatchController } from '../TimerStopWatchController/TimerStopWatchController';
import { TimerCountDownController } from '../TimerCountDownController/TimerCountDownController';
import { TimerStopWatch5Controller } from '../TimerStopWatch5Controller/TimerStopWatch5Controller';
import { AddStopWatch5Panel } from '../AddStopWatch5Panel/AddStopWatch5Panel';

const TIMER_CONTROLLERS = {
	[TimerType.STOPWATCH]: TimerStopWatchController,
	[TimerType.COUNTDOWN]: TimerCountDownController,
	[TimerType.STOPWATCH5]: TimerStopWatch5Controller
}

export const TimersWall = () => {
	const { timers, addTimer, updateTimer, deleteTimer } = useTimers();

	const createTimer = (type: TimerType, durationMs: number) => {
		const timer: ITimer = {
			type,
			startTime: null,
			durationMs
		};
		addTimer(timer);
	};

	const handleDelete = (id: string) => {
		deleteTimer(id);

	};

	return (
		<div className={css.timersWall}>
			<div key="timersWallActions">
				<AddStopWatchPanel onClick={() => createTimer(TimerType.STOPWATCH, 0)} />
				<AddStopWatch5Panel onClick={() => createTimer(TimerType.STOPWATCH5, 0)} />
				<AddCountDownPanel
					onClick={durationMs => createTimer(TimerType.COUNTDOWN, durationMs)}
				/>
			</div>
			<div className={css.timersWallContainer}>
				{Array.from(timers).map(([id, timer]) => {
					const Controller = TIMER_CONTROLLERS[timer.type]
					return(
						<Controller
						key={id}
						timer={timer}
						setTimer={(timer)=>updateTimer(id, timer)}
						>
							{(props)=>(
								<TimerCard
								{...props}
								onDelete={() => handleDelete(id)}
							/>
							)}
						</Controller>
					)
				}
				)}
			</div>
		</div>
	);
};
