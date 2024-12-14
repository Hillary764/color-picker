import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RGBMap } from "../ContrastPicker/ContrastPicker";
import { hexToRgb } from "../../utilities/hexToRgb";
import { rgbToHex } from "../../utilities/rgbToHex";

interface Props {
  hexColor: string;
  rgbMap: RGBMap;
  setHexColor: Dispatch<SetStateAction<string>>;
  setRgbMap: Dispatch<SetStateAction<RGBMap>>;
}

export default function ColorSelector({
  hexColor,
  rgbMap,
  setHexColor,
  setRgbMap,
}: Props) {
  const [tempHex, setTempHex] = useState(hexColor);

  useEffect(() => {
    setTempHex(hexColor);
  }, [hexColor]);

  return (
    <div>
      <label className={`flex flex-row flex-wrap items-center gap-3`}>
        Select using color picker:{" "}
        <input
          className="border-green-300 border-2"
          value={hexColor}
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setRgbMap(
                hexToRgb(e.target.value) ?? {
                  red: 0,
                  green: 0,
                  blue: 0,
                }
              );
            }
            setHexColor(e.target.value);
          }}
          type="color"
        />
      </label>
      <label className="block m-2">
        Type hex value:{" "}
        <input
          value={tempHex}
          onChange={(e) => {
            const tempRGB = hexToRgb(e.target.value);
            if (tempRGB) {
              setRgbMap(tempRGB);
              setHexColor(e.target.value);
            }
            setTempHex(e.target.value);
          }}
          className={`bg-transparent border-2 border-green-300 m-2 px-2 py-1`}
          type="text"
        />
      </label>

      <p className="mb-2 w-full">{hexColor}</p>
      <label className={`block`}>
        Red:{" "}
        <input
          className={`bg-transparent border-2 border-green-300 m-2 px-2 py-1`}
          type="text"
          value={rgbMap.red.toString()}
          onChange={(e) => {
            let replaced = e.target.value.replace(/\D/g, "");
            if (replaced.length == 0) {
              replaced = "0";
            }
            const asInt = parseInt(replaced);
            const fixedInt = Math.max(0, Math.min(255, asInt));
            const newHex = rgbToHex(fixedInt, rgbMap.green, rgbMap.blue);
            setHexColor(newHex);
            setRgbMap((state) => {
              return {
                red: fixedInt,
                green: state.green,
                blue: state.blue,
              };
            });
          }}
        />
      </label>
      <label className={`block`}>
        Green:{" "}
        <input
          className={`bg-transparent border-2 border-green-300 m-2 px-2 py-1`}
          type="text"
          value={rgbMap.green.toString()}
          onChange={(e) => {
            let replaced = e.target.value.replace(/\D/g, "");
            if (replaced.length == 0) {
              replaced = "0";
            }
            const asInt = parseInt(replaced);
            const fixedInt = Math.max(0, Math.min(255, asInt));
            const newHex = rgbToHex(rgbMap.red, fixedInt, rgbMap.blue);
            setHexColor(newHex);
            setRgbMap((state) => {
              return {
                red: state.red,
                green: fixedInt,
                blue: state.blue,
              };
            });
          }}
        />
      </label>
      <label className={`block`}>
        Blue:{" "}
        <input
          className={`bg-transparent border-2 border-green-300 m-2 px-2 py-1`}
          type="text"
          value={rgbMap.blue.toString()}
          onChange={(e) => {
            let replaced = e.target.value.replace(/\D/g, "");
            if (replaced.length == 0) {
              replaced = "0";
            }
            const asInt = parseInt(replaced);
            const fixedInt = Math.max(0, Math.min(255, asInt));
            const newHex = rgbToHex(rgbMap.red, rgbMap.green, fixedInt);
            setHexColor(newHex);
            setRgbMap((state) => {
              return {
                red: state.red,
                green: state.green,
                blue: fixedInt,
              };
            });
          }}
        />
      </label>
    </div>
  );
}
