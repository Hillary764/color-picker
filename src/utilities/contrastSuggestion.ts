import { RGBMap } from "../components/ContrastPicker/ContrastPicker";
import { contrast, luminance } from "./contrast";

function updateColors(
  rgbVal: RGBMap,
  rChange: number,
  gChange: number,
  bChange: number
) {
  return {
    red: Math.min(Math.max(rgbVal.red) + rChange, 255),
    green: Math.min(Math.max(rgbVal.green) + gChange, 255),
    blue: Math.min(Math.max(rgbVal.blue) + bChange, 255),
  } as RGBMap;
}

function suggestDarker(rgbVal: RGBMap) {
  const suggestion1 = {
    red: Math.max(rgbVal.red - 25, 0),
    green: Math.max(rgbVal.green - 25, 0),
    blue: Math.max(rgbVal.blue - 25, 0),
  } as RGBMap;

  const suggestion2 = {
    red: Math.max(rgbVal.red - 25, 0),
    green: Math.max(rgbVal.green - 45, 0),
    blue: Math.max(rgbVal.blue - 45, 0),
  };

  const suggestion3 = {
    red: Math.max(rgbVal.red - 45, 0),
    green: Math.max(rgbVal.green - 15, 0),
    blue: Math.max(rgbVal.blue - 15, 0),
  };

  const suggestion4 = updateColors(rgbVal, -25, -45, -25);

  const suggestion5 = updateColors(rgbVal, -35, -10, -10);

  return [suggestion1, suggestion2, suggestion3, suggestion4, suggestion5];
}

function suggestLighter(rgbVal: RGBMap) {
  const suggestion1 = {
    red: Math.min(rgbVal.red + 25, 255),
    green: Math.min(rgbVal.green + 25, 255),
    blue: Math.min(rgbVal.blue + 25, 255),
  } as RGBMap;

  const suggestion2 = {
    red: Math.min(rgbVal.red + 35, 255),
    green: Math.min(rgbVal.green + 25, 255),
    blue: Math.min(rgbVal.blue + 25, 255),
  };

  const suggestion3 = {
    red: Math.min(rgbVal.red + 10, 255),
    green: Math.min(rgbVal.green + 35, 255),
    blue: Math.min(rgbVal.blue + 45, 255),
  };

  const suggestion4 = updateColors(rgbVal, 35, 15, 35);

  const suggestion5 = updateColors(rgbVal, 10, 35, 35);

  return [suggestion1, suggestion2, suggestion3, suggestion4, suggestion5];
}

interface NewContrastResults {
  rgb1: RGBMap[];
  rgb2: RGBMap[];
}

export function suggestNewContrasts(rgb1: RGBMap, rgb2: RGBMap) {
  const lum1 = luminance(rgb1.red, rgb1.green, rgb1.blue);
  const lum2 = luminance(rgb2.red, rgb2.green, rgb2.blue);

  if (lum1 > lum2) {
    // lum1 is brighter

    const lighterRGBSuggestions = suggestLighter(rgb1);
    const darkerRGBSuggestions = suggestDarker(rgb2);
    return {
      rgb1: lighterRGBSuggestions,
      rgb2: darkerRGBSuggestions,
    } as NewContrastResults;
  } else {
    const lighterRGBSuggestions = suggestLighter(rgb2);
    const darkerRGBSuggestions = suggestDarker(rgb1);

    return {
      rgb1: darkerRGBSuggestions,
      rgb2: lighterRGBSuggestions,
    } as NewContrastResults;
  }
}

export interface IconContrastResults {
  bg: RGBMap[];
  stroke: RGBMap[];
  fill: RGBMap[];
}

export function suggestIconContrasts(
  bgRGB: RGBMap,
  strokeRGB: RGBMap,
  fillRGB: RGBMap
): IconContrastResults {
  const bgLum = luminance(bgRGB.red, bgRGB.green, bgRGB.blue);

  const strokeLum = luminance(strokeRGB.red, strokeRGB.green, strokeRGB.blue);

  if (bgLum > strokeLum) {
    // background is brighter
    const newBG = suggestLighter(bgRGB);
    const newStroke = suggestDarker(strokeRGB);

    // still need to decide fill direction
    const newFill = suggestDarker(fillRGB);
    const newFill2 = suggestLighter(fillRGB);

    const newDarkerContrast = contrast(newFill[0], newStroke[0]);
    const newLighterContrast = contrast(newFill2[0], newStroke[0]);

    if (newLighterContrast > newDarkerContrast) {
      return {
        bg: newBG,
        stroke: newStroke,
        fill: newFill2,
      };
    }
    return {
      bg: newBG,
      stroke: newStroke,
      fill: newFill,
    };
  } else {
    // stroke is brighter than bg

    const strokeSuggestions = suggestLighter(strokeRGB);

    const fillSugg1 = suggestDarker(fillRGB);
    const fillSugg2 = suggestLighter(fillRGB);

    const darkerContrast = contrast(fillSugg1[0], strokeSuggestions[0]);
    const ligherContrast = contrast(fillSugg2[0], strokeSuggestions[0]);

    if (ligherContrast > darkerContrast) {
      return {
        bg: suggestDarker(bgRGB),
        stroke: strokeSuggestions,
        fill: fillSugg2,
      };
    }

    return {
      bg: suggestDarker(bgRGB),
      stroke: strokeSuggestions,
      fill: fillSugg1,
    };
  }
}
