import { useState } from "react";
import ColorSelector from "../ColorSelector/ColorSelector";
import { contrast } from "../../utilities/contrast";
import RatioCards from "../RatioCards/RatioCards";
import GreaterContrast from "../GreaterContrast/GreaterContrast";
import { rgbToHex } from "../../utilities/rgbToHex";

export interface RGBMap {
  red: number;
  green: number;
  blue: number;
}

export default function ContrastPicker() {
  const [bg, setBg] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");

  const [bgRGB, setBgRGB] = useState<RGBMap>({
    red: 0,
    green: 0,
    blue: 0,
  });
  const [textRGB, setTextRGB] = useState<RGBMap>({
    red: 0,
    green: 0,
    blue: 0,
  });

  return (
    <div
      className={`relative p-1 flex justify-center items-center
        text-green-300
        before:absolute before:w-full before:h-full before:-z-10
        before:bg-gradient-to-tr before:from-teal-500 before:to-green-400 before:rounded-md`}
    >
      <div className={`bg-slate-950 w-full rounded-md p-4`}>
        <h2 className={`text-xl`}>Check color contrast:</h2>
        <form
          className={`mt-2 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
        >
          <div className="flex flex-row gap-2">
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="text-lg">Background color:</h3>
              <ColorSelector
                hexColor={bg}
                setHexColor={setBg}
                rgbMap={bgRGB}
                setRgbMap={setBgRGB}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="text-lg">Foreground color:</h3>
              <ColorSelector
                hexColor={textColor}
                setHexColor={setTextColor}
                rgbMap={textRGB}
                setRgbMap={setTextRGB}
              />
            </div>
          </div>
        </form>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
        >
          <h3>Example text:</h3>
          <div
            className="m-8 p-5"
            style={{
              backgroundColor: bg,
              color: textColor,
            }}
          >
            <p className="text-5xl mb-2"> Lorem ipsum dolor sit amet ✔ ✗ ☺</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. ✔ ✗
              ☺
            </p>
          </div>
        </div>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
        >
          <h3 className="text-lg">Contrast:</h3>
          <p className="w-full m-0 text-8xl text-center">
            {contrast(bgRGB, textRGB)
              .toString()
              .match(/^-?\d+(?:\.\d{0,2})?/)?.[0] ?? ""}
            :1
          </p>
        </div>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
        >
          <RatioCards ratio={contrast(bgRGB, textRGB)} />
        </div>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
        >
          <h3>Suggested higher contrast colors</h3>
          <GreaterContrast
            rgb1={bgRGB}
            rgb2={textRGB}
            setValues={(rgb1, rgb2) => {
              setBgRGB(rgb1);
              setTextRGB(rgb2);
              setBg(rgbToHex(rgb1.red, rgb1.green, rgb1.blue));
              setTextColor(rgbToHex(rgb2.red, rgb2.green, rgb2.blue));
            }}
          />
        </div>
      </div>
    </div>
  );
}
