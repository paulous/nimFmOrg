import styled from "styled-components"
import media from '../../utils/media'

export const Center = styled.div`
	position: absolute;
	top:0;
	right:0;
	left:0;		
	display: flex;
	flex-flow:column;
	justify-content: center;
	align-items:center;
	margin-top: 30px;

	${media.laptop` margin-top: 70px;`}
	${media.phone` margin-top: 110px;`}

	.btn-top-margin{
		margin-top:-100px;
		${media.laptop` margin-top: -50px;`}
		${media.phone` margin-top: 0;`}
	}

`
export const RainbowCont = styled.div`
	width: clamp(500px, 35vw, 575px);
	${media.phone` width: clamp(100px, 90vw, 400px);`}
`

export const RadioCont = styled.div`
	position:absolute;
	right:0;
	bottom:15px;
	left:0;
	display: flex;
	align-items: baseline;
	justify-content: flex-end;
	font-family:Arial, Helvetica, sans-serif;
	cursor: pointer;

    ${media.phone`flex-direction:column; align-items: center;`}
`
export const RadioTxt = styled.span`
  	font-family: 'Londrina Solid', cursive;
	font-size: 3rem;
	margin:0 10px;
	//color:#fff;

    ${media.phone`font-size: 1.5rem;`}
`
export const Broadcast = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: center;
	color:#fff8c2;
	font-size:0.8rem;
	padding-left:10px;
	margin-right:15px;

    ${media.phone`flex-flow:wrap-reverse; margin:0 0 100px 0;`}
`
