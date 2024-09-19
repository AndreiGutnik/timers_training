export const TimerNotFound=(id: string) => {
	throw new Error(`Timer with ID ${id} not found`)
}