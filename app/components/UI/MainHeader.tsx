import { NavLink } from "@remix-run/react";
import { FC } from "react"

interface MainHeaderProps {
    isLoggedOn: boolean
};

const MainHeader: FC<MainHeaderProps> = ({ isLoggedOn }) => {

    return (<nav className="header" >
        <ul>
            <li>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "header-active" : ""} >Home</NavLink>
            </li>
            {isLoggedOn && <li>
                <NavLink to={"/profile"} className={({ isActive }) => isActive ? "header-active" : ""}>Profile</NavLink>
            </li>}
        </ul>
    </nav>);
};

export default MainHeader;