import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "./MainNav";
import styled from "styled-components";
import Player from "./player/Player";
import { ShowTimeProvider } from "../utils/ShowTimeState";
import { getProgramData } from "../utils/loaders";
import { worldTime } from "../utils/worldTime";
import { anonLogIn } from "../utils/Realm";

const Nav = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    position: fixed;
    top: 0;
    padding: 8px 0 12px;
    background: rgba(0, 0, 0, 0.5);
`;
export async function loader() {
	console.log('called after sleep')
    await anonLogIn();

    return {
        wt: await worldTime(),
        program: await getProgramData(),
    };
}

export default function RootLayout() {
    const { wt, program } = useLoaderData();

    return (
        <ShowTimeProvider {...{ wt, program }}>
            <Outlet />
            <Nav>
                <MainNavigation />
            </Nav>
            <Player />
        </ShowTimeProvider>
    );
}
