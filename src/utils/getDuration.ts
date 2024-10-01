import { ITimer } from '../types';
import * as dayjs from 'dayjs';

export const getDuration = (timer: ITimer) => {
  const { addTime, elapsedTime } = timer;
  const currentTime = dayjs();
  let currentDuration = elapsedTime;
  if (addTime) {
    currentDuration += currentTime.diff(addTime, 'ms');
  }
  return dayjs.duration(currentDuration, 'ms');
};
