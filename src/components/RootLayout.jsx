import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNav";
import styled from "styled-components";
import Player from "./player/Player";

const Nav = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    position: fixed;
    top: 0;
    padding: 8px 0 12px;
    background: rgba(0, 0, 0, 0.5);
`

export default function RootLayout() {

    return <>
            <Outlet />
            <Nav>
                <MainNavigation />
            </Nav>
            <Player />
		</>
}
