import * as duration from 'dayjs/plugin/duration';

interface TimerSymbolDisplayPProps {
  duration: duration.Duration;
}

export const TimerSymbolDisplay = (props: TimerSymbolDisplayPProps) => {
  const { duration } = props;

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return (
    <div key="symbol_display">
      <div>{'H'.repeat(hours)}</div>
      <div>{'M'.repeat(minutes)}</div>
      <div>{'S'.repeat(seconds)}</div>
    </div>
  );
};
