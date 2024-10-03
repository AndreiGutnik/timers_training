import * as dayjs from 'dayjs';

export const getCountDownDuration = (durationMs: number, startTime: dayjs.Dayjs) => {
  const currentTime = dayjs();
  let currentDuration = durationMs;
  if (startTime) {
    currentDuration -= currentTime.diff(startTime, 'ms');
  }
  return dayjs.duration(currentDuration, 'ms');
};
