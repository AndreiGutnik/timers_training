import { useState } from 'react';
import { TimerCard } from '../Timer/Timer';
import * as dayjs from 'dayjs';

import * as css from './style.css';
import { ITimer, TimerType } from '../../types';
import { useTimers } from '../../hooks/useTimers';
import { AddStopWatchPanel } from '../AddStopWatchPanel/AddStopWatchPanel';
import { AddCountDownPanel } from '../AddCountDownPanel/AddCountDownPanel';

export const TimersWall = () => {
  const { timers, addTimer, updateTimer, deleteTimer } = useTimers();

  const handleAddTimer = (type: TimerType, durationMs: number) => {
    const timer: ITimer = { type, startTime: null, durationMs };
    addTimer(timer);
  };

  const getTimer = (id: string) => {
    const timer = timers.get(id);
    if (timer) return timer;

    throw new Error(`Unable to find timer with id = ${id}`);
  };

  const handlePlay = (id: string) => {
    const timer = getTimer(id);
    updateTimer(id, { ...timer, startTime: dayjs() });
  };

  const handlePause = (id: string) => {
    const timer = getTimer(id);
    const currentElapsedTime = dayjs().diff(timer.startTime);
    updateTimer(id, {
      ...timer,
      durationMs: timer.durationMs + currentElapsedTime,
      startTime: null,
    });
  };

  const handleDelete = (id: string) => {
    deleteTimer(id);
  };

  return (
    <div className={css.timersWall}>
      <div key="timersWallActions">
        <AddStopWatchPanel onClick={() => handleAddTimer(TimerType.STOPWATCH, 0)} />
        <AddCountDownPanel
          onClick={durationMs => handleAddTimer(TimerType.COUNTDOWN, durationMs)}
        />
      </div>
      <div className={css.timersWallContainer}>
        {Array.from(timers).map(([id, timer]) => (
          <TimerCard
            key={id}
            timer={timer}
            onPlay={() => handlePlay(id)}
            onPause={() => handlePause(id)}
            onDelete={() => handleDelete(id)}
          />
        ))}
      </div>
    </div>
  );
};
