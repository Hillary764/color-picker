import { RGBMap } from "../components/ContrastPicker/ContrastPicker";
import { hexToRgb } from "./hexToRgb";

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

export function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

export function contrast(rgb1: RGBMap, rgb2: RGBMap) {
  const lum1 = luminance(rgb1.red, rgb1.green, rgb1.blue);
  const lum2 = luminance(rgb2.red, rgb2.green, rgb2.blue);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function contrastByHex(hex1: string, hex2: string) {
  const rgbVal1 = hexToRgb(hex1);
  const rgbVal2 = hexToRgb(hex2);

  if (rgbVal1 && rgbVal2) {
    return contrast(rgbVal1, rgbVal2);
  }

  return null;
}
