import Card from "../Card/Card";
import { RGBMap } from "../ContrastPicker/ContrastPicker";
import {
  IconContrastResults,
  suggestIconContrasts,
} from "../../utilities/contrastSuggestion";
import ColorSwatch from "../ColorSwatch/ColorSwatch";

interface Props {
  bgRGB: RGBMap;
  setBg: (map: RGBMap) => void;

  strokeRGB: RGBMap;
  setStroke: (map: RGBMap) => void;
  fillRGB: RGBMap;
  setFill: (map: RGBMap) => void;
}

export default function IconSuggestions({
  bgRGB,
  strokeRGB,
  fillRGB,
  setBg,
  setStroke,
  setFill,
}: Props) {
  //   const suggestions = suggestIconContrasts(bgRGB, strokeRGB, fillRGB);

  const allSuggestions = (() => {
    const finalSuggestions: IconContrastResults = {
      bg: [],
      stroke: [],
      fill: [],
    };

    let currVals = {
      bg: bgRGB,
      stroke: strokeRGB,
      fill: fillRGB,
    };

    for (let i = 0; i < 3; i++) {
      const currSuggestions = suggestIconContrasts(
        currVals.bg,
        currVals.stroke,
        currVals.fill
      );

      finalSuggestions.bg.push(...currSuggestions.bg);
      finalSuggestions.stroke.push(...currSuggestions.stroke);
      finalSuggestions.fill.push(...currSuggestions.fill);

      currVals = {
        bg: currSuggestions.bg[0],
        stroke: currSuggestions.stroke[0],
        fill: currSuggestions.fill[0],
      };
    }

    return finalSuggestions;
  })();

  const maxCount = Math.min(
    allSuggestions.bg.length,
    allSuggestions.fill.length,
    allSuggestions.stroke.length
  );

  const suggestionsMap = (() => {
    const itemsMap: JSX.Element[] = [];

    for (let i = 0; i < maxCount; i++) {
      itemsMap.push(
        <div
          className="w-full m-2 grid grid-cols-3 border-2 border-green-300"
          key={`suggestion-colors-${i}-${allSuggestions.bg[i].blue}`}
        >
          <ColorSwatch
            setColor={() => {
              setBg(allSuggestions.bg[i]);
            }}
            colorRgb={allSuggestions.bg[i]}
          />

          <ColorSwatch
            setColor={() => {
              setStroke(allSuggestions.stroke[i]);
            }}
            colorRgb={allSuggestions.stroke[i]}
          />

          <ColorSwatch
            setColor={() => {
              setFill(allSuggestions.fill[i]);
            }}
            colorRgb={allSuggestions.fill[i]}
          />
        </div>
      );
    }

    return itemsMap;
  })();

  return (
    <Card className="mt-5">
      <h2 className="text-2xl">Higher-contrast Suggestions:</h2>
      <div>{suggestionsMap}</div>
    </Card>
  );
}
