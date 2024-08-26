import React from 'react';
import ReactDOM from 'react-dom/client';
import { TimerWall } from './components/TimersWall';

const container = document.getElementById('root');
if (!container) throw new Error('Root container is missing!');

const root = ReactDOM.createRoot(container);
root.render(
	<TimerWall/>
); 