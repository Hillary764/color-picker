import { useEffect, useState } from "react";
import { RGBMap } from "../../ContrastPicker/ContrastPicker";
import ColorSelector from "../ColorSelector";

interface Props {
  hex: string;
  rgb: RGBMap;
  setByRGB: (newRgb: RGBMap) => void;
}

export default function ColorSelectorLocal({ hex, rgb, setByRGB }: Props) {
  const [localHex, setLocalHex] = useState(hex);
  const [localRGB, setLocalRGB] = useState(rgb);

  useEffect(() => {
    setLocalHex(hex);
    setLocalRGB(rgb);
  }, [hex, rgb]);

  return (
    <div>
      <ColorSelector
        hexColor={localHex}
        rgbMap={localRGB}
        setHexColor={setLocalHex}
        setRgbMap={setLocalRGB}
      />
      <div>
        <button
          onClick={() => {
            setByRGB(localRGB);
          }}
        >
          Update Color
        </button>
      </div>
    </div>
  );
}
