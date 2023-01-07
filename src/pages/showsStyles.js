//import media from '../media'
import styled from 'styled-components'

export const Main = styled.div`
	position:fixed;
	top:44px;
	bottom:0;
	left:0;
	right:0;
	display:flex;
	justify-content:center;
	background-image: radial-gradient(circle at top right, rgba(64, 9, 119, 0.694) 0%, rgba(64, 9, 119, 0.749) 48%,rgba(72,7,149, 0.47) 48%, rgba(72,7,149, 0.47) 53%,rgba(109,5,178, 0.45) 53%, rgba(109,5,178, 0.45) 56%,rgba(145,2,208, 0.48) 56%, rgba(145,2,208, 0.48) 69%,rgba(181,0,237, 0.44) 69%, rgba(181,0,237, 0.44) 100%), 
	linear-gradient(0deg, rgba(119, 8, 119, 0.504) 15%, rgba(53, 3, 53, 0.864) 95%)
	${props => props.bgImage && `, url(${props.bgImage}); background-size:cover;`};
	overflow-y:auto;

	.wrap{
		max-width:90vw;

		.head-wrap{
			display:flex;
			flex-flow:wrap;
			justify-content:center;

			h1{
				max-width:60vw; 
				align-self:flex-end; 
				margin:15px;
			}

			h2{
				border-radius:21px;
				background: linear-gradient(0deg, rgba(42, 3, 42, 0) 25%, rgba(34, 2, 34, 0.281) 75%);
				padding:25px;
				margin-top:30px;
			}

			.mast-head{
				display:flex;
				width:clamp(200px, 35vw, 400px);
				height:clamp(200px, 35vw, 400px);
				border-radius:50% 50%;
				box-shadow:20px 20px 1px rgba(0,0,0,1);
				${props => props.masthead && `background-image:url(${props.masthead}); background-size:cover;`};
				padding:50px;
				margin:15px;
				border:25px solid #8835b5ff;			
			}
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

		.links-wrap{}
	}
`