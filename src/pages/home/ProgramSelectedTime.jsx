import {useContext, useRef, useEffect} from 'react'
import {ShowTimeContext} from "../../utils/ShowTimeState"
import { worldTime } from '../../utils/worldTime'


export default function ProgramSelectedTime() {

	let timeout = useRef(window.setTimeout);

	const {
		setUpdateTimeDate,
		setCurrentShow,
		programColl
	} = useContext(ShowTimeContext)
	
	let selectedTime = (timeData) => {
		
		let shows = programColl[timeData.getDay].hosts

		let times = shows.map(v => (Number(v.time)))

		let foundHour = timeData.getHour >= times[0]
			? times.reduce((prev, curr) => Math.abs(curr - timeData.getHour) < Math.abs(prev - timeData.getHour) && curr <= timeData.getHour
				? curr
				: prev)
			: 0

		let indx = times.indexOf(foundHour) 
		//  start times on homepage
		let showDayTimeIndx = foundHour ? indx : shows.length-1
		
		let isLastShow = showDayTimeIndx === shows.length-1
		
		let fromHr = Number(shows[showDayTimeIndx].time)
		let toHr =  showDayTimeIndx < shows.length-1 ? Number(shows[showDayTimeIndx + 1].time) :  fromHr
		
		let showDayTime = `LIVE
		from: ${fromHr > 12 ? fromHr - 12 + 'PM' : fromHr === 12 ? fromHr + 'PM': fromHr + 'AM'} 
		to: ${isLastShow ? 'Late' : toHr > 12 ? toHr - 12 + 'PM' : toHr === 12 ? toHr + 'PM': toHr + 'AM'}`
		//
		// start setting homepage show title
		let showIndx = foundHour ? indx : 'before-hours'

		timeData.getHour >= times[0]
			? setCurrentShow({ title: shows[showIndx].title, started: true, id: shows[showIndx].show_id, showDayTime })
			: setCurrentShow({ title: `Good morning Nimbin! First show: ${times[0]} AM`, started: false })

		let nextShowHour = showIndx !== 'before-hours' && showIndx + 1 < times.length
			? times[showIndx + 1]
			: 0,

			hoursToMilSecs = nextShowHour > timeData.getHour || nextShowHour === 0
				? timeData.getHour <= times[0]
					? 3600000 * (times[0] - timeData.getHour) // before first show, after midnight
					: 3600000 * (nextShowHour - timeData.getHour) // after fist show

				: 3600000 * (24 - timeData.getHour), // after last show, before midnight

			minsToMilSecs = 60000 * timeData.getMins,
			secsToMilSecs = 1000 * timeData.getSecs,

			delay = Math.abs(hoursToMilSecs - minsToMilSecs - secsToMilSecs)

		window.clearTimeout(timeout.current)
		timeout.current = window.setTimeout(() => {
        	setUpdateTimeDate(worldTime())
			selectedTime(worldTime())
		}, delay)
	}

	useEffect(() => {
        programColl.length > 0 && selectedTime(worldTime())
    }, [programColl])
	
	return <></>
}
