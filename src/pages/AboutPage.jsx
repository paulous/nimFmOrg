import { useContext } from "react";
import styled from "styled-components";
import {useLoaderData, Outlet} from "react-router-dom";
import media from "../utils/media";
import { ChangeChars } from "../utils/springAnimations";
import Footer from "./Footer";
import { getEqualityDoc } from "../utils/loaders";
import AdminLinkBtn from '../components/buttons/AdminLinkBtn'
import { AdminContext } from "../utils/AdminState";


const Main = styled.div`
    position: fixed;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    //justify-content:center;
    padding-top: clamp(50px, 3vw, 100px);
    background-image: radial-gradient(
            circle at center center,
            rgb(153 26 194 / 73%) 0%,
            rgb(89 19 99 / 35%) 26%,
            rgb(61 0 90 / 71%) 45%,
            rgb(126 7 192 / 3%) 50%,
            rgb(37 93 144 / 5%) 50%,
            rgb(0 151 255 / 27%) 60%,
            rgb(0 255 100 / 11%) 60%,
            rgb(7 252 8 / 31%) 68%,
            rgb(224 234 0 / 20%) 68%,
            rgb(234 205 0 / 55%) 76%,
            rgb(255 170 0 / 26%) 76%,
            rgb(255 148 0 / 58%) 84%,
            rgb(255 0 0 / 31%) 84%,
            rgb(255 0 0 / 51%) 92%,
            rgb(220 0 255 / 0%) 92%
        ),
        linear-gradient(
            358deg,
            rgb(87 17 70 / 73%) 15%,
            rgb(42 13 100 / 58%) 95%
        ),
        url(/assets/about/snake-opacity2.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-blend-mode: lighten;
    overflow-x: hidden;
    overflow-y: auto;

    .wrap {
        margin: 0 250px;
        max-width: 1100px;

        .body-txt{
            position:relative;
            border-radius:21px;
            background: linear-gradient(0deg, rgba(42, 3, 42, 0.7) 25%, rgba(34, 2, 34, 0.9) 75%);
            padding:30px;
            font-size:1.5rem;
            line-height:1.7;
			color:rgba(243, 214, 243, 0.8);

            ::first-line{
                font-size:2.3rem;
            }

            ${media.laptop`
                width:auto;
            `}

            ${media.phone`
                font-size:1.1rem;
                padding:15px;

                ::first-line{
                    font-size:1.5rem;
                }
            `}
        }

        .head-line {
            display: flex;
            flex-flow: row;
            font-size: 15rem;
            letter-spacing: 0.4;
            line-height: 0.71;
            font-family: "Londrina Solid", cursive;

            ${media.laptop`
				font-size: 10rem;
				letter-spacing: 0.5;
			`}

            ${media.phone`
				font-size: 5rem;
				line-height: 0.72;
			`}
        }

        ${media.laptop`
			margin:75px 50px 0;
			width:100%;
		`}

        ${media.phone`
			margin:50px;
		`}
    }
`;

export async function loader() {
    return { about: await getEqualityDoc('general', {key:'name', val:'about'}) };
}

export default function AboutPage() {

    const { admin, setAdmin } = useContext(AdminContext);
    let { about } = useLoaderData();

    return (<>
        <Main>
            <div className="wrap">
                <span className="head-line">
                    <ChangeChars
                        text={`Jinggi Wahla, Bugalbeh & Welcome`.toUpperCase()}
                        min={0.5}
                        max={1}
                        bg
                    />
                </span>
                <div className="body-txt">{about.description}</div>
                <Footer />
            </div>
        </Main>
        {	admin.status && <AdminLinkBtn {...{
            admin:admin.about,
            link:'/about/admin', 
            setAdmin, 
            area:'about',
            position:true
            }} />
        }
        <Outlet context={{ admin, about }} />
        </>
    );
}
