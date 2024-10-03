import { ITimer } from '../types';
import { isTimerActive } from '../utils/isTimerActive';
import { useEffect, useState } from 'react';
import { getDuration } from '../utils/getDuration';
import dayjs from 'dayjs';

export const useTimerDuration = (timer: ITimer) => {
  const [duration, setDurationTime] = useState(() => getDuration(timer));
  const isActive = isTimerActive(timer);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      const endTime = timer.startTime.add(timer.durationMs, 'ms');
      if (dayjs().isAfter(endTime)) {
        clearInterval(intervalId);
        setDurationTime(dayjs.duration(0));
      } else {
        setDurationTime(getDuration(timer));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, timer]);

  return duration;
};
