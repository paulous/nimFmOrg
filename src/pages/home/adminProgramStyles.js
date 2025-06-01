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

		${media.laptop`margin: 80px 0 30px;`}
		${media.phone`margin: 40px 0 10px;`}
	}

	.back-btn{
		//position:relative;
		display:flex;
		width:100%;
		a{
			position:absolute;
			top:15px;
			left:5vw;
			color:white;
			//margin:30px clamp(50px, 25vw, 600px) 30px 30px ;
			//justify-content:center;
			font-size:1.5rem;
		}		
	}

	.admin-btns{
		display:inline-flex;
		justify-content:space-between;
		width:100%;
		font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		background:rgba(33,24,28,0.5);
		margin-bottom:2px;

		div, a{
			color:white;
			padding:10px 15px;
			border-radius:5px;
		}
		a:first-child{background:rgba(18, 123, 112, 1);}
		a:last-child{background:rgba(209, 89, 135, 1);}

		.save-btn-on{background:rgba(206, 6, 176, 1); cursor: pointer;}
		.save-btn-off{background:rgba(62, 38, 59, 1);}
	}

	.day-wrap{
		width:clamp(200px, 95vw, 1000px);
		margin-bottom:200px;

		.add-show{
			display:flex;
			font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
			color:rgba(0, 0, 0, 1);
			justify-content:center;
			padding:10px;
			background:rgba(249, 242, 190, 1);
			border-radius:5px;
			cursor:pointer;
		}

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
		margin-right:35px;
	}
`
export const Listing = styled.div`
	position:relative;
	display:flex;
	align-items:center;
	background:${({selected}) => selected ? 'rgba(247, 28, 203, .5)' : 'rgba(33,24,28,0.5)'};
	margin-top: 3px;
	box-shadow: 2px 2px 3px rgba(13,3,15,1);
	border-radius: 3px;

	span{
		position:absolute;
		right: 15px;
		font-size:1.5rem;
		cursor:pointer;
	}
	p{
		position:absolute;
		top:5px;
		font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		font-size:1.1rem;
		color:#FFF8C2;
	}
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
	background:${({selected}) => selected ? 'rgba(247, 28, 203, 0.5)' : 'rgba(33,24,28,1)'};
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