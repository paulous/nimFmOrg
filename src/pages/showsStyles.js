//import media from '../media'
import styled from 'styled-components'

export const Main = styled.div`
	position:fixed;
	top:40px;
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
				width:clamp(500px, 30vw, 800px);
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





	.shows-overlay{
		position:relative;
		display:flex;
		flex-flow:column;
		align-items:center;
		background-image: repeating-linear-gradient(90deg, rgba(13, 13, 13,0.09) 0px, rgba(13, 13, 13,0.09) 36px,rgba(229, 229, 229,0.09) 36px, rgba(229, 229, 229,0.09) 72px,transparent 72px, transparent 108px,rgba(163, 163, 163,0.09) 108px, rgba(163, 163, 163,0.09) 144px,rgba(21, 21, 21,0.09) 144px, rgba(21, 21, 21,0.09) 180px),repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 14px,transparent 14px, transparent 28px,rgba(0,0,0,0.08) 28px, rgba(0,0,0,0.08) 42px,transparent 42px, transparent 56px,rgba(0,0,0,0.08) 56px, rgba(0,0,0,0.08) 70px),repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 23px,transparent 23px, transparent 46px,rgba(0,0,0,0.08) 46px, rgba(0,0,0,0.08) 69px,transparent 69px, transparent 92px,rgba(0,0,0,0.08) 92px, rgba(0,0,0,0.08) 115px),repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 6px,transparent 6px, transparent 12px,rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 18px,transparent 18px, transparent 24px,rgba(0,0,0,0.04) 24px, rgba(0,0,0,0.04) 30px),linear-gradient(90deg, rgba(212, 157, 30, 0.464),rgba(147, 38, 214, 0.561)),
		url('/assets/shop/garbage.webp');
		background-size: cover;
		min-height:100vh;
		overflow-y:auto;
		overflow-x:hidden;
	}

	.title{
		padding:clamp(50px, 4vw, 100px) 15px 10px;
	};
	.title-txt{
		max-width:1000px;
		padding:10px;
	};
	.items{
		//position:relative;
		display:flex;
		justify-content:center;
		flex-wrap:wrap;
		overflow-y:auto;
		padding:10px;
	};
	.item{
		position:relative;
		width:250px;
		max-height:500px;
		border-radius:5px;
		overflow:hidden;
		margin: 10px;
		box-shadow: 3px 3px 15px rgba(0,0,0,0.5);
		//border:1px solid white;
		background:linear-gradient(0deg, rgba(215, 199, 227, 1) 0%, rgba(249, 247, 250, 0) 75%);
		color:#0c0210e6;

		p, h3{
			padding:2px 15px;

			:last-child{padding-bottom:15px;}
		}
		h3:nth-child(2){
			background:white;
			padding:15px;
		}
		h3:nth-child(3){
			background:rgba(255,255,255,0.5);
		}
	};
	.itm-img{
		width:100%;
		aspect-ratio:10/10;
		object-fit:contain;
	};
	.link-wrap{
		width:250px;
		height:300px;
	};
	.details-outlet{
		position:absolute;
		top:0;
		left:0;
	};
`