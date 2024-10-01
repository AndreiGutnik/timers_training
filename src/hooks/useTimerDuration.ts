import { ITimer } from '../types';
import { isTimerActive } from '../utils/isTimerActive';
import { useEffect, useState } from 'react';
import { getDuration } from '../utils/getDuration';

export const useTimerDuration = (timer: ITimer) => {
  const [duration, setDurationTime] = useState(() => getDuration(timer));
  const isActive = isTimerActive(timer);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => setDurationTime(getDuration(timer)), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isActive]);

  return duration;
};