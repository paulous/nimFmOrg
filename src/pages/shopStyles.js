//import media from '../media'
import styled from 'styled-components'

export const Main = styled.div`
    position:relative;
    display:flex;
	flex-flow:column;
    align-items:center;
	background-image: repeating-linear-gradient(90deg, rgba(13, 13, 13,0.09) 0px, rgba(13, 13, 13,0.09) 36px,rgba(229, 229, 229,0.09) 36px, rgba(229, 229, 229,0.09) 72px,transparent 72px, transparent 108px,rgba(163, 163, 163,0.09) 108px, rgba(163, 163, 163,0.09) 144px,rgba(21, 21, 21,0.09) 144px, rgba(21, 21, 21,0.09) 180px),repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 14px,transparent 14px, transparent 28px,rgba(0,0,0,0.08) 28px, rgba(0,0,0,0.08) 42px,transparent 42px, transparent 56px,rgba(0,0,0,0.08) 56px, rgba(0,0,0,0.08) 70px),repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 23px,transparent 23px, transparent 46px,rgba(0,0,0,0.08) 46px, rgba(0,0,0,0.08) 69px,transparent 69px, transparent 92px,rgba(0,0,0,0.08) 92px, rgba(0,0,0,0.08) 115px),repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 6px,transparent 6px, transparent 12px,rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 18px,transparent 18px, transparent 24px,rgba(0,0,0,0.04) 24px, rgba(0,0,0,0.04) 30px),linear-gradient(90deg, rgba(212, 157, 30, 0.464),rgba(147, 38, 214, 0.561)),
	url('/assets/shop/garbage.webp');
    background-size: cover;
	height:100vh;
	overflow-y:auto;
	overflow-x:hidden;

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
			padding:15px 15px;

			:last-child{padding-bottom:15px;}
		}
		h3:nth-child(2){
			background:white;
			line-height:1.5;
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