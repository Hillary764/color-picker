import { prominent } from "color.js";

export async function pullProminentColors(
  numToExtract: number,
  imgUrl: string,
  group = 1
) {
  try {
    const answer = await prominent(imgUrl, {
      amount: numToExtract,
      format: "hex",
      group: group,
    });
    console.log(answer);
    if (Array.isArray(answer)) {
      return answer as string[];
    } else if (typeof answer == "string") {
      return [answer] as string[];
    }
    return null;
  } catch {
    return null;
  }
}
