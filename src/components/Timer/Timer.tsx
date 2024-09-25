import { useEffect, useRef, useState } from 'react';
import * as css from './style.css';

import * as dayjs from 'dayjs';
import { ITimer } from '../../types';
import { isTimerActive } from '../../utils/isTimerActive';
import { TimerDigitalDisplay } from '../TimerDigitalDisplay/TimerDigitalDisplay';

interface TimerCardProps {
  timer: ITimer;
  onPlay: () => void;
  onPause: () => void;
  onDelete: () => void;
}

export const TimerCard = (props: TimerCardProps) => {
  const { addTime, elapsedTime } = props.timer;

  const isActive = isTimerActive(props.timer);

  const intervalId = useRef(null);
  const [displayTime, setDisplayTime] = useState(elapsedTime);

  useEffect(() => {
    if (!isActive) {
      setDisplayTime(elapsedTime);
      return;
    }
    intervalId.current = setInterval(() => {
      const currentTime = dayjs().diff(addTime) + elapsedTime;
      setDisplayTime(currentTime);
    }, 1000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [isActive, addTime, elapsedTime]);

  const getDuration = () => {
    const currentTime = dayjs();
    let currentDuration = elapsedTime;
    if (addTime) {
      currentDuration += currentTime.diff(addTime, 'ms');
    }
    return dayjs.duration(displayTime);
  };

  return (
    <div className={css.timer}>
      <div key="container">
        <TimerDigitalDisplay duration={getDuration()} />
        <div key="action">
          <div>
            <button
              onClick={props.onPlay}
              disabled={isActive}
            >
              Play
            </button>
            <button
              onClick={props.onPause}
              disabled={!isActive}
            >
              Pause
            </button>
            <button onClick={props.onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
