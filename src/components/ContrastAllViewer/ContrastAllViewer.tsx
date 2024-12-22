import { useState } from "react";
import { RGBMap } from "../ContrastPicker/ContrastPicker";
import Card from "../Card/Card";
import ColorListAllContrast from "./ColorListAllContrast/ColorListAllContrast";
import BestContrastList from "./BestContrastInList/BestContrastInList";

export interface CombinedColorValue {
  hex: string;
  rgb: RGBMap;
}

interface Props {
  contrastList: CombinedColorValue[];
}

export default function ContrastAllViewer({ contrastList }: Props) {
  const [windowIndex, setWindowIndex] = useState(0);

  function getWindow(index: number) {
    switch (index) {
      case 0:
        return <ColorListAllContrast contrastList={contrastList} />;

      case 1:
        return <BestContrastList contrastList={contrastList} />;

      default:
        return null;
    }
  }

  return (
    <div className="my-3">
      <h2 className="mb-5">Select an analyzer</h2>
      <div className="flex flex-row flex-wrap gap-5">
        <Card
          className={`${
            windowIndex == 0
              ? `[&>div]:bg-gradient-to-tr
               [&>div]:from-teal-500 [&>div]:to-green-400 [&>div]:text-slate-950 `
              : ``
          }`}
        >
          <button
            onClick={() => {
              setWindowIndex(0);
            }}
            className="mx-4 text-xl font-bold"
          >
            All ratios
          </button>
        </Card>
        <Card
          className={`${
            windowIndex == 1
              ? `[&>div]:bg-gradient-to-tr
               [&>div]:from-teal-500 [&>div]:to-green-400 [&>div]:text-slate-950 `
              : ``
          }`}
        >
          <button
            onClick={() => {
              setWindowIndex(1);
            }}
            className="mx-4 text-xl font-bold"
          >
            Best Ratios
          </button>
        </Card>
      </div>
      <div>{getWindow(windowIndex)}</div>
    </div>
  );
}
