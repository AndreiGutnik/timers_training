import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

interface TimerDigitalDisplayProps {
  duration: duration.Duration;
}

export const TimerDigitalDisplay = (props: TimerDigitalDisplayProps) => {
  return <div key="digital_display">{props.duration.format('HH:mm:ss')}</div>;
};
