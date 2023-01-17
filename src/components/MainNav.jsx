import { NavLink, Link } from 'react-router-dom'
import styled from "styled-components"


const Nav = styled.nav`
	position:relative;
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
		color:gray;
		&:hover{color:white;}
	}
	.log-in{
		position:absolute;
		right:30px;
		display:flex;
		align-items:center;
	}
    
`

export default function MainNav(){
	return (
		<Nav>
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
			<div className='log-in'><Link to="hackdb" >log-in</Link></div>
		</Nav>
	  );
}