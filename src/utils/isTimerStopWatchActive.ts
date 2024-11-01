import { ITimer } from '../types';

export const isTimerStopWatchActive = (timer: ITimer) => timer.startTime !== null
