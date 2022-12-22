import { Time, TimeNum, AmPm, Title } from './bodyOneStyles'



export default function AdminProgram({i, today}){


	return <>
		<Time>
			<TimeNum >
				{Number(today[i].time) <= 12 ? today[i].time : today[i].time-12}
			</TimeNum>
			<AmPm>
				{Number(today[i].time) < 12 ? 'AM' : 'PM'}
			</AmPm>
		</Time>
		<Title>
			{today[i].title}
		</Title>
	</>
}