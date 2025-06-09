import styled from "styled-components";
import media from '../utils/media'

export const Main = styled.div`
	display:flex;
	flex-flow:column;
	width:100vw;

	.nav-wrap{
		position:absolute;
		top:78px;
		left:50px;

		ul{
			li{ 
				.on, .off{
					display:flex;
					font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
					font-size:1.3rem;
					padding:10px 20px;
					margin:7px;
					background:rgba(19, 0, 19, 0.682);
					border-radius:30px;

					border:3px solid rgb(176, 64, 176);
					box-shadow: 10px 1px 0 rgb(180, 141, 199);
					color:rgba(183, 153, 183, 1);
					cursor:pointer;
					
					${media.laptop`
						font-size:1.1rem;
					`}
					${media.phone`
						font-size:0.9rem;
						padding:5px;
						margin:0;
					`}
				}
				.off{
					border:3px solid #3c0f3c;
					box-shadow: -10px 1px 0 rgb(82, 1, 120);
					color:rgba(183, 153, 183, 0.7);

					${media.phone`
						color:white;
					`}

					&:hover{
						border:3px solid rgb(176, 64, 176);
						box-shadow: 10px 1px 0 rgb(180, 141, 199);
						color:rgba(183, 153, 183, 1);
					}
				}


			}

			${media.laptop`
				display:flex;
				flex-wrap:wrap;
				justify-content:space-around;
				width:100%;
				max-width:800px;
			`}
			${media.phone`
				justify-content:space-around;
			`}
		}
		${media.laptop`
			top:70px;
			left:0px;
			display:flex;
			justify-content:center;
			width:100%;
		`}

		${media.phone`
			top:0;
			padding:55px 5px 15px;
			background:linear-gradient(0deg, rgba(42, 3, 42, 0.377) 25%, rgba(34, 2, 34, 0.873) 75%);
		`}
	}

`