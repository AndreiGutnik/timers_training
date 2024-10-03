import { ITimer, TimerType } from '../types';
import { getStopWatchDuration } from './getStopWatchDuration';
import { getCountDownDuration } from './getCountDownDuration';

export const getDuration = (timer: ITimer) => {
  const { type, durationMs, startTime } = timer;

  if (type === TimerType.STOPWATCH) {
    return getStopWatchDuration(durationMs, startTime);
  } else if (type === TimerType.COUNTDOWN) {
    return getCountDownDuration(durationMs, startTime);
  }
};
