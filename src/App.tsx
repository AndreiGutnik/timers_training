import { TimersWall } from './components/TimersWall/TimersWall';
import { createRoot } from 'react-dom/client';

import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


const container = document.getElementById('root');
if (!container) throw new Error('Root container is missing!');

const root = createRoot(container);
root.render(
	<TimersWall/>
);