import styled from 'styled-components'
import media from '../../utils/media'

export const Main = styled.div`
	position:fixed;
	top:44px;
	bottom:0;
	left:230px;
	right:0;
	display:flex;
	//justify-content:center;
	overflow-y:auto;

	.bg{
		position:fixed;
		top:44px;
		bottom:0;
		left:0;
		right:0;
		background-image: radial-gradient(circle at top right,rgb(184 220 220 / 50%) 0%,rgba(64,9,119,0.6) 48%,rgba(72,7,149,0.2) 48%,rgba(72,7,149,0.2) 53%,rgba(109,5,178,0.3) 53%,rgba(109,5,178,0.3) 56%,rgba(145,2,208,0.3) 56%,rgba(145,2,208,0.3) 69%,rgb(85 0 237 / 33%) 69%,rgb(237 193 0 / 31%) 100%), linear-gradient(0deg,rgba(119,8,119,0.504) 15%,rgb(3 53 36 / 51%) 95%)
		${props => props.bgImage && `, url(${props.bgImage}); background-size:cover; background-position:center;`};
		opacity:${props => props.bgImage ? '0.9' : '1'};
		z-index:-1;
	}

	.wrap{
		padding:45px 15px;
		width:100%;
		margin-right:65px;;

		.par{
			border-radius:21px;
			background: linear-gradient(0deg, rgba(42, 3, 42, 0.25) 25%, rgba(34, 2, 34, 0.356) 75%);
			padding:25px;
			font-size:1.5rem;
			line-height:2;

			${media.laptop`
				width:auto;
			`}

			${media.phone`
				font-size:1.3rem;
		`}
		}


		.head-wrap{
			position:relative;
			display:flex;
			flex-flow:column;
			width:100%;

			h2{

				${media.laptop`
					font-size:1.6rem;
				`}

				${media.phone`
					width:100%;
					font-size:1.3rem;
				`}
			}

			h1{
				width:clamp(200px, 60vw, 1500px);
				min-height:clamp(250px, 35vw, 500px);

				${media.phone`
					font-size:5rem;
					width:auto;
					letter-spacing:-4px;
					min-height:auto;
				`}
			}

			.mast-head{
				position:absolute;
				top:0px;
				right:50px;
				display:flex;
				justify-content:flex-end;
				width:clamp(250px, 35vw, 450px);
				height:clamp(250px, 35vw, 450px);
				border-radius:50% 50%;
				${props => props.masthead && `background-image:url(${props.masthead}); background-size:cover;`};
				padding:50px;
				box-shadow:20px 20px 1px rgba(0,0,0,1);
				border:25px solid #8835b5ff;
				
				${media.laptop`
					top:40px;
					right:0px;
				`}

				${media.phone`
					top:0px;
					margin:15px 0 0;
					position:relative;
					box-shadow:10px 10px 1px rgba(0,0,0,1);
					border:15px solid #8835b5ff;
				`}
			}

			${media.phone`
				margin-bottom:15px;
				flex-flow:wrap;
				justify-content:center;
				overflow:hidden;
			`}
		}

		.podcast-wrap{
			border-radius:66px;
			background: linear-gradient(0deg,hsla(296, 96%, 10%, 0.581) 25%, rgba(242, 255, 0, 0.398) 75%);
			padding:25px;
			margin-right:65px;
			//white-space: pre-wrap;
			font-size:2rem;

			ul{

				li{
					display:flex;
					align-items:center;
					background: linear-gradient(-90deg,rgba(0,195,255,0) 25%,rgba(189, 0, 0, 0.6) 75%);
					border-radius:50px;
					
					div{
						margin:10px;
						min-width:90px;
						min-height:90px;
					}
				}
			}

			${media.laptop`
				margin:50px 0 0 0;
				font-size:1.7rem;
			`}

			${media.phone`
				padding:15px;
				margin:50px 0px 0 0;
				font-size:1.3rem;
			`}
		}

		.audio-wrap{}

		.img-txt-wrap{
			display:flex;
			flex-wrap:wrap;
			justify-content:center;

			img{
				border-radius:21px;
				//align-self:flex-start;
				width:clamp(350px, 100%, 1000px);
				//aspect-ratio:10/10;
				//object-fit:contain;
				margin:30px;
				border:25px solid #8835b5ff;
				
				${media.phone`
					border:15px solid #8835b5ff;

			`}
			}

				
			h2{
				width:clamp(500px, 100%, 800px);
			}
		}

		${media.laptop`
			margin-right:0;
			margin-top:55px;
		`}

		${media.phone`
			margin-top:35px;
		`}
	}

	${media.laptop`
		left:0px;
		padding:15px 50px;		
	`}

	${media.phone`
		padding:5px;		
	`}
`