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
		margin-right:65px;

		.par{
			position:relative;
			border-radius:21px;
			background: linear-gradient(0deg, rgba(42, 3, 42, 0.6) 25%, rgba(34, 2, 34, 0.9) 75%);
			padding:15px 50px 30px 30px;
			font-size:1.5rem;
			line-height:1.7;
			overflow-x:hidden;
			color:rgba(218, 182, 218, 0.8);

			::first-line {
				font-size: 2.3rem;
			}

			${media.laptop`
				width:auto;
			`}

			${media.phone`
				font-size:1rem;
				padding:15px 30px;

				::first-line {
				font-size: 1.3rem;
			}
			`}
		}

		.head-wrap{
			position:relative;
			display:flex;
			flex-flow:column;
			width:100%;

			h2{
				position:relative;
				margin-bottom:10px;

				${media.laptop`
					font-size:1.6rem;
				`}

				${media.phone`
					width:100%;
					font-size:1.1rem;
				`}
			}

			h1{
				width:clamp(200px, 60vw, 1500px);
				min-height:clamp(200px, 35vw, 350px);
				transform:rotate(1.5deg);

				${media.laptop`
					min-height:auto;
				`}

				${media.phone`
					font-size:5rem;
					width:auto;
					letter-spacing:-4px;
					min-height:auto;
				`}
			}

			.mast-head{
				position:absolute;
				top:-30px;
				right:30px;
				display:flex;
				justify-content:flex-end;
				width:clamp(250px, 30vw, 450px);
				height:clamp(250px, 30vw, 450px);
				border-radius:50% 50%;
				${props => props.masthead && `background-image:url(${props.masthead}); background-size:cover;`};
				padding:50px;
				box-shadow:20px 20px 1px rgba(0,0,0,1);
				z-index:-1;
				
				${media.laptop`
					//z-index:1;
					top:-20px;
					right:0px;
				`}

				${media.phone`
					z-index:1;
					top:0px;
					position:relative;
					box-shadow:10px 10px 1px rgba(0,0,0,1);
				`}
			}

			${media.phone`
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
				margin:50px 0 0 0;
				font-size:1.3rem;
			`}
		}

		.audio-wrap{margin:20px 0;}

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

		.links-wrap{
			display:flex;
			justify-content:center;
			font-size:1.3rem;
			padding:20px;
			margin:20px 0;
			background:rgba(39, 8, 56, 1);
			border-radius:30px;
			max-width:500px;
			cursor:pointer;

			a{
				color:rgba(182, 150, 199, 1);
;}
				&:hover{background:rgba(8, 0, 7, 1);}
			}

		.margBottom{

			height:100px;

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