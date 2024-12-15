export default function Header() {
  return (
    <header
      className={`w-full h-fit p-4
        flex flex-row justify-between flex-wrap
        bg-gradient-to-tr from-teal-500 to-green-400 text-slate-950`}
    >
      <p className="text-lg">Contrast Picker</p>
      <div></div>
    </header>
  );
}
