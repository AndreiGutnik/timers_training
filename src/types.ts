import * as dayjs from 'dayjs'

export interface ITimer{
	addTime: dayjs.Dayjs | null;
	elapsedTime: number;
}