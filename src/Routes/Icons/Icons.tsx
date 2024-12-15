import { useState } from "react";
import Card from "../../components/Card/Card";
import { RGBMap } from "../../components/ContrastPicker/ContrastPicker";
import ColorSelector from "../../components/ColorSelector/ColorSelector";
import RatioResult from "../../components/RatioResult/RatioResult";
import IconSuggestions from "../../components/IconSuggestions/IconSuggestions";
import { rgbToHex } from "../../utilities/rgbToHex";

export default function IconsScreen() {
  const [bg, setBg] = useState("#000000");
  const [bgRGB, setBgRGB] = useState<RGBMap>({
    red: 0,
    green: 0,
    blue: 0,
  });

  const [stroke, setStroke] = useState("#000000");
  const [strokeRGB, setStrokeRGB] = useState<RGBMap>({
    red: 0,
    green: 0,
    blue: 0,
  });

  const [fill, setFill] = useState("#000000");
  const [fillRGB, setFillRGB] = useState<RGBMap>({
    red: 0,
    green: 0,
    blue: 0,
  });

  return (
    <>
      <Card className="m-10 [&>div]:p-5">
        <h1 className="w-full text-center py-5 text-4xl">Test Icon Colors</h1>{" "}
        <p className="text-green-300 text-lg max-w-xl mx-auto text-center mb-10">
          Icon contrast is slightly less strict than text contrast, only
          requiring a contrast of 3:1. In text, you must check the contrast
          between the background and text color. In icons, you must check the
          contrast between <em>any adjacent colors.</em>
        </p>
      </Card>

      <div className={`gap-5 grid grid-cols-1 lg:grid-cols-2 px-5`}>
        <div className="h-full">
          <Card
            className={`[&>div]:p-5 [&>div]:flex [&>div]:flex-col
            [&>div]:justify-center [&>div]:items-center
            sticky top-10`}
          >
            <h2 className="mb-3 text-2xl">Icon Example Preview</h2>
            <div
              className={`border-2 border-green-300 w-56 h-56 p-3`}
              style={{
                backgroundColor: bg,
              }}
            >
              <svg viewBox="0 0 116.654 116.654">
                <g id="layer1" transform="translate(25.193623,-69.474262)">
                  <circle
                    style={{
                      fill: stroke,
                    }}
                    //    style="fill:#008000;stroke-width:1.296;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke"
                    id="path342"
                    cy="127.80126"
                    cx="33.133377"
                    r="58.327"
                  />
                  <circle
                    style={{
                      fill: fill,
                    }}
                    id="path342-3"
                    cy="127.80126"
                    cx="33.133377"
                    r="45"
                  />
                  <circle
                    style={{
                      fill: stroke,
                    }}
                    id="path342-3-8"
                    cy="127.80126"
                    cx="33.133377"
                    r="25"
                  />
                </g>
              </svg>
            </div>
          </Card>
          <div className="flex-1 h-full"> </div>
        </div>
        <div>
          <Card className={`[&>div]:p-5`}>
            <h2 className="text-2xl">Select Colors</h2>
            <h3
              className={`text-lg relative pt-5 mt-5 before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
            >
              Main background color:
            </h3>
            <ColorSelector
              hexColor={bg}
              setHexColor={setBg}
              rgbMap={bgRGB}
              setRgbMap={setBgRGB}
            />
            <h3
              className={`text-lg relative pt-5 mt-5 before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
            >
              Border color:
            </h3>
            <ColorSelector
              hexColor={stroke}
              setHexColor={setStroke}
              rgbMap={strokeRGB}
              setRgbMap={setStrokeRGB}
            />
            <h3
              className={`text-lg relative pt-5 mt-5 before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
            >
              Icon fill color:
            </h3>
            <ColorSelector
              hexColor={fill}
              setHexColor={setFill}
              rgbMap={fillRGB}
              setRgbMap={setFillRGB}
            />
          </Card>
          <Card className={`[&>div]:p-5 mt-5`}>
            <h2 className="text-2xl">Calculated Contrast</h2>
            <h3
              className={`text-lg relative pt-5 mt-5 before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
            >
              Background and Border:
            </h3>
            <RatioResult standard="UI" rgb1={bgRGB} rgb2={strokeRGB} />
            <div
              className={`w-full h-24 border-2 border-green-300 rounded
                grid grid-cols-2 mt-2`}
            >
              <div
                style={{
                  backgroundColor: bg,
                }}
              />
              <div
                style={{
                  backgroundColor: stroke,
                }}
              />
            </div>
            <h3
              className={`text-lg relative pt-5 mt-5 before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
            >
              Border and Fill:
            </h3>
            <RatioResult standard="UI" rgb1={fillRGB} rgb2={strokeRGB} />
            <div
              className={`w-full h-24 border-2 border-green-300 rounded
                grid grid-cols-2 mt-2`}
            >
              <div
                style={{
                  backgroundColor: fill,
                }}
              />
              <div
                style={{
                  backgroundColor: stroke,
                }}
              />
            </div>
          </Card>
          <IconSuggestions
            bgRGB={bgRGB}
            strokeRGB={strokeRGB}
            fillRGB={fillRGB}
            setBg={(map) => {
              setBgRGB(map);
              setBg(rgbToHex(map.red, map.green, map.blue));
            }}
            setFill={(map) => {
              setFillRGB(map);
              setFill(rgbToHex(map.red, map.green, map.blue));
            }}
            setStroke={(map) => {
              setStrokeRGB(map);
              setStroke(rgbToHex(map.red, map.green, map.blue));
            }}
          />
        </div>
      </div>
    </>
  );
}
