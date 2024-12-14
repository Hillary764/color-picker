import { suggestNewContrasts } from "../../utilities/contrastSuggestion";
import { rgbToHex } from "../../utilities/rgbToHex";
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
      <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 auto-rows-auto">
        {newContrastOptions.map((option, index) => {
          return (
            <div
              key={`${option.rgb1.red}-${option.rgb1.green}-${option.rgb1.blue}-${index}`}
            >
              <div className="flex flex-row w-fit h-fit border-white border-2 my-2">
                <div
                  className="flex-1 p-4 flex justify-center items-center"
                  style={{
                    backgroundColor: rgbToHex(
                      option.rgb1.red,
                      option.rgb1.green,
                      option.rgb1.blue
                    ),
                  }}
                >
                  <button
                    onClick={() => {
                      setValues(option.rgb1, rgb2);
                    }}
                    className="rounded-lg px-3 py-1 my-3 bg-slate-950"
                    type="button"
                  >
                    Select color
                  </button>
                </div>

                <div
                  className="flex-1 p-4   flex justify-center items-center"
                  style={{
                    backgroundColor: rgbToHex(
                      option.rgb2.red,
                      option.rgb2.green,
                      option.rgb2.blue
                    ),
                  }}
                >
                  <button
                    onClick={() => {
                      setValues(rgb1, option.rgb2);
                    }}
                    className="rounded-lg px-3 py-1 my-3 bg-slate-950"
                    type="button"
                  >
                    Select color
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
