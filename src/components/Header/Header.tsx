import { Link } from "react-router";

export default function Header() {
  return (
    <header
      className={`w-full h-fit p-4
        flex flex-row justify-between flex-wrap
        bg-gradient-to-tr from-teal-500 to-green-400 text-slate-950`}
    >
      <p className="text-lg">Contrast Picker</p>
      <nav className="flex flex-row flex-wrap gap-3 items-center">
        <Link
          className={`relative before:absolute before:bottom-0 before:left-0 before:h-px before:w-0
          before:bg-slate-950 hover:before:w-full before:transition-[width]`}
          to={"/"}
        >
          Home
        </Link>
        <div className="h-2/3 w-0.5 bg-black" />
        <Link
          className={`relative before:absolute before:bottom-0 before:left-0 before:h-px before:w-0
          before:bg-slate-950 hover:before:w-full before:transition-[width]`}
          to="/icons"
        >
          Icon Contrast
        </Link>
      </nav>
    </header>
  );
}
