import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../utilities/AuthProvider";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utilities/firebaseInit";
import HeaderSidebar from "./HeaderSidebar/HeaderSidebar";

export default function Header() {
  const user = useContext(UserContext);

  return (
    <header
      className={`w-full h-fit p-4
        flex flex-row justify-between flex-wrap
        bg-gradient-to-tr from-teal-500 to-green-400 text-slate-950`}
    >
      <p className="text-lg">Contrast Picker</p>
      <div className="flex flex-row flex-wrap gap-3">
        <nav className="flex flex-row flex-wrap gap-3 items-center">
          <Link
            className={`relative before:absolute before:bottom-0 before:left-0 before:h-px before:w-0
          before:bg-slate-950 hover:before:w-full before:transition-[width]`}
            to={"/"}
          >
            Text Contrast
          </Link>
          <div className="h-2/3 w-0 rounded border-l-2 border-black" />
          <Link
            className={`relative before:absolute before:bottom-0 before:left-0 before:h-px before:w-0
          before:bg-slate-950 hover:before:w-full before:transition-[width]`}
            to="/icons"
          >
            Icon Contrast
          </Link>
          <div className="h-2/3 w-0 rounded border-l-2 border-black" />
          <Link
            className={`relative before:absolute before:bottom-0 before:left-0 before:h-px before:w-0
          before:bg-slate-950 hover:before:w-full before:transition-[width]`}
            to="/palette-compare"
          >
            Compare Palette Colors
          </Link>
        </nav>{" "}
        {user ? (
          <div className="self-center">{user.displayName}</div>
        ) : (
          <button
            onClick={() => {
              signInWithPopup(auth, provider);
            }}
            className={`relative mx-2 block px-7 py-0.5 rounded-lg bg-slate-950 text-green-300 self-center`}
          >
            Login
          </button>
        )}
        <div className="relative">
          <HeaderSidebar />
        </div>
      </div>
    </header>
  );
}
