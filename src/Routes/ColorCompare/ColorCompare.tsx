import { useState } from "react";
import Card from "../../components/Card/Card";
import { RGBMap } from "../../components/ContrastPicker/ContrastPicker";
import ContrastAllViewer, {
  CombinedColorValue,
} from "../../components/ContrastAllViewer/ContrastAllViewer";
import ColorSelector from "../../components/ColorSelector/ColorSelector";
import ImgCalculator from "../../components/ImgCalculator/ImgCalculator";
import { hexToRgb } from "../../utilities/hexToRgb";

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

  const [useImg, setUseImg] = useState(false);

  const [showLongEditor, setShowLongEditor] = useState<boolean>(false);

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

  function hexEquality(oldVal: CombinedColorValue, hex2: string) {
    if (oldVal.hex == hex2) {
      return true;
    }
    return false;
  }

  function addByHex(hexVal: string) {
    const rgb = hexToRgb(hexVal);
    if (!rgb) {
      return;
    }

    setColors((state) => {
      if (state.some((element) => hexEquality(element, hexVal))) {
        return state;
      } else {
        return [
          ...state,
          {
            hex: hexVal,
            rgb: rgb,
          },
        ];
      }
    });
  }

  return (
    <>
      <Card className="m-10 [&>div]:p-5">
        <h1>Compare Color Values</h1>
      </Card>

      <Card className="m-10">
        <h2>Select Colors</h2>
        <div className="pt-4 flex flex-row flex-wrap gap-5">
          <button
            onClick={() => {
              setUseImg(false);
            }}
          >
            Add Swatches Individually
          </button>
          <button
            onClick={() => {
              setUseImg(true);
            }}
          >
            Add palette from image
          </button>
        </div>
      </Card>
      <div className={`m-10`}>
        {useImg ? (
          <Card className="mb-10">
            <h2 className="text-lg mb-4">Image selection form</h2>
            <p className="mb-4">
              This tool will attempt to extract a palette from an image. It may
              require some setup to properly extract the colors.
            </p>
            <ImgCalculator
              addColor={(hex) => {
                addByHex(hex);
              }}
            />
          </Card>
        ) : null}

        <Card className="">
          <h2>Current Swatches</h2>
          <button
            className={`my-4`}
            onClick={() => {
              addColor();
            }}
          >
            Add a new custom swatch
          </button>
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
          <div className="mt-6">
            <button
              onClick={() => {
                setShowLongEditor((state) => !state);
              }}
            >
              {showLongEditor
                ? "close detailed swatch editor"
                : "open detailed swatch editor"}
            </button>
          </div>
          {showLongEditor ? (
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
          ) : null}
        </Card>
      </div>
      <Card className="m-10">
        <h2>Contrast Calculations</h2>
        <ContrastAllViewer contrastList={colors} />
      </Card>
    </>
  );
}
