import styled from 'styled-components'
import media from '../../utils/media'

export const Main = styled.div`
	position:relative;
    display:flex;
	flex-flow:column;
    align-items:center;
	width:100vw;
	min-height:100vh;
	background-image: linear-gradient(0deg, #1a102849 0%, #110d15da 75%), repeating-radial-gradient(circle at 17% 32%, rgba(234, 243, 60, 0.565),rgba(149, 112, 197, 0.508),rgba(115, 252, 225, 0.468),rgba(116, 72, 5, 0.496),rgba(223, 46, 170, 0.599),rgba(73, 80, 75, 0.508),rgba(233, 248, 17, 0.479) 2px);
	overflow-x:hidden;
	padding:30px;

	h2{
		margin-top:60px; 
		font-size:3rem;
		line-height:1.5;
	}

	.wrapper{
		
		display:flex;
		//align-items:center;
		//flex-flow:row;
		//flex-wrap:wrap ;
		margin:clamp(50px, 4vw, 200px);
		//max-width:500px;


		${media.laptop`display:inline-block;`}
		${media.phone`display:inline-block;`}
	};
	.txt-wrap{
		padding:30px;
		display:flex;
		align-self: flex-start;
		flex-wrap:wrap ;
		flex-flow:column;
		max-width:400px;
		background:linear-gradient(0deg, rgba(17, 1, 26, 0.867) 0%, rgba(17, 13, 21, 0.192) 75%);

		p:last-child{
			margin-top:15px;

			:first-line{
				font-size:1.1rem;
			}

			${media.phone`margin-top:30px;`}
		}

		h3{
			padding:30px 0; 
			font-size:2rem;
			line-height:1.5;
		}


		${media.phone`margin:15px;`}
	};
	.item-title{
		padding:30px 15px;
	};
	.item-txt{
		padding:5px 15px;

		&::first-line{
		font-size: 1.2rem;
	}
	};
	.item-btn{
		border-radius:10px;
		border:1px solid white;
		padding:10px 5px;
		margin:15px 0;
		max-width:300px;
	};
`