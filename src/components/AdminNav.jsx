import React from 'react'
import styled from 'styled-components'

const Main = styled.div`
	width:100%;

	h1{
	}


	nav{
		width:100%;
		background:rgba(33,24,28,0.6);
		display:flex;
		flex-wrap:wrap;
		border-radius:15px;
		margin-top:5px;
	}

	span{
		padding:10px 30px;
		background:rgba(18, 123, 112, 1);
		border-radius:15px;
		cursor: pointer;
		margin:1px;
	}

	span:last-child{
			background:rgba(209, 89, 135, 1);
		}
	
`

export default function AdminNav({navigate, add, remove}) {
  return <Main  className='add-remove'>
	<h1>ADMIN</h1>
		<nav>
			<span onClick={() => navigate(add)}>Add new Item</span>	
			<span onClick={() => navigate(remove)}>Remove Item</span>	
		</nav>
	</Main>
}
