import { useState, useRef, useEffect } from "react";
import { pullProminentColors } from "../../utilities/imgColors";
import ImgCanvas from "./ImgCanvas/ImgCanvas";

interface Props {
  addColor: (hex: string) => void;
}

export default function ImgCalculator({ addColor }: Props) {
  const [inputVal, setInputVal] = useState<null | FileList>(null);
  const [numToExtract, setNumToExtract] = useState(0);
  const [autoHexes, setAutoHexes] = useState<string[]>([]);
  const [groupVal, setGroupVal] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputVal?.[0]) {
      pullProminentColors(
        numToExtract,
        URL.createObjectURL(inputVal[0]),
        groupVal
      ).then((result) => {
        console.log(result);
        setAutoHexes(result ? result : []);
      });
    }
  }, [inputVal, numToExtract, groupVal]);

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
          <ImgCanvas icon={inputVal[0]} addColor={addColor} />

          <p className="max-w-lg my-5">
            You may try extracting a palette automatically. There are some
            settings you may adjust to generate the palette. Note: This may not
            produce 100% accurate results. The results will be calculated based
            on your settings, so they may also change as you adjust your
            settings.
          </p>
          <label>
            Select number of colors to extract:
            <input
              value={numToExtract}
              onChange={(e) => {
                const updated = e.target.value.replace(/\D/g, "");
                if (isNaN(Number.parseInt(updated))) {
                  return;
                }
                setNumToExtract(Number.parseInt(updated));
              }}
              className="rounded px-2 bg-slate-900 border-2 border-green-400 ml-2"
              type="number"
            />
          </label>
          <p className="max-w-lg my-5">
            You can change the strictness of the extraction. If you set the
            value to 1, the program will compare every single color in the
            image. This means each individual color will be considered, and more
            accurate results will be displayed. If you set the value to
            something higher, like 30 or 40, similar colors will be combined
            into one entry. This may result in less accurate results, but it
            will likely result in more contrast between colors.
          </p>
          <label>
            Select strictness{" "}
            <input
              type="number"
              className="rounded px-2 bg-slate-900 border-2 border-green-400 ml-2"
              value={groupVal}
              onChange={(e) => {
                if (!Number.isNaN(Number.parseInt(e.target.value))) {
                  setGroupVal(Math.max(Number.parseInt(e.target.value), 0));
                }
              }}
            />
          </label>

          <p>Current auto-extracted palette:</p>
          <div className="flex flex-row flex-wrap">
            {autoHexes?.map((item, index) => (
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
