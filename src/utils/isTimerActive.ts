import { ITimer } from '../types';

export const isTimerActive = (timer: ITimer) => timer.startTime !== null;
