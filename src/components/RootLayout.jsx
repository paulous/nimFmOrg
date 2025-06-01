import {useContext, useEffect} from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "./MainNav";
import styled from "styled-components";
import Player from "./player/Player";
import { getProgramData } from "../utils/loaders";
import { ShowTimeContext } from "../utils/ShowTimeState"
import ProgramSelectedTime from '../pages/home/ProgramSelectedTime';

export async function loader() {
    return { programcoll: await getProgramData() };
}


const Nav = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    position: fixed;
    top: 0;
    padding: 8px 0 12px;
    background: rgba(0, 0, 0, 0.3);
`

export default function RootLayout() {

    const { programcoll } = useLoaderData()

    const {
        setProgramColl
    } = useContext(ShowTimeContext)

    useEffect(() => {
        programcoll && setProgramColl(programcoll)
    }, [programcoll])

    return <>
        <ProgramSelectedTime />
        <Outlet />
        <Nav>
            <MainNavigation />
        </Nav>
        <Player />
    </>
}
