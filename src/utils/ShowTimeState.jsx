import {createContext, useReducer, useState, useEffect, useCallback} from "react";
import { worldTime } from '../utils/worldTime'


const initialValues = (program, day) => ({
	unixTime:{},
	selectedTime:() => {},
	setUnixTime:() => {},
	programColl:program,
	setProgramColl:() => {},
	selectedDay:day,
	setSelectedDay:() => {},
	currentShow:{title:'nimFm', started:false},
    setCurrentShow: () => {}
})

export const ShowTimeContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
	case "setProgramColl": 
		return {...state, programColl:action.payload}
	case "setSelectedDay": 
		return {...state, selectedDay:action.payload}
	case "setCurrentShow": 
		return {...state, currentShow:action.payload}
	default:
		return state
    }
}

let timeout

export const ShowTimeProvider = ({ 
	wt, 
	program,
	children 
	}) => {

    const [state, dispatch] = useReducer(reducer, initialValues(program, wt.getDay))

	const [unixTime, setUnixTime] = useState(wt)

	const getUnixTime = useCallback((callback) => {
		new Promise((resolve, reject) => resolve( worldTime() ))
		.then(wt => callback(wt))
		.catch(err => console.log(err))
	}, [])

	let selectedTime = useCallback((unixTime) => {
		console.log('selected time called-----------')

		let hosts = state.programColl[unixTime.getDay].hosts
		let times = hosts.map(v => (Number(v.time)))

		let foundHour = unixTime.getHour >= times[0]
		?   times.reduce((prev, curr) => Math.abs(curr - unixTime.getHour) < Math.abs(prev - unixTime.getHour) && curr <= unixTime.getHour 
			? curr 
			: prev)
		:   0
	
		let showIndx = foundHour ? times.indexOf(foundHour) : 'before-hours'

		unixTime.getHour >= times[0]
		?   dispatch({type: "setCurrentShow", payload:{title:hosts[showIndx].title, started:true, id:hosts[showIndx].show_id}})
		:   dispatch({type: "setCurrentShow", payload:{title:`First show starts at: ${times[0]} AM`, started:false}})
		
		let nextShowHour = showIndx !== 'before-hours' && showIndx+1 < times.length 
		?   times[showIndx+1] 
		:   0,

		hoursToMilSecs =  nextShowHour > unixTime.getHour || nextShowHour === 0
		? unixTime.getHour <= times[0] 
			? 3600000 * (times[0] - unixTime.getHour) // before first show, after midnight
			: 3600000 * (nextShowHour - unixTime.getHour) // after fist show

		: 3600000 * (24 - unixTime.getHour), // after last show, before midnight

		minsToMilSecs = 60000 * unixTime.getMins,
		secsToMilSecs = 1000 * unixTime.getSecs,

		delay = Math.abs(hoursToMilSecs - minsToMilSecs - secsToMilSecs)

		window.clearTimeout(timeout)
		timeout = window.setTimeout( () => { 
			getUnixTime(wtResolved => {
				setUnixTime(wtResolved)
				selectedTime(wtResolved)
			}) 
		}, delay)

	}, [])

	useEffect(() => {
		selectedTime(wt)
	}, [wt])

    return <ShowTimeContext.Provider
            value={{
				unixTime,
				selectedTime,
				programColl:state.programColl,
				setProgramColl:(arr) => dispatch({type: "setProgramColl", payload:arr}),
				selectedDay:state.selectedDay,
				setSelectedDay:(num) => dispatch({type: "setSelectedDay", payload:num}),
				currentShow:state.currentShow,
				setCurrentShow:(num) => dispatch({type: "setCurrentShow", payload:num})
            }}>
        {children}
        </ShowTimeContext.Provider>
}
