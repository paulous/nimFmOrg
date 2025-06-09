import { useState, useContext, useEffect } from 'react'
import {Link, Outlet} from 'react-router-dom'
import {AdminContext} from "../../utils/AdminState"
import { Main, Days, Day, Listing, Time, TimeNum, AmPm, Title } from './programStyles'
import {animated, useTrail} from '@react-spring/web'
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'
import BackButton from '../../components/buttons/BackButton'
import {ShowTimeContext} from "../../utils/ShowTimeState"

export default function Program(){

	const {
		admin,
		setAdmin
	} = useContext(AdminContext)

	const {
		updateTimeDate,
		programColl,
		setSelectedDay
	} = useContext(ShowTimeContext)

	//const {timeData} = useProgramSelectedTime()
	
	let {
		getDay,
		getHour
	} = updateTimeDate
	
    const [selected, setSelected] = useState(getDay)
    const [today, setToday] = useState(programColl[getDay].hosts)
	
    let justDays = programColl.map(day => day.day)
	
	let times = programColl[getDay].hosts.map(v => (Number(v.time)))

	let foundHour = getHour >= (times[0])
	?   times?.reduce((prev, curr) => Math.abs(curr - getHour) < Math.abs(prev - getHour) && curr <= getHour 
		? curr 
		: prev)
	:   0

	let showIndx = foundHour ? times.indexOf(foundHour) : 'before-hours'

    let selectDelay = (i, others) => {
		return (
        !others
        ?   showIndx === i  && getDay === selected && getHour >= times[0]
        :   showIndx === i && getDay === selected
	)}

    const [trail, setTrail] = useTrail(today.length, () => ({from:{opacity:0, y:100}, to:{opacity:1, y:0}}))
    
    const changeDay = i => e => {
        e.preventDefault()
		setSelectedDay(i)
        setSelected(i)
        setToday(programColl[i].hosts)
        setTrail.start({from:{opacity:0, y:100}, to:{opacity:1, y:0}, reset:true})
    }

	const AdminUpdateToday = (i,shows) => {
		setSelectedDay(i)
        setSelected(i)
        setToday(shows[shows.length-1])
		//selectedTime(timeData, programColl)/////////////hmmmmmm

    }

	useEffect(() => {
		setToday(programColl[getDay].hosts)
	  	setSelected(getDay)
		//selectedTime(timeData, programColl)
	}, [updateTimeDate])
	

    return <>
		<Main>
			<div className='wrap'>
				<Days>
					{
						justDays.map((day, i) => <Day key={`days${i}`} selected={i === selected} onClick={changeDay(i)} >{day.toUpperCase()}</Day>)
					}
				</Days>
				<ul style={{marginBottom: "100px"}}>
					{trail.map((prop, i) =>
							<Link key={'today'+i}  to={`show/${today[i].show_id}`}>
								<animated.div style={prop}>
										<Listing 
										bg={i % 2 ? true : false}
										selected={selectDelay(i,true)}
										>
											<>
												<Time getHour={selectDelay(i)}>
													<TimeNum selected={selectDelay(i,true)}>
														{today[i].time <= 12 ? today[i].time : today[i].time -12}
													</TimeNum>
													<AmPm selected={selectDelay(i,true)}>
														{Number(today[i].time) < 12 ? 'AM' : 'PM'}
													</AmPm>
												</Time>
												<Title selected={selectDelay(i,true)}>
													{today[i].title}
												</Title>
											</>											
										</Listing>
								</animated.div>
							</Link>
						)					
					}
				</ul>
				{	admin.status && <AdminLinkBtn {...{
					admin:admin.program,
					link:'admin-program', 
					setAdmin, 
					area:'program',
					position:true
					}} />
				}
			</div>
			<BackButton to={'/'} />
		</Main>
		<Outlet context={
			{
				AdminUpdateToday, 
				idsDaysTimes: programColl.map((pc) => (
					pc.hosts.map((hts) => (
						{
							id:hts.show_id, 
							day:pc.day, 
							time:hts.time
						}
					))))
				.flat(1)
			}
		} 
		/>
	</>
}