import styled from 'styled-components'

const Main = styled.div`
	width:100%;
	font-family: Inter, Avenir, Helvetica, Arial, sans-serif;

	h1{
	}


	nav{
		width:100%;
		background:rgba(33,24,28,0.6);
		display:flex;
		flex-wrap:wrap;
		border-radius:15px;
		margin-top:5px;
		padding:15px;
		justify-content:space-between;
		align-items:center;
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
			<span onClick={() => navigate(add)}>CREATE</span>
			<span onClick={() => navigate(remove)}>DESTROY</span>	
		</nav>
		<p>Click items below to update.</p>
	</Main>
}
