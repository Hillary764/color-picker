import { useEffect, useState } from "react";
import { calcWcagResult, WcagResultMap } from "../../../utilities/wcagResults";
import { contrast } from "../../../utilities/contrast";

import RatioCards from "../../RatioCards/RatioCards";

import { CombinedColorValue } from "../ContrastAllViewer";
import ExampleText from "../../ExampleText/ExampleText";

interface ContrastItem {
  color1: string;
  color2: string;
  ratio: number;
  results: WcagResultMap;
}

interface Props {
  contrastList: CombinedColorValue[];
}

export default function ColorListAllContrast({ contrastList }: Props) {
  const [currColorIndex, setCurrColorIndex] = useState(0);

  useEffect(() => {
    if (currColorIndex >= contrastList.length) {
      setCurrColorIndex(0);
    }
  }, [contrastList, currColorIndex]);

  if (contrastList.length < 1) {
    return null;
  }

  function generateContrastRatiosForOneColor(index: number) {
    const myColor = contrastList[index] ?? null;
    if (!myColor) {
      return [];
    }

    const myContrastList: ContrastItem[] = [];

    contrastList.forEach((item, itemIndex) => {
      if (index != itemIndex) {
        const myContrast = contrast(item.rgb, myColor.rgb);
        const myWcag = calcWcagResult(myContrast);

        myContrastList.push({
          color1: myColor.hex,
          color2: item.hex,
          ratio: myContrast,
          results: myWcag,
        });
      }
    });

    return myContrastList;
  }

  return (
    <div className="my-3">
      <h2>Select a color to examine:</h2>
      <div className="flex my-4 flex-row flex-wrap gap-3">
        {contrastList.map((colorItem, colorIndex) => (
          <button
            type="button"
            onClick={() => {
              setCurrColorIndex(colorIndex);
            }}
            className="py-4 px-10 rounded-md"
            style={{
              backgroundColor: colorItem.hex,
            }}
            key={`${colorItem.hex}-${colorIndex}`}
          >
            <span className="rounded p-2 bg-slate-950">
              Examine color #{colorIndex + 1}
            </span>
          </button>
        ))}
      </div>
      <div
        className={`relative pt-4 mt-6 
            before:top-0 before:h-1 before:w-full before:absolute before:rounded-full
            before:bg-gradient-to-tr before:from-teal-500 before:to-green-400`}
      >
        <h2>Contrast Ratios for color {currColorIndex + 1}</h2>
        <div>
          {generateContrastRatiosForOneColor(currColorIndex).map(
            (contrastRatioItem, ratioIndex) => (
              <div key={`${contrastRatioItem.color2}-${ratioIndex}`}>
                <h3>ratio number {ratioIndex + 1}</h3>
                {/* <div className="flex flex-row flex-wrap">
                  <div className=" max-w-48 flex-1 flex flex-row flex-wrap">
                    <div
                      className="flex-1"
                      style={{
                        backgroundColor: contrastRatioItem.color1,
                      }}
                    />{" "}
                    <div
                      className="flex-1"
                      style={{
                        backgroundColor: contrastRatioItem.color2,
                      }}
                    />
                  </div>
                  <div
                    className={`p-4 flex-1`}
                    style={{
                      backgroundColor: contrastRatioItem.color1,
                      color: contrastRatioItem.color2,
                    }}
                  >
                    <p className="text-5xl mb-2">
                      {" "}
                      Lorem ipsum dolor sit amet ✔ ✗ ☺
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum. ✔ ✗ ☺
                    </p>
                  </div>
                </div> */}
                <ExampleText
                  color1={contrastRatioItem.color1}
                  color2={contrastRatioItem.color2}
                />
                <RatioCards ratio={contrastRatioItem.ratio} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
