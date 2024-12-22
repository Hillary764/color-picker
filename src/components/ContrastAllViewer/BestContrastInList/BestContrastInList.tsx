import { contrastByLum, luminance } from "../../../utilities/contrast";
import ExampleText from "../../ExampleText/ExampleText";
import RatioCards from "../../RatioCards/RatioCards";
import { CombinedColorValue } from "../ContrastAllViewer";

interface Props {
  contrastList: CombinedColorValue[];
}

export default function BestContrastList({ contrastList }: Props) {
  function returnSortedList() {
    const luminanceMap = contrastList.map((value) => {
      return luminance(value.rgb.red, value.rgb.green, value.rgb.blue);
    });

    let temp1 = 0;
    let temp2 = 1;

    const tempList = [] as {
      color1: string;
      color2: string;
      ratio: number;
    }[];

    while (temp1 < contrastList.length) {
      while (temp2 < contrastList.length) {
        const newContrast = contrastByLum(
          luminanceMap[temp1],
          luminanceMap[temp2]
        );
        tempList.push({
          color1: contrastList[temp1].hex,
          color2: contrastList[temp2].hex,
          ratio: newContrast,
        });
        temp2++;
      }

      temp1++;
      temp2 = temp1 + 1;
    }

    tempList.sort((a, b) => {
      return b.ratio - a.ratio;
    });

    return tempList;
  }

  return (
    <div className="mt-8">
      <h2>Calculated ratios sorted by highest contrast</h2>
      <div>
        {returnSortedList().map((value) => (
          <div className="my-2 ">
            <ExampleText color1={value.color1} color2={value.color2} />

            <RatioCards ratio={value.ratio} />
          </div>
        ))}
      </div>
    </div>
  );
}
