import { ITimer } from '../types';
import dayjs from "dayjs";

export const isTimerCountDownActive = (timer: ITimer) => {
	if(!timer.startTime) return false
	const currentTime = dayjs()
	const durationMs = timer.durationMs - (currentTime.diff(timer.startTime, 'ms'))

	if (durationMs <= 0) return false
	return true
}
