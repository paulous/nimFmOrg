import React, { useState, useEffect, useCallback, useContext } from 'react'
import {Link} from 'react-router-dom'
import {AdminContext} from "../../utils/AdminState"
import {ShowTimeContext} from "../../utils/ShowTimeState"
import { MainBodyOne, BodyOneCont, Days, Day, Listing, Time, TimeNum, AmPm, Title } from './bodyOneStyles'
import {HeadlineTrail} from '../../utils/springAnimations'
import {animated, useTrail, config} from '@react-spring/web'
import AdminProgram from './AdminProgram'
import AdminBtn from '../../components/buttons/AdminBtn'

let hline = ['GET', 'WITH', 'THE', 'PROGRAM']

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
		programColl
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

    let mashTitle = (title) => (
        title.indexOf(' ') !== -1 
            ? title.split(' ').map(i => i.charAt(0)).join('').replace(/\W/g, '').toLowerCase() 
            : title.replace(/\W/g, '').toLowerCase()
    )

    const [trail, setTrail] = useTrail(today.length, () => ({from:{opacity:0, y:100}, to:{opacity:1, y:0}}))
    const [intro, setIntro] = useTrail(hline.length, () => ({opacity: 0, x: 20, height: 0}))
    
    const changeDay = useCallback(i => e => {
        e && e.preventDefault()
        setSelected(i)
        setToday(programColl[i].hosts)
        setTrail.start({from:{opacity:0, y:100}, to:{opacity:1, y:0}, reset:true})
    }, [setTrail, programColl])


    useEffect(() => {
        setIntro.start({opacity: 1, x: 0, height: 80, config:config.default})
    }, [setIntro])

    return (
		<MainBodyOne>
			<BodyOneCont>
					<h2><HeadlineTrail intro={intro} hline={hline} /></h2>
				<Days>
					{
						justDays.map((day, i) => <Day key={`days${i}`} selected={i === selected} onClick={changeDay(i)} >{day.toUpperCase()}</Day>)
					}
				</Days>
				<ul>
					{trail.map((prop, i) =>
							<Link key={'today'+i}  to={today[i].title}>
								<animated.div style={prop}>
										<Listing 
										bg={i % 2 ? true : false}
										selected={selectDelay(i,true)}
										>
											{
												admin.program
												?	<AdminProgram {...{i, today}} />
												:	<>
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
											}
										</Listing>
								</animated.div>
							</Link>
						)					
					}
				</ul>
			</BodyOneCont>
			{admin.status && <AdminBtn {...{admin, setAdmin, section:{program:!admin.program}}} />}
		</MainBodyOne>
    )
}