import {useContext, useState, useEffect} from 'react'
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
		unixTime:{
			getDay,
			getHour
		},
		programColl,
		setProgramColl,
		selectedDay
	} = useContext(ShowTimeContext)

	const [day, setDay] = useState(selectedDay)
	const [dayHistory, setDayHistory] = useState({[programColl[day].day]: [...programColl[day].hosts].map(
		(sho) => ({ ...sho, 
					selected:{} //set init selection obj for css selection changes
				} 
			))})
	
	const {showTitleId} = useLoaderData()

	let onTime = (i) => (e) => {
		e.preventDefault()

		let origTime = programColl[day].hosts[i].time
		let newTime = times[e.target.value].time

		let newtimeday = () => [...dayHistory[programColl[day].day]].map(
			(sho,j) => (i === j 
				? 	{ ...sho, 
						slot: e.target.value, 
						time: newTime,
						selected: newTime !== origTime ? {...sho.selected, [newTime]:true} : {}
					} 
				: 	sho)).sort((a, b) =>  a.slot - b.slot)

		setDayHistory(state => ({...state , [programColl[day].day]: newtimeday()}))
	}
	
	let onTitle = (i) => (e) => {
		e.preventDefault()

		let origTitle = programColl[day].hosts[i].title
		let newtitle = e.target.value

		let newtitleday = () => dayHistory[programColl[day].day].map(
			(sho,j) => (i === j 
				? 	{ ...sho, 
						title:newtitle,
						selected: newtitle !== origTitle ? {...sho.selected, [newtitle]:true} : {}
					} 
				: 	sho))

		setDayHistory(state => ({...state , [programColl[day].day]: newtitleday()}))
	}

	let saveDays = (e) => {
		e.preventDefault()

		let dayhistory = {...dayHistory}
		let cleanDayHistory = {}

		for(const day in dayhistory){ //take out no change days and selected:{}

			if(dayhistory[day].some((m) => Object.keys(m.selected).length > 0)){

				cleanDayHistory = {...cleanDayHistory, [day]: dayhistory[day].map((d) => {

					let s = {...d}
					delete s.selected
					return s
				
				})}
			}		
		}
		//delete dayHistory[day].selected
		console.log( cleanDayHistory)
		//addUpdateDeleteProgram('update', dayHistory)
		//setDayHistory(cleanDays)
		//actions({}, dayHistory)
		//addUpdateDeleteProgram('update', dayHistory)
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
							(sho) => ({ ...sho, 
								selected:{} //set new day selection obj for css selection changes
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
						//actions({}, newday.hosts)
						}} >
						{d.toUpperCase()}
					</Day>)}
			</ul>
			<div className='day-wrap'>
				{dayHistory[programColl[day].day].map((dayshow, i) => (						
					<Listing 
					selected={dayshow.selected[dayshow.title]}  //need delete and add
					key={`ap${i}`}
					>			
						<Time selected={dayshow.selected[times[dayshow.slot].time]}>
							<select name={`time`} onChange={onTime(i)} value={dayshow.slot}>
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
							<select name={`title`} onChange={onTitle(i)} value={dayshow.title}>
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