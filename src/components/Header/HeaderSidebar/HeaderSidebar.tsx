import { NavLink } from "react-router";
import Sidebar from "../../Sidebar/Sidebar";

export default function HeaderSidebar() {
  return (
    <Sidebar>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
      </nav>
    </Sidebar>
  );
}
