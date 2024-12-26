import { useState, useRef, useEffect } from "react";
import { pullProminentColors } from "../../utilities/imgColors";
import { rgbToHex } from "../../utilities/rgbToHex";

interface Props {
  addColor: (hex: string) => void;
}

export default function ImgCalculator({ addColor }: Props) {
  const [inputVal, setInputVal] = useState<null | FileList>(null);
  const [numToExtract, setNumToExtract] = useState(0);
  const [autoHexes, setAutoHexes] = useState<string[]>([]);
  const [selectedHexes, setSelectedHexes] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputVal?.[0]) {
      pullProminentColors(numToExtract, URL.createObjectURL(inputVal[0])).then(
        (result) => {
          console.log(result);
          setAutoHexes(result ?? []);
        }
      );
    }
  }, [inputVal, numToExtract]);

  useEffect(() => {
    if (inputVal?.[0] && canvasRef.current) {
      const canvasImg = new Image();
      canvasImg.src = URL.createObjectURL(inputVal[0]);

      const context = canvasRef.current.getContext("2d");

      canvasImg.onload = () => {
        const natWidth = canvasImg.naturalWidth;
        const natHeight = canvasImg.naturalHeight;
        const natRatio = natHeight / natWidth;

        const maxH = window.innerHeight * 0.7;
        const maxW = window.innerWidth * 0.9;

        const maxWbyH = maxH / natRatio;
        const maxHbyW = maxW * natRatio;

        if (maxH < maxHbyW) {
          canvasImg.height = maxH;
          canvasImg.width = maxWbyH;
        } else {
          canvasImg.height = maxHbyW;
          canvasImg.width = maxW;
        }
        if (canvasRef.current) {
          canvasRef.current.width = canvasImg.width;
          canvasRef.current.height = canvasImg.height;
        }
        context?.drawImage(canvasImg, 0, 0, canvasImg.width, canvasImg.height);
      };
    }
  }, [inputVal]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-4"
    >
      <label>
        Input image:{" "}
        <input
          onChange={(e) => {
            setInputVal(e.target.files);
          }}
          accept="image/*"
          type="file"
        />
      </label>
      <p>image preview: </p>
      {inputVal && inputVal[0] ? (
        <div className="flex flex-col gap-3 items-center justify-center">
          {/* <img
            className="max-h-36 my-8"
            alt={`preview of ${inputVal[0].name}`}
            src={URL.createObjectURL(inputVal[0])}
          /> */}
          <canvas
            onClick={(e) => {
              const screenX = e.clientX;
              const screenY = e.clientY;
              console.log("event: ", screenX, screenY);
              if (canvasRef.current) {
                const canvasX = canvasRef.current.getBoundingClientRect().left;

                const canvasY = canvasRef.current.getBoundingClientRect().top;

                const x = screenX - canvasX;
                const y = screenY - canvasY;

                const canvasW = canvasRef.current.clientWidth;
                const canvasH = canvasRef.current.clientHeight;

                if (x <= canvasW && y <= canvasH) {
                  const context = canvasRef.current.getContext("2d");
                  const pixel = context?.getImageData(x, y, 1, 1).data;
                  console.log(`rgb(${pixel?.[0]},${pixel?.[1]},${pixel?.[2]})`);
                  if (pixel && pixel.length >= 3) {
                    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
                    setSelectedHexes((state) => {
                      if (!state.includes(hex)) {
                        return [...state, hex];
                      }
                      return state;
                    });
                    addColor(hex);
                  }
                }
              }
              //   console.log(x, y);
            }}
            className="[&>*]:object-contain"
            ref={canvasRef}
          >
            preview of{" "}
            {inputVal?.[0] ? inputVal[0].name : "current file selection"}
          </canvas>
          <p>
            Click on the image preview to select colors manually. This will
            likely yield the best result.
          </p>
          <div className="flex flex-row flex-wrap">
            {selectedHexes.map((item, index) => (
              <div
                className="min-w-20 px-5 py-4"
                key={`${item} -${index}-from-user-selection`}
                style={{
                  backgroundColor: item,
                }}
              >
                <p className="bg-slate-950 rounded text-center px-2 py-2">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p>
            You may have the program try to auto-extract your color palette.
            Note: this may not create 100% accurate results
          </p>
          <label>
            Select number of colors to extract:
            <input
              value={numToExtract}
              onChange={(e) => {
                const updated = e.target.value.replace(/\D/g, "");
                setNumToExtract(Number.parseInt(updated));
              }}
              className="rounded px-2 bg-slate-900 border-2 border-green-400 ml-2"
              type="number"
            />
          </label>
          <p>Current auto-extracted palette:</p>
          <div className="flex flex-row flex-wrap">
            {autoHexes.map((item, index) => (
              <div
                className="min-w-20 px-5 py-4"
                key={`${item} -${index}`}
                style={{
                  backgroundColor: item,
                }}
              >
                <p className="bg-slate-950 rounded text-center px-2 py-2">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                autoHexes.forEach((hexItem) => {
                  addColor(hexItem);
                });
              }}
            >
              Add extracted palette to list
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
