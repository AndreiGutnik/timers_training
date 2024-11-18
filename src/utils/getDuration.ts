import { ITimer, TimerType } from '../types';
import { getStopWatchDuration } from './getStopWatchDuration';
import { getCountDownDuration } from './getCountDownDuration';
import { getStopWatch5Duration } from './getStopWatch5Duration';

const GETDURATION_TO_TYPE = {
	[TimerType.STOPWATCH]: getStopWatchDuration,
	[TimerType.COUNTDOWN]: getCountDownDuration,
	[TimerType.STOPWATCH5]: getStopWatch5Duration
}

export const getDuration = (timer: ITimer) => {
  const { type, durationMs, startTime } = timer;

	const getDurationToType = GETDURATION_TO_TYPE[type]
	if(!getDurationToType) console.log(`Function getDuration for type ${type} is not found!`)
	return getDurationToType(durationMs, startTime)
}