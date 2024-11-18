import * as dayjs from 'dayjs';

export const getStopWatch5Duration = (durationMs: number, startTime: dayjs.Dayjs) => {
  const currentTime = dayjs();
  let currentDuration = durationMs;
  if (startTime) {
    currentDuration += currentTime.diff(startTime, 'second') * 5000

  }
  return dayjs.duration(currentDuration, 'ms');
};
