import { useContext } from "react";
import { Main } from "./showStyles";
import { useLoaderData, Outlet, useOutletContext } from "react-router-dom";
import { getShowsData } from "../../utils/loaders";
import AdminLinkBtn from "../../components/buttons/AdminLinkBtn";
import { AdminContext } from "../../utils/AdminState";
import { AudioContext } from "../../utils/AudioState";
import { ChangeChars } from "../../utils/springAnimations";
import BackButton from "../../components/buttons/BackButton"
import PlayBtn from "../../components/buttons/PlayBtn";

export async function loader({ params }) {
    return { showsData: await getShowsData(params.show), params };
}

export default function Show() {
    const { admin, setAdmin } = useContext(AdminContext)

	const {
		audioStream, 
		playerUrl, 
		playerPause, 
		setPlayerUrl, 
		setPlayerPause
	} = useContext(AudioContext)

    const { time, day } = useOutletContext()

    const { showsData, params } = useLoaderData()

    let {
        bgImage,
        mastHead,
        podcastTitle,
        podcastUrl,
        title,
        parOne,
        parTwo,
        audOne,
        audTwo,
        imgOne,
        imgTwo,
        linkDesc,
        linkUrl,
    } = showsData;

    //let outletToday = today.filter((t) => t.show_id === params.show) || 0;
    let getTime = Number(time);
    let hour = getTime <= 12 ? getTime : getTime - 12;

	let setPodUrl = (i) => (e) => {
		e.preventDefault()
		let pod = podcastUrl[i]
		console.log(pod)
	}

    return (
        <Main masthead={mastHead} bgImage={bgImage}>
			<div className="bg"></div>
            <div className="wrap">
                <div className="head-wrap">
                    <h2>
                        {" "}
                        ON {day.toUpperCase()} AT {hour?.toString()}:00 {" "}
                        {getTime < 12 ? "AM" : "PM"}:
                    </h2>
                    <h1>
                        {
                            <ChangeChars
                                text={title.toUpperCase()}
                                min={0.1}
                                max={1}
								bg
                            />
                        }{" "}
                    </h1>
                    {mastHead && <div className="mast-head"></div>}
                </div>
				{ 
					podcastTitle &&
					<div className="podcast-wrap">
						<ul className="pod-titles">
							{podcastTitle.split(",").map((title, i) => (
								<li 
								key={`${i}tl`}
								onClick={setPodUrl(i)}
								>
									<PlayBtn
										{...{
											playerUrl,
											setPlayerUrl,
											setPlayerPause,
											playerPause,
											audioStream
										}}
									/>
									{title}
								</li>
							))}
						</ul>
					</div>
				}
                {parOne && <p className="par">{parOne}</p>}
                {
					audOne || audTwo &&
					<div className="audio-wrap">
                    	<div>{audOne}</div>
                    	<div>{audTwo}</div>
                	</div>
				}
				{parTwo && <p className="par">{parTwo}</p>}
				<div className="img-txt-wrap">
					{imgOne && <img src={imgOne} />}
					{imgTwo && <img src={imgTwo} />}
				</div>
				{
					linkDesc &&
					<div className="links-wrap">
						<div>{linkDesc}</div>
						<div>{linkUrl}</div>
					</div>
				}
                <div className="margBottom" />
            </div>
            {admin.status && (
                <>
                    <AdminLinkBtn
                        {...{
                            admin: admin.show,
                            link: `/program/show/${params.show}/admin-show`,
                            setAdmin,
                            area: "show",
                        }}
                    />
                    <Outlet context={{ showsData, admin, setAdmin }} />
                </>
            )}
            <BackButton to={"/program"} />
        </Main>
    );
}
