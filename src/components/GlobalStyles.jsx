import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	*,
	*::before,
	*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	}
	:root {
		font-family: 'Rock Salt', cursive, Inter, Avenir, Helvetica, Arial, sans-serif;
		//font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;

		color: rgba(255, 255, 255, 0.87);
		background-color: #242424;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	}

	html, body{
		overflow:hidden;
		//overflow-y:${props => props.bodyScrollOff ? 'hidden' : 'auto'};
	}
	ul{	list-style:none;}

	a {
		font-weight: 500;
		text-decoration: none;
	}

	h1{
		font-family: 'Londrina Solid', cursive;
		font-size:clamp(8rem, 15vw, 20rem);
		font-weight: 900;
		line-height:0.75;
		letter-spacing:-8px ;
	}
	h2{
		font-family: 'Rock Salt', cursive;
		font-size:2rem;
		line-height:1.5;
	}
	h3{
		font-size:1.3rem;
	}

	p{
		//font-family: 'Merriweather', serif;
		line-height:1.5;
	}

	li{
		list-style-type:none;
	}
`
