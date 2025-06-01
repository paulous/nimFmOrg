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
            circle at center bottom,
            rgb(153 26 194 / 73%) 0%,
            rgb(89 19 99 / 35%) 26%,
            rgb(61 0 90 / 71%) 45%,
            rgb(126 7 192 / 3%) 65%,
            rgb(37 93 144 / 5%) 65%,
            rgb(0 151 255 / 27%) 73%,
            rgb(0 255 100 / 11%) 73%,
            rgb(7 252 8 / 31%) 78%,
            rgb(224 234 0 / 20%) 78%,
            rgb(234 205 0 / 55%) 83%,
            rgb(255 170 0 / 26%) 83%,
            rgb(255 148 0 / 58%) 88%,
            rgb(255 0 0 / 31%) 88%,
            rgb(255 0 0 / 51%) 93%,
            rgb(220 0 255 / 0%) 93%
        ),
        linear-gradient(
            308deg,
            rgb(87 17 70 / 43%) 15%,
            rgb(255 0 170 / 13%) 95%
        ),
        radial-gradient(
            circle at right bottom,
            rgb(153 26 194 / 0%) 0%,
            rgb(89 19 99 / 0%) 26%,
            rgb(61 0 90 / 0%) 45%,
            rgb(126 7 192 / 3%) 65%,
            rgb(37 93 144 / 5%) 65%,
            rgb(0 151 255 / 27%) 73%,
            rgb(0 255 100 / 11%) 73%,
            rgb(7 252 8 / 31%) 78%,
            rgb(224 234 0 / 20%) 78%,
            rgb(234 205 0 / 55%) 83%,
            rgb(255 170 0 / 26%) 83%,
            rgb(255 148 0 / 58%) 88%,
            rgb(255 0 0 / 31%) 88%,
            rgb(255 0 0 / 51%) 93%,
            rgb(220 0 255 / 0%) 93%
        ),
        linear-gradient(
            308deg,
            rgb(87 17 70 / 43%) 15%,
            rgb(255 0 170 / 13%) 95%
        ),
        url(/assets/contact/musicSpirits_small.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-blend-mode: multiply;
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

        .contact-text {
            font-size: 5rem;
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
        .bottom-btns{
            display:flex;
            justify-content:space-around;
            align-items:center;
            margin:90px 0 150px;
			font-size: 3rem;

            ${media.phone`margin-bottom:100px; font-size: 1.5rem;`}

            .facebook{
                display:flex;
                align-items:center;
                cursor: pointer;
                    }
            .audio-link{
                display:flex;
                align-items:center;
                cursor: pointer;
            }
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
export default function ContactPage() {
    return (
        <Main>
            <div className="wrap">
                <span className="head-line">
                    <ChangeChars
                        text={`MAKE CONTACT`.toUpperCase()}
                        min={0.5}
                        max={1}
                        bg
                    />
                </span>
                <span className="contact-text">
                    {
                        <ChangeChars
                            text={`NimFM is always interested to hear from individuals who would like to become radio presenters.
					
If you have an idea for your own show, call us on (02) 6689 0279, send an email to nimbinradiomedia@gmail.com, or just drop in.

Full training is available.`.toUpperCase()}
                            min={0.7}
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
