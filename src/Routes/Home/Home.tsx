import ContrastPicker from "../../components/ContrastPicker/ContrastPicker";

export default function HomeScreen() {
  return (
    <>
      <div
        className={`m-10 relative p-1 flex justify-center items-center text-green-300
        before:absolute before:w-full before:h-full before:-z-10
        before:bg-gradient-to-tr before:from-teal-500 before:to-green-400 before:rounded-md`}
      >
        <div className={`bg-slate-950 w-full rounded-md py-24`}>
          <h1
            className={`text-center w-full h-full
            text-4xl `}
          >
            Home
          </h1>
          <p className="w-full text-center mt-5">
            Welcome to Contrast Picker! This site is designed to help select
            accessible color combinations.
          </p>
        </div>
      </div>
      <div className="p-10">
        <ContrastPicker />
      </div>
    </>
  );
}
