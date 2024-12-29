import { useState, useRef, useEffect } from "react";
import { rgbToHex } from "../../../utilities/rgbToHex";

interface Props {
  icon: File;
  addColor: (hex: string) => void;
}

export default function ImgCanvas({ icon, addColor }: Props) {
  const [selectedHexes, setSelectedHexes] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });
  const [cursorLeft, setCursorLeft] = useState(0);
  const [cursorTop, setCursorTop] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorStep, setCursorStep] = useState(5);
  const [cursorPreview, setCursorPreview] = useState("");

  useEffect(() => {
    if (canvasRef.current) {
      const canvasImg = new Image();
      canvasImg.src = URL.createObjectURL(icon);

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
        setCanvasSize({
          width: canvasImg.width,
          height: canvasImg.height,
        });
        setCursorLeft(canvasImg.width / 2);
        setCursorTop(canvasImg.height / 2);
      };
    }
  }, [icon]);

  function updateCursorPreview(left: number, top: number) {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const pixel = context.getImageData(left, top, 1, 1).data;
        if (pixel && pixel.length >= 3) {
          const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
          setCursorPreview(hex ?? "");
        }
      }
    }
  }

  return (
    <>
      <div className="max-w-lg flex flex-col gap-4">
        <p className="text-lg font-bold">Keyboard controls:</p>
        <p>
          You may select colors manually using the keyboard. Focus the image
          canvas, then use arrow keys to move the cursor. Press tab to move
          focus to the current color output. You may then press shift-tab to
          return to the cursor.
        </p>
        <p>Some of the keyboard control settings may be adjusted below:</p>
        <form>
          <label>
            Cursor step {`(number of pixels to move each key press)`}
            <input
              className={`my-2 bg-slate-950 border-2 border-green-400 px-2 py-1`}
              type="number"
              value={cursorStep.toString()}
              onChange={(e) => {
                if (!Number.isNaN(Number.parseInt(e.target.value))) {
                  setCursorStep(Number.parseInt(e.target.value));
                }
              }}
            />
          </label>
        </form>
      </div>
      <div className="relative w-fit h-fit">
        <canvas
          tabIndex={0}
          onKeyDown={(e) => {
            switch (e.key) {
              case "ArrowDown":
                e.preventDefault();
                setCursorTop((state) =>
                  Math.min(state + cursorStep, canvasSize.height)
                );
                updateCursorPreview(
                  cursorLeft,
                  Math.min(cursorTop + cursorStep, canvasSize.height)
                );
                return;
              case "ArrowUp":
                e.preventDefault();
                setCursorTop((state) => Math.max(state - cursorStep, 0));
                updateCursorPreview(
                  cursorLeft,
                  Math.max(cursorTop - cursorStep, 0)
                );
                return;
              case "ArrowRight":
                e.preventDefault();
                setCursorLeft((state) =>
                  Math.min(state + cursorStep, canvasSize.width)
                );
                updateCursorPreview(
                  Math.min(cursorLeft + cursorStep, canvasSize.width),
                  cursorTop
                );
                return;
              case "ArrowLeft":
                e.preventDefault();
                setCursorLeft((state) => Math.max(state - cursorStep, 0));
                updateCursorPreview(
                  Math.max(cursorLeft - cursorStep, 0),
                  cursorTop
                );
                return;
              default:
                return;
            }
          }}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) {
              e.target.scrollIntoView();
              setShowCursor(true);
            }
          }}
          onBlur={() => {
            setShowCursor(false);
          }}
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
          className="[&>*]:object-contain relative"
          ref={canvasRef}
        >
          preview of {icon.name}
        </canvas>
        <div
          style={{
            left: cursorLeft,
            top: cursorTop,
            backgroundColor: cursorPreview,
          }}
          className={`${showCursor ? "absolute" : "hidden"} m-0 p-2
      border-4 border-black -translate-x-1/2 -translate-y-1/2
      before:p-3 before:border-4 before:border-white before:absolute
      before:-top-2 before:-left-2`}
        ></div>
      </div>

      <p>
        Click on the image preview to select colors manually. This will likely
        yield the best result.
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
            <p className="bg-slate-950 rounded text-center px-2 py-2">{item}</p>
          </div>
        ))}
      </div>
    </>
  );
}
