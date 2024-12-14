import { calcWcagResult } from "../../utilities/wcagResults";
import Card from "../Card/Card";

interface Props {
  ratio?: number;
}

export default function RatioCards({ ratio }: Props) {
  const finalRatio = ratio ?? 1;
  const cardData = calcWcagResult(finalRatio);

  return (
    <div className="flex flex-row flex-wrap gap-5 p-5">
      <Card className="[&>div]:p-5 flex-1">
        <div className="flex flex-col h-full">
          <p className="w-full text-lg text-center flex-1">Large Text</p>
          <p className="w-full text-8xl text-center">{cardData.largeText}</p>
        </div>
      </Card>
      <Card className="[&>div]:p-5 flex-1">
        <div className="flex flex-col h-full">
          <p className="w-full text-lg text-center flex-1">Small Text</p>
          <p className="w-full text-8xl text-center">{cardData.smallText}</p>
        </div>
      </Card>
      <Card className="[&>div]:p-5 flex-1">
        <div className="flex flex-col h-full">
          <p className="w-full text-lg text-center flex-1">
            User Interface and Graphical Objects
          </p>
          <p className="w-full text-8xl text-center">{cardData.UIComponent}</p>
        </div>
      </Card>
    </div>
  );
}
