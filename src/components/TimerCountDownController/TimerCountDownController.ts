import { Duration } from "dayjs/plugin/duration";
import { useTimerDuration } from "../../hooks/useTimerDuration";
import { ITimer } from "../../types";

import { isTimerCountDownActive } from "../../utils/isTimerCountDownActive";
import dayjs from "dayjs";

interface RenderFuncProps{
	duration: Duration
	isActive: boolean
	onPause: ()=>void
	onPlay: ()=>void
}

interface TimerCountDownControllerProps{
	timer: ITimer
	setTimer: (ITimer)=>void
	children: (props: RenderFuncProps)=>React.ReactNode
}

export const TimerCountDownController=(props: TimerCountDownControllerProps)=>{
	const{timer, setTimer} = props

	const isActive = isTimerCountDownActive(timer)
	const duration = useTimerDuration(timer, isActive)

	const handlePause = () => {
		const pauseTimer = dayjs()
		const currentElapsedTime = pauseTimer.diff(timer.startTime);
		const newTimer = {
			...timer,
			durationMs: timer.durationMs - currentElapsedTime,
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