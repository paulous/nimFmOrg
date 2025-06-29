import { NavLink } from 'react-router-dom'
import styled from "styled-components"
import SignIn from './SignIn';
import media from '../utils/media';

const Nav = styled.nav`
	width:90%;
	max-width:1000px;
	font-size:clamp(1.3rem, 1.5vw, 3rem);
	
	ul{
		display:flex;
		justify-content:space-evenly;
		width:100%;
	}

	.on, .off{
		padding:0 5px;
		color:white;
	}
	.off{
		color:rgba(182, 169, 187, 1);
		&:hover{color:white;}
	}
	.log-in{
		position:absolute;
		right:30px;
		color:#492c4e;
			${media.laptop`right:25px;`}
			${media.phone`right:7px;`}
	}    
`

export default function MainNav(){
	
	return (
		<Nav>
			<div className='log-in'><SignIn /></div>
			<ul>
			  <li>
			  <NavLink
				className={({ isActive }) => isActive ? "on" : "off"}  
				to="/"
				end
				>
				  Home
				</NavLink>
			  </li>
			  <li>
			  <NavLink
				className={({ isActive }) => isActive ? "on" : "off"}  
				to="docs"
				end
				>
				  Docs
				</NavLink>
			  </li>
			  <li>
			  <NavLink
				className={({ isActive }) => isActive ? "on" : "off"}  
				to="shop"
				end
				>
				  Shop
				</NavLink>
			  </li>
			</ul>
		</Nav>
	  );
}