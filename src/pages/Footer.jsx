import styled from "styled-components";
import media from "../utils/media";
import { FaFacebook, FaLink } from 'react-icons/fa'


const Main = styled.div`
	
	.bottom-btns{
		display:flex;
		justify-content:space-around;
		align-items:center;
		margin:30px 0 150px;
		font-size: 1.5rem;
		border-radius:21px;
		background: linear-gradient(0deg, rgba(42, 3, 42, 0.5) 25%, rgba(34, 2, 34, 0.7) 75%);
		padding:25px;

		${media.laptop`width:auto; margin:10px 0 75px;`}
		${media.phone`margin:5px 0 50px; font-size: 1.1rem;`}
		
		.facebook{
			color:white;
			margin:0 15px;
			display:flex;
			align-items:center;
			cursor: pointer;

			span{margin-left:10px}

		}
		.audio-link{
			color:white;
			margin:0 15px;
			display:flex;
			align-items:center;
			cursor: pointer;

			span{margin-left:10px}

		}
	}
`
export default function Footer() {
	return ( 
		<Main>
			<div className="bottom-btns">
				<a className="facebook"
					href={'https://www.facebook.com/Nimbin-Community-Radio-NIM-fm-1023-111024132319428/'}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaFacebook size={50} color={'#FFF'} /> <span>Facebook</span>
				</a>
				<a className="audio-link"
					href={'http://uk5.internet-radio.com:8055/'}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLink size={50} color={'#FFF'} /> <span>Audio stream link</span>
				</a>
			</div>
		</Main>
	)
}
