import { useState } from 'react';

interface AddCountDownPanelProps {
  onClick: (duration: number) => void;
}

export const AddCountDownPanel = (props: AddCountDownPanelProps) => {
  const [durationMsStr, setDurationMsStr] = useState<string>('');

  const handleClick = () => {
    const durationMs = Number(durationMsStr) * 1000;
    if (isNaN(durationMs)) return;
    if (!durationMs) return;
    if (durationMs < 0) return;

    props.onClick(durationMs);
  };

  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <input
        type="number"
        onChange={e => setDurationMsStr(e.target.value)}
        value={durationMsStr}
      />
    </div>
  );
};
