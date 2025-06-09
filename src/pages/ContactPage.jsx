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

    .wrap {
        margin: 0 250px;
        max-width: 1100px;

        .head-line {
            display: flex;
            flex-flow: row;
            font-size: 15rem;
            letter-spacing: 0.4;
            line-height: 0.71;
            //margin-bottom: 30px;
            font-family: "Londrina Solid", cursive;

            ${media.laptop`
				font-size: 12rem;
				letter-spacing: 0.5;
			`}

            ${media.phone`
				font-size: 6rem;
				line-height: 0.72;
			`}
        }

        .body-txt{
            position:relative;
            border-radius:21px;
            background: linear-gradient(0deg, rgba(42, 3, 42, 0.7) 25%, rgba(34, 2, 34, 0.9) 75%);
            padding:30px;
            font-size:1.5rem;
            line-height:2;
			color:rgba(243, 214, 243, 0.8);

            p{margin-bottom:25px;}
            a{color:rgb(187, 255, 0);}

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
                <div className="body-txt">
                    <p>NimFM is always interested to hear from individuals who would like to become radio presenters.
                    If you have an idea for your own show.</p>
                    <address>
                    <p>Call us on: <a href="tel:+61-2-66890277"> +61-2-66890277</a></p>
                    <p>Send an email to: <a href="mailto:nimbinradiomedia@gmail.com">nimbinradiomedia @ gmail.com</a></p>
                    </address>
                    <p>Or just drop in. Full training is available.</p>
                </div>
                    <Footer />
            </div>
        </Main>
    );
}


  