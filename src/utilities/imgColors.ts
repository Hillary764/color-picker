import { prominent } from "color.js";

export async function pullProminentColors(
  numToExtract: number,
  imgUrl: string
) {
  try {
    const answer = await prominent(imgUrl, {
      amount: numToExtract,
      format: "hex",
    });
    console.log(answer);
    return answer as string[];
  } catch {
    return null;
  }
}
