import styled from 'styled-components'
import media from '../../utils/media'

export const Main = styled.div`
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

	.wrap{
		display:flex;
		flex-flow:column;
		align-items:center;
		margin:0 50px;

		${media.laptop`margin:70px 15px 0;`}
		${media.phone`margin:30px 10px 0;`}
	}

	h2{
		text-align:center;
		width:100%;
		word-wrap: break-all;
		font-size:3rem;
			
		${media.phone`font-size:2rem;`}
	}

	ul{
		width:100%;
	}

	.back-btn{
		display:flex;
		width:100%;
		a{
			position:absolute;
			top:15px;
			left:5vw;
			color:white;
			font-size:1.5rem;
		}		
	}
`

export const Days = styled.ul`
    display:inline-flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    margin-top:25px;
`
export const Day = styled.li`
    margin: 0 3px 6px 3px;
    color:${props => props.selected ? 'rgba(33,24,28,1)' : '#C7A4C4'};
    font-family:Arial, Helvetica, sans-serif;
    font-size:large;
    cursor:pointer;
    background:${props => props.selected ? 'rgba(133, 202, 181, 0.753)' : 'rgba(33,24,28,1)'};
    padding: 5px 25px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(13,3,15,1);

	${props => !props.selected && `
		&:hover{
			color:rgba(133, 202, 181, 0.753);
			background:rgba(33,24,28,1) ;
		}
	
	`};

`
export const Listing = styled.li`
	position:relative;
	display:flex;
	align-items:center;
	width:100%;
	background:${({selected}) => selected ? 'rgba(247, 28, 203, .5)' : 'rgba(33,24,28,0.5)'};
	margin-top: 3px;
	box-shadow: 2px 2px 3px rgba(13,3,15,1);
	border-radius: 3px;
    background:${props => props.selected 
		? 'linear-gradient(0deg, rgba(133, 202, 181, 0.753) 15%, rgb(54, 90, 74) 95%);'
		: props.bg 
			? 'rgba(33,24,28,0.9) ' 
			: 'rgba(33,24,28,0.8) ' 
	};
    cursor:pointer;
    box-shadow: 2px 2px 3px rgba(13,3,15,1);
    border-radius: 3px;
    color:${props => props.selected ? 'rgba(13,3,15,1)' : 'papayawhip'};
	overflow:hidden;

	${props => !props.selected && 
	`    &:hover{
			color:white; 
			background:rgba(31, 29, 51, 0.67);
		}`
	};
`

export const Time = styled.div`
	display:flex;
	flex-flow:wrap;
	align-items:center;
	justify-content:center;
	min-width:150px;
	color:#FFF8C2;
	padding:40px;
    background:${props => props.getHour 
		? 'linear-gradient(90deg, rgba(217, 38, 38, 1) 15%, rgb(149, 12, 12) 95%);' 
		: 'rgba(13,3,15,0.7)'
	};

    clip-path: polygon( 0% 0%, calc(100% - 0.8em) 0%, 100% 50%, calc(100% - 0.8em) 100%, 0% 100%);

    ${media.laptop`padding:30px; min-width:120px;`}
    ${media.phone`padding:25px; min-width:100px;`}
`
export const TimeNum = styled.span`
    font-size:1.8rem;
	
    ${props => props.selected && 'color:#f5eff6ff;'}
`
export const AmPm = styled.span`
    position: absolute;
    top:5px;
    left: 10px;
    font-size:0.8rem;
    color:${props => props.selected ? 'rgba(13,3,15,1)' : '#C7A4C4'};
`
export const Title = styled.p`
    text-overflow: ellipsis;
	font-size:1.4rem;
	line-height:1.2;
	opacity:0.6;
	padding:0 15px;

	${props => props.selected &&
	`font-size:2rem;
	line-height:2;
	opacity:1;
	`};

    ${media.laptop`font-size:1.4rem; left:145px;`}
    ${media.phone`font-size:1.2rem; left:115px;`}

`