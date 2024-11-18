interface AddStopWatch5PanelProps {
  onClick: () => void;
}

export const AddStopWatch5Panel = (props: AddStopWatch5PanelProps) => {
  return (
		<div>
			<button onClick={props.onClick}>Add +5s</button>
		</div>
	)
};
