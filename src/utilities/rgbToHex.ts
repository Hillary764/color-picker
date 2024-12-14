function toInt(num: number) {
  return Math.max(Math.floor(num), 0);
}

function componentToHex(c: number) {
  const intVer = toInt(c);
  const hex = intVer.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
