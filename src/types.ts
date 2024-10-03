import * as dayjs from 'dayjs';

export enum TimerType {
  STOPWATCH = 'stopwatch',
  COUNTDOWN = 'countdown',
}

export interface ITimer {
  type: TimerType;
  startTime: dayjs.Dayjs | null;
  durationMs: number;
}

export interface ITimerStopWatch extends ITimer {
  type: TimerType.STOPWATCH;
}

export interface ITimerCountDown extends ITimer {
  type: TimerType.COUNTDOWN;
}
