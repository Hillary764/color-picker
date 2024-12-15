import { suggestNewContrasts } from "../../utilities/contrastSuggestion";

import ColorSwatch from "../ColorSwatch/ColorSwatch";
import { RGBMap } from "../ContrastPicker/ContrastPicker";

interface Props {
  rgb1: RGBMap;
  rgb2: RGBMap;
  setValues: (rgb1: RGBMap, rgb2: RGBMap) => void;
}

export default function GreaterContrast({ rgb1, rgb2, setValues }: Props) {
  const newContrastOptions = (() => {
    const finalMap = [];
    let temp1 = rgb1;
    let temp2 = rgb2;

    for (let i = 0; i < 5; i++) {
      const newValues = suggestNewContrasts(temp1, temp2);
      const max = Math.min(newValues.rgb1.length, newValues.rgb2.length);

      for (let i = 0; i < max; i++) {
        finalMap.push({
          rgb1: newValues.rgb1[i],
          rgb2: newValues.rgb2[i],
        });
      }

      temp1 = newValues.rgb1[0];
      temp2 = newValues.rgb2[0];
    }

    return finalMap;
  })();

  return (
    <>
      <div
        className={`grid w-full 
        xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 auto-rows-auto
        gap-3`}
      >
        {newContrastOptions.map((option, index) => {
          return (
            <div
              key={`${option.rgb1.red}-${option.rgb1.green}-${option.rgb1.blue}-${index}`}
            >
              <div className="flex flex-row h-fit border-white border-2 ">
                <ColorSwatch
                  setColor={() => {
                    setValues(option.rgb1, rgb2);
                  }}
                  colorRgb={option.rgb1}
                />
                <ColorSwatch
                  setColor={() => {
                    setValues(rgb1, option.rgb2);
                  }}
                  colorRgb={option.rgb2}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
