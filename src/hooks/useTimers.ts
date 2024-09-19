import { useState } from "react";
import { ITimer } from "../types";
import { generateKey } from "../utils/generateKey";
import { TimerNotFound } from "../errors";

export const useTimers = ()=>{
	const [timers, setTimers] = useState<Map<string, ITimer>>(new Map());

	const addTimer = (timer: ITimer)=>{
		const id = generateKey()
		setTimers(currentTimer=>new Map([...currentTimer, [id, timer]]))
		return id
	}

	const updateTimer = (id: string, timer: ITimer) => {
		setTimers(currentTimer=>{
			if(!currentTimer.has(id)) TimerNotFound(id);
			return new Map([...currentTimer, [id, timer]])
		})
	}

	const deleteTimer = (id: string) => {
		setTimers(currentTimer => {
			const deletedTimers = new Map(currentTimer);
			deletedTimers.delete(id)
			return deletedTimers
		})
	}

	return {
		timers,
		addTimer,
		updateTimer,
		deleteTimer
};
}