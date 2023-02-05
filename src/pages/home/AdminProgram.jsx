import { useContext, useState } from "react";
import {
    useLoaderData,
    useNavigate,
    Link,
    Outlet,
    useOutletContext,
} from "react-router-dom";
import { Main, Day, Time, Listing } from "./adminProgramStyles";
import { GlobalStyles } from "../../components/GlobalStyles";
import { AdminContext } from "../../utils/AdminState";
import { ShowTimeContext } from "../../utils/ShowTimeState";
import { getShowTitleId } from "../../utils/loaders";
import { updateProgram } from "../../utils/actions";
import BackButton from "../../components/buttons/BackButton";

let times = [
    { time: "6", label: "06:00/AM" },
    { time: "7", label: "07:00/AM" },
    { time: "8", label: "08:00/AM" },
    { time: "9", label: "09:00/AM" },
    { time: "10", label: "10:00/AM" },
    { time: "11", label: "11:00/AM" },
    { time: "12", label: "12:00/PM" },
    { time: "13", label: "01:00/PM" },
    { time: "14", label: "02:00/PM" },
    { time: "15", label: "03:00/PM" },
    { time: "16", label: "04:00/PM" },
    { time: "17", label: "05:00/PM" },
    { time: "18", label: "06:00/PM" },
    { time: "19", label: "07:00/PM" },
    { time: "20", label: "08:00/PM" },
    { time: "21", label: "09:00/PM" },
    { time: "22", label: "10:00/PM" },
];

export async function loader() {
    return { showTitleId: await getShowTitleId() };
}

export default function AdminProgram() {
    const { admin, setAdmin } = useContext(AdminContext);

    const { programColl, setProgramColl, selectedDay } =
        useContext(ShowTimeContext);

    let navigate = useNavigate();

    let { AdminUpdateToday } = useOutletContext();

    const [day, setDay] = useState(selectedDay);
    const [dayHistory, setDayHistory] = useState({
        [programColl[day].day]: programColl[day].hosts.map((sho, _, arr) => ({
            ...sho, // will be cleaned
            selected: {}, //set init obj for css selection changes
            origVals: {
                title: sho.title,
                time: sho.time,
                numShows: arr.length,
            }, // set init obj for original values
        })),
    });

    const { showTitleId } = useLoaderData();

    let onTime = (i) => (e) => {
        e.preventDefault();

        let newTime = times[e.target.value].time;

        let newtimeday = () =>
            dayHistory[programColl[day].day]
                .map((sho, j) =>
                    i === j
                        ? {
                              ...sho,
                              slot: e.target.value,
                              time: newTime,
                              selected:
                                  newTime !== sho.origVals.time
                                      ? {
                                            ...sho.selected,
                                            [sho.origVals.time]: true,
                                        }
                                      : {
                                            ...sho.selected,
                                            [sho.origVals.time]: false,
                                        },
                          }
                        : sho
                )
                .sort((a, b) => a.slot - b.slot);

        setDayHistory((state) => ({
            ...state,
            [programColl[day].day]: newtimeday(),
        }));
    };

    let onTitle = (i) => (e) => {
        e.preventDefault();

        let newtitle = e.target.value;
        let new_id = showTitleId.filter((s) => s.title === e.target.value);
        let newtitleday = () =>
            dayHistory[programColl[day].day].map((sho, j) =>
                i === j
                    ? {
                          ...sho,
                          show_id: new_id[0]._id.toString(),
                          title: newtitle,
                          selected:
                              newtitle !== sho.origVals.title
                                  ? {
                                        ...sho.selected,
                                        [sho.origVals.title]: true,
                                    }
                                  : {
                                        ...sho.selected,
                                        [sho.origVals.title]: false,
                                    },
                      }
                    : sho
            );

        setDayHistory((state) => ({
            ...state,
            [programColl[day].day]: newtitleday(),
        }));
    };

    let saveBtn = () => {
        let activeDay = false;

        for (let hday in dayHistory) {
            let origDayLen =
                programColl[programColl.findIndex((pc) => pc.day === hday)]
                    .hosts.length;

            if (
                dayHistory[hday].some(
                    (d) =>
                        d.selected[d.origVals.title] ||
                        d.selected[d.origVals.time]
                ) ||
                (dayHistory[hday].length !== origDayLen && origDayLen > 0)
            ) {
                activeDay = true;
            }
        }

        return activeDay ? (
            <div className="save-btn-on" onClick={saveDays}>
                SAVE ALL CHANGES!
            </div>
        ) : (
            <div className="save-btn-off">NOTHING TO SAVE</div>
        );
    };

    let saveDays = async (e) => {
        e.preventDefault();

        let dayhistory = { ...dayHistory };
        let cleanDayHistory = {};

        for (const day in dayhistory) {
            //take out no change days and selected:{}

            if (
                dayhistory[day].some(
                    (m) =>
                        m.selected[m.origVals.title] || //changed title or time
                        m.selected[m.origVals.time]
                ) ||
                dayhistory[day].length !== dayhistory[day][0]?.origVals.numShows // added or removed a show
            ) {
                cleanDayHistory = {
                    ...cleanDayHistory,
                    [day]: dayhistory[day].map((d) => {
                        let s = { ...d };
                        delete s.selected;
                        delete s.origVals;
                        return s;
                    }),
                };
            }
        }

        addUpdateDeleteProgram(cleanDayHistory);
    };

    let addShow = (e) => {
        e.preventDefault();

        let dayStr = programColl[day].day;
        let sho = programColl[day].hosts;
        let addedShow = {
            title: sho[0]?.title || "untitled",
            slot: sho[0]?.slot || "0",
            time: sho[0]?.time || "6",
            show_id: sho[0]?.show_id || "unchanged",
            selected: {},
            origVals: {
                title: sho[0]?.title || "new show",
                time: sho[0]?.time || 6,
                numShows: sho.length || dayHistory[day]?.hosts.length,
            },
        };

        setDayHistory((state) => ({
            ...state,
            [dayStr]: [...state[dayStr], addedShow].sort(
                (a, b) => a.slot - b.slot
            ),
        }));
    };

    let removeShow = (i) => (e) => {
        e.preventDefault();

        let dayStr = programColl[day].day;

        setDayHistory((state) => ({
            ...state,
            [dayStr]: state[dayStr].filter((_, j) => j !== i),
        }));
    };

    let addUpdateDeleteProgram = async (data) => {
        let { result, days, shows } = await updateProgram(data);

        if (result.length && result.some((r) => r.modifiedCount === 1)) {
            setProgramColl(
                programColl.map((d) =>
                    days.some((sd) => d.day === sd)
                        ? { ...d, hosts: shows[days.indexOf(d.day)] }
                        : d
                )
            );

            AdminUpdateToday(day, shows)
            navigate("/program")
        } else {
            console.log("nothing was updated")
        }
    };

    return (
        <>
            {admin.status && (
                <>
                    <Main>
                        <GlobalStyles bodyScrollOff={true} />
                        <h2>UPDATE THE PROGRAM</h2>
                        <ul className="days">
                            {programColl
                                .map((show) => show.day)
                                .map((d, i) => (
                                    <Day
                                        key={`days${i}`}
                                        selected={i === day}
                                        onClick={() => {
                                            let newday = programColl[i];
                                            let newhosts = newday.hosts.map(
                                                (sho, _, arr) => ({
                                                    ...sho,
                                                    selected: {}, //set dirty
                                                    origVals: {
                                                        title: sho.title,
                                                        time: sho.time,
                                                        numShows: arr.length,
                                                    }, //set dirty
                                                })
                                            );
                                            setDay(i);
                                            setDayHistory((state) => ({
                                                ...state,
                                                [newday.day]: state[newday.day]
                                                    ? state[newday.day]
                                                    : [...newhosts],
                                            }));
                                        }}
                                    >
                                        {d.toUpperCase()}
                                    </Day>
                                ))}
                        </ul>
                        <div className="day-wrap">
                            <div className="admin-btns">
                                <Link to="/program/admin-program/add-show">
                                    CREATE A NEW SHOW
                                </Link>
                                {saveBtn()}
                                <Link to="/program/admin-program/remove-show">
                                    DELETE A SHOW
                                </Link>
                            </div>
                            <div className="add-show" onClick={addShow}>
                                ADD NEW ENTRY
                            </div>
                            {dayHistory[programColl[day].day].map(
                                (dayshow, i) => (
                                    <Listing
                                        selected={
                                            dayshow.selected[
                                                dayshow.origVals.title
                                            ]
                                        } //need delete and add
                                        key={`ap${i}`}
                                    >
                                        <Time
                                            selected={
                                                dayshow.selected[
                                                    dayshow.origVals.time
                                                ]
                                            }
                                        >
                                            <p>
                                                {dayshow.selected[
                                                    dayshow.origVals.time
                                                ] &&
                                                    `Old time: (${dayshow.origVals.time})`}
                                            </p>
                                            <select
                                                onChange={onTime(i)}
                                                value={dayshow.slot}
                                            >
                                                {times.map((time, j) => (
                                                    <option
                                                        key={`time${j}`}
                                                        value={j}
                                                    >
                                                        {time.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </Time>
                                        <div className="title">
                                            <p>
                                                {dayshow.selected[
                                                    dayshow.origVals.title
                                                ] &&
                                                    `Old title: (${dayshow.origVals.title})`}
                                            </p>
                                            <select
                                                onChange={onTitle(i)}
                                                value={dayshow.title}
                                            >
                                                {showTitleId.map((show, k) => (
                                                    <option
                                                        key={`keyp${k}`}
                                                        value={show.title}
                                                    >
                                                        {show.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <span onClick={removeShow(i)}>
                                            {!dayshow.selected[
                                                dayshow.origVals.title
                                            ] &&
                                                !dayshow.selected[
                                                    dayshow.origVals.time
                                                ] &&
                                                "X"}
                                        </span>
                                    </Listing>
                                )
                            )}
                        </div>
                        <BackButton to={"/program"} />
                    </Main>
                    <Outlet
                        context={{
                            showTitleId,
                            showsData: programColl[day].hosts[0] || {},
                            admin,
                            setAdmin,
                        }}
                    />
                </>
            )}
        </>
    );
}
