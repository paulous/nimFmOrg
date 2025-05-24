import {useCallback, useState, useContext} from 'react'
import {ShowTimeContext} from "../../utils/ShowTimeState"
import { worldTime } from '../../utils/worldTime'


export default function useProgramSelectedTime() {

	let timeout;

	const {
		setCurrentShow
	} = useContext(ShowTimeContext)

	const [timeData, setTimeData] = useState(worldTime())

	let selectedTime = useCallback((timedata, programColl) => {

		let shows = programColl[timedata.getDay].hosts
		let times = shows?.map(v => (Number(v.time))) || 9

		let foundHour = timedata.getHour >= times[0]
			? times.reduce((prev, curr) => Math.abs(curr - timedata.getHour) < Math.abs(prev - timedata.getHour) && curr <= timedata.getHour
				? curr
				: prev)
			: 0

		let showIndx = foundHour ? times.indexOf(foundHour) : 'before-hours'

		timedata.getHour >= times[0]
			? setCurrentShow({ title: shows[showIndx].title, started: true, id: shows[showIndx].show_id })
			: setCurrentShow({ title: `First show starts at: ${times[0]} AM`, started: false })

		let nextShowHour = showIndx !== 'before-hours' && showIndx + 1 < times.length
			? times[showIndx + 1]
			: 0,

			hoursToMilSecs = nextShowHour > timedata.getHour || nextShowHour === 0
				? timedata.getHour <= times[0]
					? 3600000 * (times[0] - timedata.getHour) // before first show, after midnight
					: 3600000 * (nextShowHour - timedata.getHour) // after fist show

				: 3600000 * (24 - timedata.getHour), // after last show, before midnight

			minsToMilSecs = 60000 * timedata.getMins,
			secsToMilSecs = 1000 * timedata.getSecs,

			delay = Math.abs(hoursToMilSecs - minsToMilSecs - secsToMilSecs)

		window.clearTimeout(timeout)
		timeout = window.setTimeout(() => {
			let wt = worldTime()
			setTimeData(wt)
			selectedTime(wt)
		}, delay)
	}, [])

	return {timeData, selectedTime}
}
