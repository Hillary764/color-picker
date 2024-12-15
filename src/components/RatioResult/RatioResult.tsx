import { contrast } from "../../utilities/contrast";
import { calcWcagResult } from "../../utilities/wcagResults";
import { RGBMap } from "../ContrastPicker/ContrastPicker";

interface Props {
  rgb1: RGBMap;
  rgb2: RGBMap;
  standard: "largeText" | "smallText" | "UI";
}

export default function RatioResult({ rgb1, rgb2, standard }: Props) {
  const mainContrast = contrast(rgb1, rgb2);

  const wcagResult = calcWcagResult(mainContrast);

  return (
    <>
      <p>Contrast Value:</p>
      <p className={`text-6xl w-full text-center`}>
        {mainContrast.toString().match(/^-?\d+(?:\.\d{0,2})?/)?.[0] ?? ""}
      </p>
      <p>WCAG Rating:</p>
      <p className={`text-6xl w-full text-center`}>
        {standard == "UI"
          ? wcagResult.UIComponent
          : standard == "largeText"
          ? wcagResult.largeText
          : wcagResult.smallText}
      </p>
    </>
  );
}
