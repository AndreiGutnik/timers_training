import * as dayjs from 'dayjs'

export interface ITimer{
	id: string;
	addTime: dayjs.Dayjs | null;
	elapsedTime: number;
	isActive: boolean;
}