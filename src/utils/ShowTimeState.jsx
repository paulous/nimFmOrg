import {createContext, useContext, useReducer, useState, useEffect, useCallback} from "react";
import {HomeContext} from "./HomeState"
import { worldTime } from '../utils/worldTime'


const initialValues = (program, day) => ({
	unixTime:{},
	setUnixTime:() => {},
	programColl:program,
	setProgramColl:() => {},
	selectedDay:day,
	setSelectedDay:() => {}
})

export const ShowTimeContext = createContext(initialValues)


function reducer(state, action) {
    switch (action.type) {
	case "setProgramColl": 
		return {...state, programColl:action.payload}
	case "setSelectedDay": 
		return {...state, selectedDay:action.payload}
	default:
		return state
    }
}

let timeout
let updateNoSelect = false

export const ShowTimeProvider = ({ 
	wt, 
	program,
	children 
	}) => {

	const homeContext = useContext(HomeContext)
	const {
		setCurrentShow
	} = homeContext

    const [state, dispatch] = useReducer(reducer, initialValues(program, wt.getDay))

		
	const [unixTime, setUnixTime] = useState(wt)


	const getUnixTime = useCallback((callback) => {
		new Promise((resolve, reject) => resolve( worldTime() ))
		.then(wt => callback(wt))
		.catch(err => console.log(err))
	}, [])

	let times =  program[unixTime.getDay].hosts.map(v => (Number(v.time)))


	let foundHour = unixTime.getHour >= times[0]
	?   times.reduce((prev, curr) => Math.abs(curr - unixTime.getHour) < Math.abs(prev - unixTime.getHour) && curr <= unixTime.getHour 
		? curr 
		: prev)
	:   0

	let showIndx = foundHour ? times.indexOf(foundHour) : 'before-hours'

	let selectedTime = useCallback(() => {
		
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
			updateNoSelect = false               
			getUnixTime(wtResolved => {
				setUnixTime(wtResolved)
			}) 
		}, delay)

		updateNoSelect = true               

	}, [unixTime.getHour, unixTime.getMins, unixTime.getSecs, getUnixTime, setUnixTime, showIndx, times])

	const offLineWake = useCallback(() => {
		window.addEventListener('online', () => { 
			updateNoSelect = false
			console.log('online wake was called.')
			getUnixTime(wtResolved => {
				setUnixTime(wtResolved)
			})                
		})
	}, [getUnixTime, setUnixTime])

	let currentShowEffect = useCallback(() => {
		unixTime.getHour >= times[0]
		?   setCurrentShow({title:program[unixTime.getDay].hosts[showIndx].title, started:true}) 
		:   setCurrentShow({title:`First show starts at: ${times[0]} AM`, started:false})
	},[setCurrentShow, showIndx, program, unixTime.getHour, unixTime.getDay, times])

	useEffect(() => {
		if(!updateNoSelect){
			selectedTime()
			currentShowEffect()
		}
	}, [currentShowEffect, offLineWake, unixTime, selectedTime])

	useEffect(() => {
		offLineWake()
	}, [offLineWake])

	useEffect(() => {
		getUnixTime(wtResolved => {
			setUnixTime(wtResolved)
		}) 
	}, [])

    return <ShowTimeContext.Provider
            value={{
				unixTime,
				programColl:state.programColl,
				setProgramColl:(arr) => dispatch({type: "setProgramColl", payload:arr}),
				selectedDay:state.selectedDay,
				setSelectedDay:(num) => dispatch({type: "setSelectedDay", payload:num})
            }}>
        {children}
        </ShowTimeContext.Provider>
}
