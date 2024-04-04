import { useState } from "react";
import "./App.css";
import BoundingBoxOnImage from "./BoundingBoxOnImage";
import RightBar from "./components/RightBar";
import { CoordinateWithColor } from "./types/CoordinateType";
import { SectionChildren } from "./types/section";

function App() {
  const [coordinates, setCoordinates] = useState<CoordinateWithColor[]>([]);

  const handleSectionSelect = (sections: SectionChildren[]) => {
    setCoordinates(
      sections.map((section) => {
        const { position } = section.content ?? {};
        const { color = "#ffffff" } = section;
        if (!position) {
          return {
            x: 110,
            y: 483,
            width: 283,
            height: 499,
            color,
          };
        }
        const [x, y, width, height] = position;
        return {
          x,
          y,
          width,
          height,
          color,
        };
      })
    );
  };

  return (
    <div className="h-screen w-auto grid grid-cols-3">
      <div className="col-span-2">
        <BoundingBoxOnImage coordinates={coordinates} />
      </div>
      <div className="col-span-1">
        <RightBar onSectionSelect={handleSectionSelect} />
      </div>
    </div>
  );
}

export default App;
