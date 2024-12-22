interface Props {
  color1: string;
  color2: string;
}

export default function ExampleText({ color1, color2 }: Props) {
  return (
    <div className="m-2 border-2 border-green-400 flex flex-row flex-wrap">
      <div className=" max-w-48 flex-1 flex flex-row flex-wrap">
        <div
          className="flex-1"
          style={{
            backgroundColor: color1,
          }}
        />{" "}
        <div
          className="flex-1"
          style={{
            backgroundColor: color2,
          }}
        />
      </div>
      <div
        className={`p-4 flex-1`}
        style={{
          backgroundColor: color1,
          color: color2,
        }}
      >
        <p className="text-5xl mb-2">Lorem ipsum dolor sit amet ✔ ✗ ☺</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. ✔ ✗ ☺
        </p>
      </div>
    </div>
  );
}
