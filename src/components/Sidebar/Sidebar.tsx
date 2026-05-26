import { PropsWithChildren, useState } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  const [isShowing, setIsShowing] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  

  return (
    <>
      <button
        onClick={() => {
          setIsShowing(true);
          setAnimationIndex(0);
        }}
      >
        Clickme
      </button>
      {isShowing && (
        <div className={`fixed top-0 right-0 h-screen w-screen `}>
          <div>
            <button
              onClick={() => {
                setIsShowing(false);
              }}
            >
              Close
            </button>
          </div>
          {children}
        </div>
      )}
    </>
  );
}
