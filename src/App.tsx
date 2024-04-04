import { useState } from "react";
import "./App.css";
import BoundingBoxOnImage from "./BoundingBoxOnImage";
import RightBar from "./components/RightBar";
import { CoordinateWithColor } from "./types/CoordinateType";
import { SectionChildren } from "./types/section";

function App() {
  const [coordinates, setCoordinates] = useState<CoordinateWithColor[]>([]);
  const [hoveredCoordinates, setHoveredCoordinates] =
    useState<CoordinateWithColor | null>(null);

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

  const handleSectionHover = (
    section: SectionChildren,
    shouldRemove?: boolean
  ) => {
    const { position } = section.content ?? {};
    const { color = "#ffffff" } = section;
    const [x, y, width, height] = position ?? [];
    setHoveredCoordinates(
      !shouldRemove
        ? {
            x,
            y,
            width,
            height,
            color,
          }
        : null
    );
  };

  return (
    <div className="h-screen flex  w-screen">
      <div className="col-span-3  max-w-[1300px] flex-1">
        <div className=" size-full max-w-[700px] mx-auto h-screen  ">
          <BoundingBoxOnImage
            coordinates={coordinates}
            hoveredCoordinates={hoveredCoordinates}
          />
        </div>
      </div>
      <div className="h-screen overflow-hidden">
        <RightBar
          onSectionSelect={handleSectionSelect}
          onSectionHover={handleSectionHover}
          enableConfirmButton={coordinates.length > 1}
        />
      </div>
    </div>
  );
}

export default App;
