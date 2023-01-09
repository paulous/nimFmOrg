import {useContext, useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { Main, Day, Time, Listing } from './adminProgramStyles'
import { GlobalStyles } from '../../components/GlobalStyles'
import {AdminContext} from "../../utils/AdminState"
import {ShowTimeContext} from "../../utils/ShowTimeState"
import {getShowTitleId} from "../../utils/loaders"
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'

let times = [
    {time: '6', label:'06:00/AM'},
    {time: '7', label:'07:00/AM'},
    {time: '8', label:'08:00/AM'},
    {time: '9', label:'09:00/AM'},
    {time: '10', label:'10:00/AM'},
    {time: '11', label:'11:00/AM'},
    {time: '12', label:'12:00/PM'},
    {time: '13', label:'01:00/PM'},
    {time: '14', label:'02:00/PM'},
    {time: '15', label:'03:00/PM'},
    {time: '16', label:'04:00/PM'},
    {time: '17', label:'05:00/PM'},
    {time: '18', label:'06:00/PM'},
    {time: '19', label:'07:00/PM'},
    {time: '20', label:'08:00/PM'},
    {time: '21', label:'09:00/PM'},
    {time: '22', label:'10:00/PM'}
]

export async function loader() {
	
	//return {showTitleId:[{title:'hello'}]}
	return {showTitleId:await getShowTitleId()}
}

let addUpdateDeleteProgram = async (type, data) => {
	switch (type) {
		case 'add':
			console.log('add', data)
			
			break;
		case 'update':
			console.log('update', data)

			break;
		case 'delete':
			console.log('delete', data)
			
			break;
	
		default:
			break;
	}
	return ''

} 

export default function AdminProgram(){

	const {
		admin,
		setAdmin
	} = useContext(AdminContext)

	const {
		programColl,
		setProgramColl,
		selectedDay
	} = useContext(ShowTimeContext)

	const [day, setDay] = useState(selectedDay)
	const [dayHistory, setDayHistory] = useState({[programColl[day].day]: programColl[day].hosts.map(
		(sho, i, arr) => ({ ...sho, // will be cleaned 
					selected:{}, //set init obj for css selection changes
					origVals:{title:sho.title, time:sho.time, numShows:arr.length} // set init obj for original values
				} 
			))})
	
	const {showTitleId} = useLoaderData()

	let onTime = (i) => (e) => {
		e.preventDefault()

		let newTime = times[e.target.value].time

		let newtimeday = () => dayHistory[programColl[day].day].map(
			(sho,j) => (i === j 
				? 	{ ...sho, 
						slot: e.target.value, 
						time: newTime,
						selected: newTime !== sho.origVals.time 
						? {...sho.selected, [sho.origVals.time]:true} 
						: {...sho.selected, [sho.origVals.time]:false}
					} 
				: 	sho)).sort((a, b) =>  a.slot - b.slot)

		setDayHistory(state => ({...state , [programColl[day].day]: newtimeday()}))
	}
	
	let onTitle = (i) => (e) => {
		e.preventDefault()

		let newtitle = e.target.value

		let newtitleday = () => dayHistory[programColl[day].day].map(
			(sho,j) => (i === j 
				? 	{ ...sho, 
						title:newtitle,
						selected: newtitle !== sho.origVals.title 
							? {...sho.selected, [sho.origVals.title]:true} 
							: {...sho.selected, [sho.origVals.title]:false}
					} 
				: 	sho))

		setDayHistory(state => ({...state , [programColl[day].day]: newtitleday()}))
	}

	let saveDays = (e) => {
		e.preventDefault()

		let dayhistory = {...dayHistory}
		let cleanDayHistory = {}

		for(const day in dayhistory){ //take out no change days and selected:{}

			if(dayhistory[day].some((m) => 
					m.selected[m.origVals.title] //changed title or time
					|| m.selected[m.origVals.time]
				) 
			|| dayhistory[day].length !== dayhistory[day][0].origVals.numShows // added or removed a show
			){
				cleanDayHistory = {...cleanDayHistory, [day]: dayhistory[day].map((d) => {

					let s = {...d}
					delete s.selected
					delete s.origVals
					return s
				
				})}
			}		
		}

		addUpdateDeleteProgram('update', cleanDayHistory)
	}

	let addShow = (e) => {
		e.preventDefault()

		let dayStr = programColl[day].day

		setDayHistory(state => (
			{
				...state, 
				[dayStr]: [...state[dayStr], state[ dayStr ][0] ]
				.sort((a, b) =>  a.slot - b.slot) 
			}
		))
	}

	let removeShow = (i) => (e) => {
		e.preventDefault()

		let dayStr = programColl[day].day
		
		setDayHistory(state => (
			{
				...state, 
				[dayStr]: state[dayStr].filter((_,j) => (j !== i))
			}
		))
	}

	return <Main>
		<GlobalStyles bodyScrollOff={true} />
		<h2>UPDATE THE PROGRAM</h2>
			<ul className='days'>
				{programColl.map(show => show.day).map((d, i) => 
					<Day 
					key={`days${i}`} 
					selected={i === day} 
					onClick={() => {
						let newday = programColl[i]
						let newhosts = newday.hosts.map(
							(sho,_,arr) => ({ ...sho, 
								selected:{}, //set dirty
								origVals:{title:sho.title, time:sho.time, numShows:arr.length}//set dirty
							} 
						))
						setDay(i)
						setDayHistory(state => (
							{
								...state , 
								[newday.day]: state[newday.day] 
									? state[newday.day]  
									: [...newhosts]
							}
							)
						)
					}} >
						{d.toUpperCase()}
					</Day>)}
			</ul>
			<div className='day-wrap'>
				<div className='add-show' onClick={addShow}>ADD NEW ENTRY</div>
				{dayHistory[programColl[day].day].map((dayshow, i) => (						
					<Listing 
					selected={dayshow.selected[dayshow.origVals.title]}  //need delete and add
					key={`ap${i}`}
					>			
						<Time selected={dayshow.selected[dayshow.origVals.time]}>
							<p>{dayshow.selected[dayshow.origVals.time] && `Old time: ${dayshow.origVals.time}`}</p>
							<select onChange={onTime(i)} value={dayshow.slot}>
								{	
									times.map((time, j) => (
										<option
										key={`time${j}`} 
										value={j}
										>
											{time.label}
										</option>
									))
								}
							</select>
						</Time>
						<div className='title' >
							<p>{dayshow.selected[dayshow.origVals.title] && `Old title: ${dayshow.origVals.title}`}</p>
							<select onChange={onTitle(i)} value={dayshow.title}>
								{	
									showTitleId.map((show,k) => (
										<option 
										key={`keyp${k}`} 
										value={show.title}
										>
											{show.title}
										</option>
									))
								}
							</select>
						</div>
						<span onClick={removeShow(i)}>
							{!dayshow.selected[dayshow.origVals.title] && !dayshow.selected[dayshow.origVals.time] && 'X'}
						</span>								
					</Listing>
				))
			}
		</div>
		{admin.status && <div className='admin-btns'>
				<div  className='save-days' onClick={saveDays}>save</div>
				<AdminLinkBtn {...{
				admin:admin.program,
				adminOn:'/', 
				adminOff:'/',
				setAdmin, 
				area:'program'
				}} />
			</div>
		}
	</Main>
}