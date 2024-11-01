import { ITimer } from '../types';
import { useEffect, useState } from 'react';
import { getDuration } from '../utils/getDuration';

export const useTimerDuration = (timer: ITimer, isActive: boolean) => {
	const [duration, setDurationTime] = useState(() => getDuration(timer))

	useEffect(() => {
		if (!isActive) return;

		const intervalId = setInterval(() => setDurationTime(getDuration(timer)), 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [isActive]);

	return duration;
};
