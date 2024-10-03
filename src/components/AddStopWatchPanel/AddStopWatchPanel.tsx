interface AddStopWatchPanelProps {
  onClick: () => void;
}

export const AddStopWatchPanel = (props: AddStopWatchPanelProps) => {
  return <button onClick={props.onClick}>Add</button>;
};
