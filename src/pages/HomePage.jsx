import { useLoaderData, Outlet, NavLink } from "react-router-dom";
import { Main } from "./homePageStyles";
import Home from "./home/Home";

export async function loader() {
  return { showTitleId: "hello" };
}

export default function HomePage() {
  //const {showTitleId} = useLoaderData()

  return (
    <Main>
      <Home />
      <Outlet />
      <div className="nav-wrap">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "on" : "off")}
              to="/program"
              end
            >
              SHOWS
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "on" : "off")}
              to="/about"
              end
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "on" : "off")}
              to="/contact"
              end
            >
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "on" : "off")}
              to="/sponsors"
              end
            >
              SPONSORS
            </NavLink>
          </li>
        </ul>
      </div>
    </Main>
  );
}
