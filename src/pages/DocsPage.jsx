import { useContext, useState } from "react";
import { useLoaderData, Outlet, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import media from "../utils/media";
import { getDocuments } from "../utils/loaders";
import { ChangeChars } from "../utils/springAnimations";
import AdminNav from "../components/AdminNav";
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
    background-image: radial-gradient(
            circle at center top,
            rgb(153 26 194 / 84%) 0%,
            rgb(89 19 99 / 23%) 26%,
            rgb(61 0 90 / 24%) 45%,
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
            circle at center center,
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
            rgb(255 0 0 / 59%) 93%,
            rgb(220 0 255 / 0%) 93%
        ),
        linear-gradient(
            308deg,
            rgb(87 17 70 / 43%) 15%,
            rgb(255 0 170 / 13%) 95%
        ),
        url(/assets/docs/bookShelf.jpg);
    background-size: 30%;
    //background-size: cover;
    //background-repeat:
    padding-top: 30px;
    overflow-y: auto;

    ul {
        max-width: 1300px;

        h1 {
            text-align: center;
			background-clip: text;

            ${media.laptop`
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
                    50deg,
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
                    135deg,
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
            margin: 10px;
            padding: 10px 50px;

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

            ${media.phone`margin:5px; padding-right:0`}
        }
    }
`;

export async function loader() {
    return { docs: await getDocuments() };
}

export default function DocsPage() {

    const { admin, setAdmin } = useContext(AdminContext);

    const [indx, setIndx] = useState(0);

    let navigate = useNavigate();

    let { docs } = useLoaderData();

    let doc = (i) => (e) => {
        setIndx(i);
        navigate("/docs/admin");
    };

    return (
        <>
            <Main>
                <ul style={{marginBottom:"100px"}}>
                    <h1>
                        <ChangeChars text="DOCUMENTS" min={0.5} max={1} />
                    </h1>
					{
						admin.status && <AdminNav {...{navigate, add:'/docs/add', remove:'/docs/remove'}} />
                	}
                    {docs.map((s, i) => (
                        <li key={`dcs${i}`}>
                            {admin.status ? (
                                <div onClick={doc(i)}>
                                    <span>{s.description.toUpperCase()}</span>
                                </div>
                            ) : (
                                <a href={s.url} target={"_blank"}>
                                    <span>{s.description.toUpperCase()}</span>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </Main>
            <Outlet context={{ admin, docs, indx }} />
        </>
    );
}
