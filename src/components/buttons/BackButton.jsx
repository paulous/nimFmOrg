import React from 'react'
import {Link } from 'react-router-dom'

export default function BackButton({here}) {
  return (
	<div className='back-btn'>
		<Link to={here}>back</Link>
	</div>	
  )
}
