import { rgbToHex } from "../../utilities/rgbToHex";
import { RGBMap } from "../ContrastPicker/ContrastPicker";

interface Props {
  setColor: () => void;
  colorRgb: RGBMap;
  className?: string;
}

export default function ColorSwatch({ setColor, colorRgb, className }: Props) {
  return (
    <div
      className={`flex-1 p-4 flex justify-center items-center ${className}`}
      style={{
        backgroundColor: rgbToHex(colorRgb.red, colorRgb.green, colorRgb.blue),
      }}
    >
      <button
        onClick={setColor}
        className="rounded-lg px-3 py-1 my-3 bg-slate-950"
        type="button"
      >
        Select color
      </button>
    </div>
  );
}
