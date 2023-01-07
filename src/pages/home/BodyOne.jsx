import React, { useState, useEffect, useCallback, useContext } from 'react'
import {Link} from 'react-router-dom'
import {AdminContext} from "../../utils/AdminState"
import {ShowTimeContext} from "../../utils/ShowTimeState"
import { MainBodyOne, BodyOneCont, Days, Day, Listing, Time, TimeNum, AmPm, Title } from './bodyOneStyles'
import {ChangeChars} from '../../utils/springAnimations'
import {animated, useTrail} from '@react-spring/web'
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'


export default function BodyOne(){

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
		setSelectedDay
	} = useContext(ShowTimeContext)

    const [selected, setSelected] = useState(getDay)
    const [today, setToday] = useState(programColl[getDay].hosts)

    let times =  programColl[getDay].hosts.map(v => (Number(v.time)))

    let justDays = programColl.map(day => day.day)

    let foundHour = getHour >= times[0]
    ?   times.reduce((prev, curr) => Math.abs(curr - getHour) < Math.abs(prev - getHour) && curr <= getHour 
        ? curr 
        : prev)
    :   0

    let showIndx = foundHour ? times.indexOf(foundHour) : 'before-hours'
    
    let selectDelay = (i, others) => (
        !others
        ?   showIndx === i  && (getDay === selected && getHour >= times[0] )
        :   showIndx === i && getDay === selected)

    const [trail, setTrail] = useTrail(today.length, () => ({from:{opacity:0, y:100}, to:{opacity:1, y:0}}))
    
    const changeDay = useCallback(i => e => {
        e && e.preventDefault()
		setSelectedDay(i)
        setSelected(i)
        setToday(programColl[i].hosts)
        setTrail.start({from:{opacity:0, y:100}, to:{opacity:1, y:0}, reset:true})
    }, [setTrail, programColl])


    return (
		<MainBodyOne>
			<BodyOneCont>
					<h2><ChangeChars text={'GET WITH THE PROGRAM'} /></h2>
				<Days>
					{
						justDays.map((day, i) => <Day key={`days${i}`} selected={i === selected} onClick={changeDay(i)} >{day.toUpperCase()}</Day>)
					}
				</Days>
				<ul>
					{trail.map((prop, i) =>
							<Link key={'today'+i}  to={`show/${today[i].title}`}>
								<animated.div style={prop}>
										<Listing 
										bg={i % 2 ? true : false}
										selected={selectDelay(i,true)}
										>
											<>
												<Time getHour={selectDelay(i)}>
													<TimeNum selected={selectDelay(i,true)}>
														{Number(today[i].time) <= 12 ? today[i].time : today[i].time-12}
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
			</BodyOneCont>
			{	admin.status && <AdminLinkBtn {...{
				admin:admin.program,
				adminOn:'admin-program', 
				adminOff:'/',
				setAdmin, 
				area:'program'
				}} />
			}
		</MainBodyOne>
    )
}