import { RGBMap } from "../components/ContrastPicker/ContrastPicker";
import { luminance } from "./contrast";

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

  return [suggestion1, suggestion2, suggestion3];
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

  return [suggestion1, suggestion2, suggestion3];
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
