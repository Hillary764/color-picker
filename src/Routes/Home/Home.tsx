import ContrastPicker from "../../components/ContrastPicker/ContrastPicker";

export default function HomeScreen() {
  return (
    <>
      <div
        className={`m-10 relative p-1 flex justify-center items-center
        before:absolute before:w-full before:h-full before:-z-10
        before:bg-gradient-to-tr before:from-teal-500 before:to-green-400 before:rounded-md`}
      >
        <div className={`bg-slate-950 w-full rounded-md py-24`}>
          <h1
            className={`text-center w-full h-full text-green-300
            text-4xl `}
          >
            Home
          </h1>
        </div>
      </div>
      <div className="p-10">
        <ContrastPicker />
      </div>
    </>
  );
}
