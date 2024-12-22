import { useEffect, useState } from "react";
import { CombinedColorValue } from "../ContrastAllViewer";
import { contrast } from "../../../utilities/contrast";
import RatioCards from "../../RatioCards/RatioCards";

interface Props {
  colorList: CombinedColorValue[];
}

type EdgeByIndex = [number, number];

export default function IconDesign({ colorList }: Props) {
  const [indexEdges, setIndexEdges] = useState<EdgeByIndex[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const [first, setFirst] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    const newLength = colorList.length;

    setSelectedOptions((state) => {
      return state.filter((currValue) => {
        if (currValue >= newLength) {
          return false;
        }
        return true;
      });
    });

    setFirst(0);
    setSecond(0);

    setIndexEdges((state) => {
      return state.filter((edge) => {
        if (edge[0] >= newLength || edge[1] >= newLength) {
          return false;
        }
        return true;
      });
    });
  }, [colorList]);

  function addIndexEdge(newEdge: EdgeByIndex) {
    setIndexEdges((state) => {
      const reverseEdge: EdgeByIndex = [newEdge[1], newEdge[0]];
      const edgeExists = state.some((currentEdge) => {
        if (currentEdge[0] == newEdge[0] && currentEdge[1] == newEdge[1]) {
          // newEdge exists
          return true;
        } else if (
          currentEdge[0] == reverseEdge[0] &&
          currentEdge[1] == reverseEdge[1]
        ) {
          // newEdge exists in reverse
          // this is a not directional edge
          // so return true
          return true;
        }

        // newEdge is not the same as
        // this currentEdge
        // return false to keep going
        return false;
      });
      // ended state.some function
      // edgeExists is now set

      if (!edgeExists) {
        // safe to add
        const temp = [...state];
        temp.push(newEdge);
        return temp;
      }

      // edge already exists
      // ignore new edge
      return state;
    });
  }

  function refreshIndexEdges(newSelectedOptions: number[]) {
    setIndexEdges((state) => {
      return state.filter((value) => {
        let counter = 0;
        let firstFound = false;
        let secondFound = false;

        while (
          counter < newSelectedOptions.length &&
          !firstFound &&
          !secondFound
        ) {
          // while we haven't looked through
          // all of newSelectedOptions
          // check if
          // edge[0] or edge[1] match

          if (value[0] == newSelectedOptions[counter]) {
            // first part of edge still in colors
            firstFound = true;
          }
          if (value[1] == newSelectedOptions[counter]) {
            // second part of edge still in colors
            secondFound = true;
          }

          //increment counter
          counter++;
        }

        if (firstFound && secondFound) {
          return true;
        }
        return false;
      });
    });
  }

  function getContrastFromEdges() {
    const contrastPassMap = [] as {
      color1: string;
      color2: string;
      ratio: number;
    }[];

    const contrastFailMap = [] as {
      color1: string;
      color2: string;
      ratio: number;
    }[];

    indexEdges.forEach((edge) => {
      if (
        edge[0] >= colorList.length ||
        edge[0] < 0 ||
        edge[1] >= colorList.length ||
        edge[1] < 0
      ) {
        console.log("invalid edge");
      } else {
        const color1 = colorList[edge[0]];
        const color2 = colorList[edge[1]];

        const contrastVal = contrast(color1.rgb, color2.rgb);

        if (contrastVal >= 3) {
          contrastPassMap.push({
            color1: color1.hex,
            color2: color2.hex,
            ratio: contrastVal,
          });
        } else {
          contrastFailMap.push({
            color1: color1.hex,
            color2: color2.hex,
            ratio: contrastVal,
          });
        }
      }
    });

    contrastPassMap.sort((a, b) => {
      return b.ratio - a.ratio;
    });

    contrastFailMap.sort((a, b) => b.ratio - a.ratio);

    return {
      pass: contrastPassMap,
      fail: contrastFailMap,
    };
  }

  return (
    <div className="mt-8">
      <h2>Test icon ideas</h2>
      <div className="flex flex-col items-center">
        <h3 className="mt-6">Overview</h3>
        <p className="my-4 max-w-xl">
          Icons come in many forms. They may have multiple colors touching each
          other. They may also appear against various background colors.
        </p>
        <p className="my-4 max-w-xl">
          Icons have fairly permissive contrast requirements, requiring a 3:1
          contrast ratio. This picker will let you know which colors are
          contrasting enough to meet this ratio.
        </p>
        <p className="my-4 max-w-xl">
          This viewer takes a little time to configure. You will need to
          manually select the colors that appear next to each other inside the
          icon. It is also a good idea to include the icon border colors
          compared to the page or page section background color.
        </p>
        <p className="my-4 max-w-xl">The steps are listed below.</p>

        <ol className="mt-2 list-decimal list-inside px-4">
          <li>Select your icon colors from your palette.</li>
          <li>Go through each color and select adjacent colors</li>
          <li>View report</li>
        </ol>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <h3 className="mb-2">Select colors</h3>
        <div className="flex flex-row flex-wrap gap-2 justify-center">
          {colorList.map((colorVal, index) => (
            <button
              type="button"
              onClick={() => {
                if (
                  !selectedOptions.some((value) => {
                    if (value == index) {
                      return true;
                    }
                    return false;
                  })
                ) {
                  setSelectedOptions([...selectedOptions, index]);
                }
              }}
              style={{
                backgroundColor: colorVal.hex,
              }}
              key={`select-button-${index}-${colorVal}`}
              className={`py-2 px-6 border-2 border-green-300`}
            >
              <span className="p-1 bg-slate-950 rounded">{colorVal.hex}</span>
            </button>
          ))}
        </div>
        <h3 className="mt-6 mb-2">Currently selected colors:</h3>
        <div className="flex flex-row gap-2 flex-wrap justify-center">
          {selectedOptions.map((value, index) => {
            if (value >= colorList.length || value < 0) {
              return null;
            }

            const selectedColor = colorList[value];

            return (
              <button
                className={`py-2 px-4 border-2 border-green-300`}
                type="button"
                key={`${index}-removal`}
                onClick={() => {
                  setSelectedOptions((value) => {
                    const temp = [...value];
                    temp.splice(index, 1);
                    refreshIndexEdges(temp);
                    return temp;
                  });
                }}
                style={{
                  backgroundColor: selectedColor.hex,
                }}
              >
                <span className="p-1 bg-slate-950 rounded">
                  Remove this color {`(${selectedColor.hex})`}
                </span>
              </button>
            );
          })}
        </div>
        <h3 className="mt-6">Select adjacent colors:</h3>
        <h4>Currently selected combinations:</h4>
        <div className="m-4 flex flex-row flex-wrap gap-5 items-center justify-center">
          {indexEdges.map((itemIndexes, edgeIndex) => {
            if (
              itemIndexes[0] < 0 ||
              itemIndexes[0] >= colorList.length ||
              itemIndexes[1] < 0 ||
              itemIndexes[1] >= colorList.length
            ) {
              // out of bounds
              return null;
            }

            const value: [string, string] = ["", ""];
            value[0] = colorList[itemIndexes[0]].hex;
            value[1] = colorList[itemIndexes[1]].hex;

            return (
              <div
                key={`edgelist-${value[0]}-${value[1]}-${edgeIndex}`}
                className="flex flex-row flex-wrap"
              >
                <div
                  style={{
                    backgroundColor: value[0],
                  }}
                  className="px-6 py-4 flex-1"
                >
                  <p className="p-2 bg-slate-950 rounded">{value[0]}</p>
                </div>
                <div
                  style={{
                    backgroundColor: value[1],
                  }}
                  className="px-6 py-4 flex-1"
                >
                  <p className="p-2 bg-slate-950 rounded">{value[1]}</p>
                </div>
                <button
                  className="p-3 border-2 border-green-300 w-full "
                  type="button"
                  onClick={() => {
                    setIndexEdges((state) => {
                      const temp = [...state];
                      temp.splice(edgeIndex, 1);
                      return temp;
                    });
                  }}
                >
                  remove combination
                </button>
              </div>
            );
          })}
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2`}>
          <div>
            <h4>Select first color:</h4>
            <div className="flex flex-row flex-wrap justify-center">
              {selectedOptions.map((itemIndex, selectedOptionIndex) => {
                const value = colorList[itemIndex];

                return (
                  <button
                    type="button"
                    className={`py-4 px-6 `}
                    onClick={() => {
                      setFirst(selectedOptionIndex);
                    }}
                    style={{
                      backgroundColor: value.hex,
                    }}
                    key={`color-1-selector-${selectedOptionIndex}`}
                  >
                    <span className={`rounded bg-slate-950 p-2`}>
                      Set <span className="sr-only">color 1</span> to{" "}
                      {value.hex}
                    </span>
                  </button>
                );
              })}
            </div>
            <h4 className="mt-4">Select second color:</h4>
            <div className="flex flex-row flex-wrap justify-center">
              {selectedOptions.map((itemIndex, selectedOptionIndex) => {
                if (itemIndex < 0 || itemIndex >= colorList.length) {
                  return null;
                }

                const value = colorList[itemIndex];

                return (
                  <button
                    type="button"
                    className={`py-4 px-6 `}
                    onClick={() => {
                      setSecond(selectedOptionIndex);
                    }}
                    style={{
                      backgroundColor: value.hex,
                    }}
                    key={`color-2-selector-${selectedOptionIndex}`}
                  >
                    <span className={`rounded bg-slate-950 p-2`}>
                      Set <span className="sr-only">color 2</span> to{" "}
                      {value.hex}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={`p-5`}>
            <h4>confirm selection:</h4>
            <div className="flex flex-row flex-wrap">
              {colorList[selectedOptions[first]] ? (
                <div
                  className={`p-5 flex-1`}
                  style={{
                    // backgroundColor: selectedColors[first].hex,
                    backgroundColor: colorList[selectedOptions[first]].hex,
                  }}
                >
                  <p className="py-2 px-8 rounded bg-slate-950 w-fit">
                    {colorList[selectedOptions[first]].hex}
                  </p>
                </div>
              ) : null}
              {colorList[selectedOptions[second]] ? (
                <div
                  className={`p-5 flex-1`}
                  style={{
                    backgroundColor: colorList[selectedOptions[second]].hex,
                  }}
                >
                  <p className="py-2 px-8 rounded bg-slate-950 w-fit">
                    {colorList[selectedOptions[second]].hex}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="my-6 flex items-center justify-center">
              {colorList[selectedOptions[first]] &&
              colorList[selectedOptions[second]] &&
              first != second ? (
                <button
                  type="button"
                  className={`border-2 border-green-300
                 px-4 py-2 rounded`}
                  onClick={() => {
                    addIndexEdge([
                      selectedOptions[first],
                      selectedOptions[second],
                    ]);
                  }}
                >
                  Add combination
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="my-6">
          <h3>Analysis:</h3>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
            <div>
              <h4 className="text-lg py-4">Passing contrasts</h4>
              <div>
                {getContrastFromEdges().pass.map((value, index) => (
                  <div key={`${value.ratio}-${index}`}>
                    <div className="flex flex-row flex-wrap border-2 border-green-300">
                      <div
                        className="p-4 flex-1"
                        style={{
                          backgroundColor: value.color1,
                        }}
                      >
                        <p className="bg-slate-950 p-2 rounded">
                          {value.color1}
                        </p>
                      </div>
                      <div
                        className="p-4 flex-1"
                        style={{
                          backgroundColor: value.color2,
                        }}
                      >
                        <p className="bg-slate-950 p-2 rounded">
                          {value.color2}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-2xl mt-6">Ratio:</p>
                    <p className="font-bold text-4xl text-center my-4">
                      {
                        value.ratio
                          .toString()
                          .match(/^-?\d+(?:\.\d{0,2})?/)?.[0]
                      }
                      :1
                    </p>
                    <div>
                      <RatioCards ratio={value.ratio} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg py-4">Failing contrasts</h4>
              <div>
                {getContrastFromEdges().fail.map((value, index) => (
                  <div key={`${value.ratio}-${index}`}>
                    <div className="flex flex-row flex-wrap border-2 border-green-300">
                      <div
                        className="p-4 flex-1"
                        style={{
                          backgroundColor: value.color1,
                        }}
                      >
                        <p className="bg-slate-950 p-2 rounded">
                          {value.color1}
                        </p>
                      </div>
                      <div
                        className="p-4 flex-1"
                        style={{
                          backgroundColor: value.color2,
                        }}
                      >
                        <p className="bg-slate-950 p-2 rounded">
                          {value.color2}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-2xl mt-6">Ratio:</p>
                    <p className="font-bold text-4xl text-center my-4">
                      {
                        value.ratio
                          .toString()
                          .match(/^-?\d+(?:\.\d{0,2})?/)?.[0]
                      }
                      :1
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
