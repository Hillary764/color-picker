import { useState } from "react";
import ColorSelector from "../ColorSelector/ColorSelector";
import { contrast } from "../../utilities/contrast";
import RatioCards from "../RatioCards/RatioCards";
import GreaterContrast from "../GreaterContrast/GreaterContrast";
import { rgbToHex } from "../../utilities/rgbToHex";
import ExampleText from "../ExampleText/ExampleText";

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

  const [contrastVal, setContrastVal] = useState(1);

  return (
    <div
      className={`relative p-1 flex justify-center items-center
        text-green-300
        before:absolute before:w-full before:h-full before:-z-10
        before:bg-linear-to-tr before:from-teal-500 before:to-green-400 before:rounded-md`}
    >
      <div className={`bg-slate-950 w-full rounded-md p-4`}>
        <h2 className={`text-xl`}>Check color contrast:</h2>
        <form
          className={`mt-2 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-linear-to-tr before:from-teal-500 before:to-green-400`}
        >
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="text-lg">Background color:</h3>
              <ColorSelector
                hexColor={bg}
                setHexColor={setBg}
                rgbMap={bgRGB}
                setRgbMap={(newRgbMap: RGBMap) => {
                  setBgRGB(newRgbMap);
                  setContrastVal(contrast(newRgbMap, textRGB));
                }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="text-lg">Foreground color:</h3>
              <ColorSelector
                hexColor={textColor}
                setHexColor={setTextColor}
                rgbMap={textRGB}
                setRgbMap={(newRgbMap: RGBMap) => {
                  setTextRGB(newRgbMap);
                  setContrastVal(contrast(bgRGB, newRgbMap));
                }}
              />
            </div>
          </div>
        </form>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-linear-to-tr before:from-teal-500 before:to-green-400`}
        >
          <h3>Example text:</h3>
          <ExampleText color1={bg} color2={textColor} />
        </div>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-linear-to-tr before:from-teal-500 before:to-green-400`}
        >
          <h3 className="text-lg">Contrast:</h3>
          <p className="w-full m-0 text-8xl text-center">
            {contrastVal.toString().match(/^-?\d+(?:\.\d{0,2})?/)?.[0] ?? ""}
            :1
          </p>
        </div>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-linear-to-tr before:from-teal-500 before:to-green-400`}
        >
          <RatioCards ratio={contrast(bgRGB, textRGB)} />
        </div>
        <div
          className={`mt-8 pt-5 relative w-full
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-linear-to-tr before:from-teal-500 before:to-green-400`}
        >
          <h3>Suggested higher contrast colors</h3>
          <GreaterContrast
            rgb1={bgRGB}
            rgb2={textRGB}
            setValues={(rgb1, rgb2) => {
              setBgRGB(rgb1);
              setTextRGB(rgb2);
              setContrastVal(contrast(rgb1, rgb2));
              setBg(rgbToHex(rgb1.red, rgb1.green, rgb1.blue));
              setTextColor(rgbToHex(rgb2.red, rgb2.green, rgb2.blue));
            }}
          />
        </div>
      </div>
    </div>
  );
}
