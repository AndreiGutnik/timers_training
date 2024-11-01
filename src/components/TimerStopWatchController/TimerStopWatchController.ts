import { Duration } from "dayjs/plugin/duration";
import { useTimerDuration } from "../../hooks/useTimerDuration";
import { ITimer } from "../../types";

import dayjs from "dayjs";
import { isTimerStopWatchActive } from "../../utils/isTimerStopWatchActive";

interface RenderFuncProps{
	duration: Duration
	isActive: boolean
	onPause: ()=>void
	onPlay: ()=>void
}

interface TimerStopWatchControllerProps{
	timer: ITimer
	setTimer: (ITimer)=>void
	children: (props: RenderFuncProps)=>React.ReactNode
}

export const TimerStopWatchController=(props: TimerStopWatchControllerProps)=>{
	const{timer, setTimer} = props

	const isActive = isTimerStopWatchActive(timer)
	const duration = useTimerDuration(timer, isActive)

	const handlePause = () => {
		const pauseTimer = dayjs()
		const currentElapsedTime = pauseTimer.diff(timer.startTime);
		const newTimer = {
			...timer,
			durationMs: timer.durationMs + currentElapsedTime,
			startTime: null,
		}
		setTimer(newTimer)
	};

	const handlePlay = () => {
    const newTimer = { ...timer, startTime: dayjs() }
    setTimer(newTimer)
  };

	return props.children({
		duration,
		isActive,
		onPause: handlePause,
		onPlay: handlePlay
	})

}