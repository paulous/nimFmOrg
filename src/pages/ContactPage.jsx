import React from 'react'
import styled from 'styled-components'
import media from '../utils/media'

const Main = styled.div`
	position:fixed;
	top:44px;
	bottom:0;
	left:0;
	right:0;
	display:flex;
	flex-flow:column;
	align-items:center;
	//justify-content:center;
	padding-top:clamp(50px, 3vw, 100px);
	background-image: radial-gradient(circle at top right,rgb(199 80 99 / 30%) 0%,rgb(130 101 159 / 30%) 48%,rgb(201 117 255 / 30%) 48%,rgb(130 96 184 / 30%) 53%,rgb(130 96 184 / 40%) 53%,rgb(201 117 255 / 20%) 56%,rgba(145,2,208,0.1) 56%,rgba(145,2,208,0.2) 69%,rgb(31 0 237 / 10%) 69%,rgb(144 69 69 / 55%) 100%), linear-gradient(339deg,rgb(119 110 8 / 30%) 15%,rgb(8 3 53) 95%);
	overflow-y:auto;
`
export default function ContactPage() {
  return (
	<Main>
		<article>
			<p></p>
		</article>
	</Main>
  )
}
