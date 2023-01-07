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
	background-image: radial-gradient(circle at top right, rgba(64, 9, 119, 0.694) 0%, rgba(64, 9, 119, 0.749) 48%,rgba(72,7,149, 0.47) 48%, rgba(72,7,149, 0.47) 53%,rgba(109,5,178, 0.45) 53%, rgba(109,5,178, 0.45) 56%,rgba(145,2,208, 0.48) 56%, rgba(145,2,208, 0.48) 69%,rgba(181,0,237, 0.44) 69%, rgba(181,0,237, 0.44) 100%), 
	linear-gradient(0deg, rgba(119, 8, 119, 0.504) 15%, rgba(53, 3, 53, 0.864) 95%);
	overflow-y:auto;

	h2{
		text-align:center;
		width:100%;
	}

	.day-wrap{
		width:clamp(200px, 95vw, 1000px);

		select{
			padding:10px;
			font-size:1.1rem;
			width:100%;
		}
	}
	.days{
		display:inline-flex;
		flex-wrap:wrap;
		align-items:center;
		justify-content:center;
		margin-top:25px;
	}
	.title{
		margin-right:15px;
	}
	.admin-btns{
		position:fixed;
		bottom:15px;
		right:30px;
	}

`
export const Listing = styled.div`
	position:relative;
	display:flex;
	align-items:center;
	background:${({selected}) => selected ? 'rgba(14, 222, 222, 0.7)' : 'rgba(33,24,28,0.5)'};
	margin-top: 3px;
	box-shadow: 2px 2px 3px rgba(13,3,15,1);
	border-radius: 3px;
`
export const Time = styled.div`
	display:flex;
	flex-flow:wrap;
	align-items:center;
	justify-content:center;
	min-width:150px;
	color:#FFF8C2;
	padding:30px;
	margin-right:15px;

	clip-path: polygon( 0% 0%, calc(100% - 0.8em) 0%, 100% 50%, calc(100% - 0.8em) 100%, 0% 100%);
	background:${({selected}) => selected ? 'rgba(144, 69, 102, 0.7)' : 'rgba(33,24,28,0.5)'};
`
export const Day = styled.li`
	margin: 0 3px 6px 3px;
	font-family:Arial, Helvetica, sans-serif;
	font-size:large;
	cursor:pointer;
	padding: 5px 25px;
	border-radius: 3px;
	box-shadow: 1px 1px 2px rgba(13,3,15,1);
	background:${props => props.selected ? `rgba(8, 105, 130, 1)` : `rgba(78, 18, 90, 0.5)`};

	${media.phone`font-size:medium; padding: 5px 10px;`}
`