import { useState } from 'react';
import * as css from './style.css';

import { ITimer } from '../../types';
import { isTimerActive } from '../../utils/isTimerActive';
import { TimerDigitalDisplay } from '../TimerDigitalDisplay/TimerDigitalDisplay';
import { TimerSymbolDisplay } from '../TimerSymbolDisplay/TimerSymbolDisplay';
import React, { useId } from 'react';
import { useTimerDuration } from '../../hooks/useTimerDuration';

interface TimerCardProps {
  timer: ITimer;
  onPlay: () => void;
  onPause: () => void;
  onDelete: () => void;
}

enum DisplayOptionTypes {
  DIGITAL = 'digital',
  SYMBOL = 'symbol',
}

const DISPLAY_OPTION = {
  [DisplayOptionTypes.DIGITAL]: TimerDigitalDisplay,
  [DisplayOptionTypes.SYMBOL]: TimerSymbolDisplay,
};

export const TimerCard = (props: TimerCardProps) => {
  const id = useId();
  const { timer } = props;

  const isActive = isTimerActive(timer);

  const duration = useTimerDuration(timer);
  const [displayOption, setDisplayOption] = useState('digital');

  const renderDisplay = () => {
    const Display = DISPLAY_OPTION[displayOption];

    if (!Display) {
      throw new Error('Unknown display type');
    }
    return <Display duration={duration} />;
  };

  const renderOptionsPicker = () => {
    const displayOptions = Object.values(DisplayOptionTypes);
    const radioElements = displayOptions.map(option => (
      <React.Fragment key={option}>
        <input
          type="radio"
          name={`display_option_${id}`}
          value={option}
          checked={displayOption === option}
          onChange={() => setDisplayOption(option)}
        />
        <label htmlFor={option}>{option}</label>
      </React.Fragment>
    ));

    return radioElements;
  };

  return (
    <div className={css.timer}>
      <div key="display_option">{renderOptionsPicker()}</div>
      <div key="container">
        {renderDisplay()}
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
