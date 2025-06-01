import styled from "styled-components"
import media from '../../utils/media'

export const Center = styled.div`
	position: absolute;
	top:30px;
	right:0;
	left:0;		
	display: flex;
	flex-flow:column;
	justify-content: center;
	align-items:center;

	${media.laptop`top: 130px;`}
	${media.phone`top: 15px;`}

	.btn-position{
		margin-top:-100px;
		display: flex;
		flex-flow:column;
		align-items:center;

		${media.phone`margin-top: -70px;`}

	}

`
export const RainbowCont = styled.div`
	width: clamp(500px, 35vw, 575px);
	${media.phone` width: clamp(100px, 90vw, 400px);`}
`

export const RadioCont = styled.div`
	position:absolute;
	right:0;
	bottom:5px;
	left:0;
	display: flex;
	align-items: baseline;
	justify-content: flex-end;
	font-family:Arial, Helvetica, sans-serif;
	cursor: pointer;

    ${media.phone`flex-direction:column; align-items: center; bottom:50px;`}
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
	margin-right:5px;

    ${media.phone`flex-flow:wrap-reverse; margin:0;`}
`
