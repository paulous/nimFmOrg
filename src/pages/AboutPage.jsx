import React from "react";
import styled from "styled-components";
import media from "../utils/media";
import { ChangeChars } from "../utils/springAnimations";
import Footer from "./Footer";

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
    font-family: "Londrina Solid", cursive;

    .wrap {
        margin: 0 250px;
        max-width: 1100px;

        .head-line {
            display: flex;
            flex-flow: row;
            font-size: 15rem;
            letter-spacing: 0.4;
            line-height: 0.71;
            margin-bottom: 50px;

            ${media.laptop`
				font-size: 10rem;
				letter-spacing: 0.5;
			`}

            ${media.phone`
				font-size: 5rem;
				line-height: 0.72;
			`}
        }

        .about-text {
            font-size: 10rem;
            letter-spacing: 0.5;
            line-height: 0.72;
            white-space: pre-wrap;
            background: linear-gradient(
                90deg,
                rgba(40, 24, 56, 0.5) 15%,
                rgba(0, 71, 137, 0.1) 95%
            );

            ${media.laptop`
				font-size: 6rem;
			`}

            ${media.phone`
				font-size: 3rem;
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

export default function AboutPage() {
    return (
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
                <span className="about-text">
                    {
                        <ChangeChars
                            text={`Broadcasting 24/7 from the heart of Bundjalung country to the Nimbin valley and beyond since before the turn of the century; 

kept afloat and navigating the treacherous seas of time with a 100% Volunteer crew of movers, shakers, dreamers, planners and the occasional reformed pirate; 

supported financially by a dedicated and righteous team of local Sponsors, Members and the CBF (Community Broadcasting Foundation) and committed to the principles of Truth, Justice and Respect for our Elders, our Planet, and all living things, NIM-FM is the voice of the Alternative Nation.
				`.toUpperCase()}
                            min={0.5}
                            max={1}
                            bg
                        />
                    }
                </span>
                <Footer />
            </div>
        </Main>
    );
}
