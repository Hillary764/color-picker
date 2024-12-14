type RatioResult = "Fail" | "AA" | "AAA";

export interface WcagResultMap {
  largeText: RatioResult;
  smallText: RatioResult;
  UIComponent: RatioResult;
  graphicalObject: RatioResult;
}

export function calcWcagResult(ratio: number) {
  let result = {
    largeText: "Fail",
    smallText: "Fail",
    UIComponent: "Fail",
    graphicalObject: "Fail",
  } as WcagResultMap;

  if (ratio >= 7) {
    result = {
      largeText: "AAA",
      smallText: "AAA",
      UIComponent: "AA",
      graphicalObject: "AA",
    };
  } else if (ratio >= 4.5) {
    result = {
      largeText: "AAA",
      smallText: "AA",
      UIComponent: "AA",
      graphicalObject: "AA",
    };
  } else if (ratio >= 3) {
    result = {
      largeText: "AA",
      smallText: "Fail",
      UIComponent: "AA",
      graphicalObject: "AA",
    };
  }

  return result;
}
