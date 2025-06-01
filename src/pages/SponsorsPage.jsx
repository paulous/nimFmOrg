import { useContext, useState } from "react";
import { useLoaderData, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "../utils/media";
import { getSponsors } from "../utils/loaders";
import { ChangeChars } from "../utils/springAnimations";
import AdminNav from "../components/AdminNav";
import { AdminContext } from "../utils/AdminState";
import BackButton from "../components/buttons/BackButton";
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
    background-image: radial-gradient(
            circle at center top,
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
        );
    background-size: 30%;
    background-size: contain;
    background-repeat: no-repeat;
    //background-position-y: bottom;
    background-blend-mode: lighten;
    padding-top: clamp(50px, 3vw, 100px);
    overflow-y: auto;

    ul {
        max-width: 1200px;

        h1 {
            text-align: center;

            ${media.laptop`
				margin-top:50px;
				font-size:10rem;
			`}

            ${media.phone`
				font-size:6rem;
				letter-spacing:-4px;
			`}
        }

        li {
            cursor: pointer;
            background-image: linear-gradient(
                    90deg,
                    rgb(174 26 194 / 73%) 0%,
                    rgb(89 19 99 / 35%) 26%,
                    rgb(61 0 90 / 71%) 45%,
                    rgb(126 7 192 / 3%) 50%,
                    rgb(37 93 144 / 5%) 50%,
                    rgb(0 151 255 / 27%) 60%,
                    rgb(0 255 100 / 11%) 60%,
                    rgb(7 252 8 / 31%) 70%,
                    rgb(224 234 0 / 20%) 70%,
                    rgb(234 205 0 / 55%) 80%,
                    rgb(255 170 0 / 26%) 80%,
                    rgb(255 148 0 / 58%) 90%,
                    rgb(255 0 0 / 31%) 90%,
                    rgb(255 0 0 / 51%) 100%,
                    rgb(220 0 255 / 0%) 100%
                ),
                linear-gradient(
                    104deg,
                    rgb(174 26 194 / 73%) 0%,
                    rgb(89 19 99 / 35%) 26%,
                    rgb(61 0 90 / 71%) 45%,
                    rgb(126 7 192 / 3%) 50%,
                    rgb(37 93 144 / 5%) 50%,
                    rgb(0 151 255 / 27%) 60%,
                    rgb(0 255 100 / 11%) 60%,
                    rgb(7 252 8 / 31%) 70%,
                    rgb(224 234 0 / 20%) 70%,
                    rgb(234 205 0 / 55%) 80%,
                    rgb(255 170 0 / 26%) 80%,
                    rgb(255 148 0 / 58%) 90%,
                    rgb(255 0 0 / 31%) 90%,
                    rgb(255 0 0 / 51%) 100%,
                    rgb(220 0 255 / 0%) 100%
                );
            border-radius: 150px;
            padding-right: 30px;
            margin: 10px;

            &:hover {
                background: rgba(255, 0, 255, 0.5);
            }

            a,
            div {
                display: flex;
                align-items: center;
                color: rgba(252, 224, 255, 0.9);

                img {
                    display: flex;
                    min-width: 300px;
                    border-radius: 50%;
                    aspect-ratio: 50/50;
                    //object-fit:cover;
                    border: 15px solid rgb(255, 0, 255);
                    margin-right: 10px;

                    ${media.laptop`min-width:200px; max-width:200px;`}
                    ${media.phone`min-width:125px; max-width:125px; border:8px solid rgb(255, 0, 255);`}
                }

                span {
                    font-family: "Londrina Solid", cursive;
                    font-size: 6rem;
                    line-height: 0.75;

                    ${media.laptop`font-size:4rem;`}
                    ${media.phone`font-size:3rem;`}
                }
            }

            ${media.laptop`margin:10px 30px;`}
            ${media.phone`margin:5px; padding-right:0`}
        }
    }
`;

export async function loader() {
    return { sponsors: await getSponsors() };
}

export default function SponsorsPage() {
    const { admin, setAdmin } = useContext(AdminContext);

    const [indx, setIndx] = useState(0);

    let navigate = useNavigate();

    let { sponsors } = useLoaderData();

    let sponsor = (i) => (e) => {
        setIndx(i);
        navigate("/sponsors/admin");
    };

    return (
        <>
            <Main>
                <ul>
                    <h1>
                        <ChangeChars
                            text="COMMUNITY SPONSORS"
                            min={0.5}
                            max={1}
                        />
                    </h1>
                    {
                        admin.status && <AdminNav {...{ navigate, add: '/sponsors/add', remove: '/sponsors/remove' }} />
                    }
                    {sponsors.map((s, i) => (
                        <li key={`srs${i}`}>
                            {admin.status ? (
                                <div onClick={sponsor(i)}>
                                    <img src={s.thumbnail} />
                                    <span>{s.title.toUpperCase()}</span>
                                </div>
                            ) : (
                                <a href={s.site} target={"_blank"}>
                                    <img src={s.thumbnail} />
                                    <span>{s.title.toUpperCase()}</span>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
                <Footer />
            </Main>
            <BackButton to={"/"} />
            <Outlet context={{ admin, setAdmin, sponsors, indx, setIndx }} />
        </>
    );
}
