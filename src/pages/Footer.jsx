import React from 'react'
import styled from "styled-components";
import media from "../utils/media";
import { FaFacebook, FaLink } from 'react-icons/fa'


const Main = styled.div`
	
	.bottom-btns{
		display:flex;
		justify-content:space-around;
		align-items:center;
		margin:90px 0 150px;
		font-size: 3rem;

		${media.phone`margin-bottom:100px; font-size: 1.5rem;`}

		.facebook{
			margin:0 15px;
			display:flex;
			align-items:center;
			cursor: pointer;
				}
		.audio-link{
			margin:0 15px;
			display:flex;
			align-items:center;
			cursor: pointer;
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
					<FaFacebook size={100} color={'#FFF'} /> <span>Facebook</span>
				</a>
				<a className="audio-link"
					href={'http://uk5.internet-radio.com:8055/'}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLink size={100} color={'#FFF'} /> <span>Audio stream link</span>
				</a>
			</div>
		</Main>
	)
}
