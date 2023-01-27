import React from 'react'
import {Link } from 'react-router-dom'
import styled from "styled-components"
import media from '../../utils/media'

const Main = styled.div`
	position:absolute;
	right:30px;
	top:90px;

	a{
		font-size:3rem;
		color:white;

		${media.laptop`
			//font-size:2rem;
		`}

		${media.phone`
			font-size:2rem;
		`}
	}

	${media.laptop`
		top:140px;
	`}

	${media.phone`
	`}
`

export default function BackButton({to}) {
  return (
	<Main>
		<Link to={to}>X</Link>
	</Main>	
  )
}
