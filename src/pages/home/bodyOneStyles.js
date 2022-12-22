import styled from 'styled-components'
import media from '../../utils/media'

export const MainBodyOne = styled.div`
    position:relative;
    display:flex;
    //align-items:center;
    justify-content:center;
    min-height:100vh;
    background: linear-gradient(9deg, rgba(13,13,13,0) 45%, rgba(13,13,13,1) 75%) center center, 
    linear-gradient(3deg, rgba(244,237,230,1) 10%, rgba(255,248,194,0) 40%) center center,
    url('/assets/one/fuck.png') center center;
    background-size: cover;
    background-repeat:no-repeat;
`
export const BodyOneCont = styled.div`
    max-width:1000px;
    min-width:260px;

	h2{
		font-size:3.5rem;
		margin:75px 0 10px;
		line-height:1.3;
		color: rgba(199, 164, 196, 0.5);
		transform:rotate( -3deg);
		
		${media.phone`font-size:3rem; margin:10px 0 20px;`}
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

    ${media.phone`font-size:medium; padding: 5px 10px;`}
`
export const Listing = styled.li`
    position:relative;
    display:flex;
    align-items:center;
    padding:${props => props.selected ? '40px 15px 40px 18%' : '30px 15px 30px 18%'};
    background:${props => props.selected 
		? 'linear-gradient(0deg, rgba(133, 202, 181, 0.753) 15%, rgb(54, 90, 74) 95%);'
		: props.bg 
			? 'rgba(33,24,28,0.9) ' 
			: 'rgba(33,24,28,0.8) ' 
	};
    margin-top: 3px;
    cursor:pointer;
    box-shadow: 2px 2px 3px rgba(13,3,15,1);
    border-radius: 3px;
    color:${props => props.selected ? 'rgba(13,3,15,1)' : 'papayawhip'};

	${props => !props.selected && 
	`    &:hover{
			color:white; 
			background:rgba(41,50,51,0.9);
		}`
	};
    
    ${media.phone`padding:15px 15px 15px 25%;`}
`
export const GotProfile = styled.div`
    width:10px;
    height:10px;
    background:lime;
    border-radius:50%;
`
export const Time = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:85%;
    bottom:0;
    display:flex;
    flex-flow:wrap;
    align-items:center;
    justify-content:center;
    color:#FFF8C2;
    background:${props => props.getHour 
		? 'linear-gradient(90deg, rgba(217, 38, 38, 1) 15%, rgb(149, 12, 12) 95%);' 
		: 'rgba(13,3,15,0.7)'
	};
    padding:0 10px;

    clip-path: polygon( 0% 0%, calc(100% - 0.8em) 0%, 100% 50%, calc(100% - 0.8em) 100%, 0% 100%);

    ${media.phone`
        right:75%;
    `}
`
export const TimeNum = styled.span`
    font-size:1.8rem;
	
	
    ${props => props.selected && 'color:#f5eff6ff;'}

    ${media.phone`font-size:1.3rem;`}
`
export const AmPm = styled.span`
    position: absolute;
    top:5px;
    left: 10px;
    font-size:0.8rem;
    color:${props => props.selected ? 'rgba(13,3,15,1)' : '#C7A4C4'};

    ${media.phone`top:2px; left:4px; font-size:0.6rem;`}
`
export const Title = styled.div`
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
	font-size:1.5rem;
	line-height:1.7;
	opacity:0.6;

	${props => props.selected &&
	`font-size:2rem;
	line-height:2;
	opacity:1;
	&:after{
        content:"▶";
		margin-left:50px;
		font-size:2rem;
		color:white;
    }`};

    ${media.phone`font-size:1rem;`}

`