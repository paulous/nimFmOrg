import styled from 'styled-components'
import media from '../utils/media'

export const Main = styled.div`
	position:fixed;
	top:44px;
	bottom:0;
	left:0;
	right:0;
	display:flex;
	justify-content:center;
	background-image: radial-gradient(circle at top right,rgb(184 220 220 / 50%) 0%,rgba(64,9,119,0.6) 48%,rgba(72,7,149,0.2) 48%,rgba(72,7,149,0.2) 53%,rgba(109,5,178,0.3) 53%,rgba(109,5,178,0.3) 56%,rgba(145,2,208,0.3) 56%,rgba(145,2,208,0.3) 69%,rgb(85 0 237 / 33%) 69%,rgb(237 193 0 / 31%) 100%), linear-gradient(0deg,rgba(119,8,119,0.504) 15%,rgb(3 53 36 / 51%) 95%);
	${props => props.bgImage && `, url(${props.bgImage}); background-size:cover;`};
	overflow-y:auto;

	.wrap{
		padding:15px;
		width:100%;

		h2{
			border-radius:21px;
			background: linear-gradient(0deg, rgba(42, 3, 42, 0) 25%, rgba(34, 2, 34, 0.281) 75%);
			padding:100px;
			margin-top:30px;
			white-space: pre-wrap;

			${media.laptop`
				padding:50px;
				font-size:1.5rem;
			`}

			${media.phone`
				padding:30px;
				font-size:1.3rem;
			`}
		}

		.head-wrap{
			position:relative;
			display:flex;
			width:100%;

			h1{
				width:clamp(200px, 60vw, 1000px); 
				margin:15px;

				${media.desktop`
					margin-left:215px;
				`}

				${media.laptop`
					margin-left:0;
				`}

				${media.phone`
					font-size:4rem;
					width:auto;
					letter-spacing:-4px;
					hyphens:auto;
				`}
			}

			.mast-head{
				position:absolute;
				top:0;
				right:0;
				display:flex;
				justify-content:flex-end;
				width:clamp(200px, 35vw, 400px);
				height:clamp(200px, 35vw, 400px);
				border-radius:50% 50%;
				${props => props.masthead && `background-image:url(${props.masthead}); background-size:cover;`};
				padding:50px;
				margin:5px 30px;
				box-shadow:20px 20px 1px rgba(0,0,0,1);
				border:25px solid #8835b5ff;
				
				${media.phone`
					position:relative;
					box-shadow:10px 10px 1px rgba(0,0,0,1);
					border:15px solid #8835b5ff;
				`}
			}

			${media.phone`
				flex-flow:wrap;
				justify-content:center;
				overflow:hidden;
			`}
		}

		.podcast-wrap{}

		.audio-wrap{}

		.img-txt-wrap{
			display:flex;
			flex-wrap:wrap;
			justify-content:center;

			img{
				border-radius:21px;
				align-self:flex-start;
				width:clamp(500px, 40vw, 800px);
				//aspect-ratio:10/10;
				//object-fit:contain;
				margin:30px;
				border:25px solid #8835b5ff;			
			}

				
			h2{
				width:clamp(500px, 100%, 800px);
			}
		}

		${media.laptop`
				margin-top:85px;
			`}

			${media.phone`
			margin-top:35px;
			`}
	}
`