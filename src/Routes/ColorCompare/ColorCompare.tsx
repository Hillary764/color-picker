import { useState } from "react";
import Card from "../../components/Card/Card";
import { RGBMap } from "../../components/ContrastPicker/ContrastPicker";
import ContrastAllViewer, {
  CombinedColorValue,
} from "../../components/ContrastAllViewer/ContrastAllViewer";
import ColorSelector from "../../components/ColorSelector/ColorSelector";

export default function ColorCompareScreen() {
  const [colors, setColors] = useState<CombinedColorValue[]>([
    {
      hex: "#000000",
      rgb: {
        red: 0,
        green: 0,
        blue: 0,
      },
    },
  ]);

  function addColor() {
    setColors((state) => {
      return [
        ...state,
        {
          hex: "#000000",
          rgb: {
            red: 0,
            green: 0,
            blue: 0,
          },
        },
      ];
    });
  }

  function removeColor(index: number) {
    setColors((state) => {
      const temp = [...state];
      temp.splice(index, 1);
      return temp;
    });
  }

  // function updateColor(hex: string, rgb: RGBMap, index: number) {
  //   if (index >= 0 && index < colors.length) {
  //     setColors((state) => {
  //       const temp2 = [...state];
  //       temp2[index] = {
  //         hex: hex,
  //         rgb: rgb,
  //       };
  //       return temp2;
  //     });
  //   }
  // }

  return (
    <>
      <Card className="m-10 [&>div]:p-5">
        <h1>Compare Color Values</h1>
      </Card>

      <Card className="m-10">
        <h2>Select Colors</h2>
        <div className="pt-4">
          <button
            onClick={() => {
              addColor();
            }}
          >
            Add Swatch
          </button>
        </div>
      </Card>
      <div className={`m-10`}>
        <Card className="">
          <h2>Current Swatches</h2>
          <h3>All swatches:</h3>

          <div className="flex flex-row flex-wrap gap-2 sticky top-2">
            {colors.map((item, index) => (
              <div
                className={`max-w-fit py-2 px-4 border-green-300 border-2`}
                style={{
                  backgroundColor: item.hex,
                }}
                key={`quick-swatch-${index}-${item.hex}`}
              >
                <p className="px-2 py-1 bg-slate-950 rounded">{item.hex}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {colors.map((item, index) => (
              <div key={`${index}`}>
                <h3 className="my-4">
                  Color Number {index + 1}{" "}
                  <button
                    onClick={() => {
                      removeColor(index);
                    }}
                    type="button"
                    className={`px-2 py-0.5 rounded-md ml-4 border-2 border-green-400`}
                  >
                    X
                  </button>
                </h3>

                <div
                  className="w-full h-12 p-5 rounded-md"
                  style={{
                    backgroundColor: item.hex,
                  }}
                ></div>
                <div className="my-5">
                  <ColorSelector
                    hexColor={colors[index].hex}
                    rgbMap={colors[index].rgb}
                    setHexColor={(hex: string) => {
                      const temp = [...colors];
                      temp[index].hex = hex;
                      setColors(temp);
                    }}
                    setRgbMap={(rgb: RGBMap) => {
                      const temp = [...colors];
                      temp[index].rgb = rgb;
                      setColors(temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="m-10">
        <h2>Contrast Calculations</h2>
        <ContrastAllViewer contrastList={colors} />
      </Card>
    </>
  );
}
