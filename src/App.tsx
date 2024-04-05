import { useState } from "react";
import "./App.css";
import BoundingBoxOnImage from "./components/BoundingBoxOnImage";
import RightBar from "./components/RightBar";
import { CoordinateWithColor } from "./types/CoordinateType";
import { SectionChildren } from "./types/section";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [zoom, setZoom] = useState(1);
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
    <div className="space-y-4 h-screen overflow-auto">
      <div className="px-4 py-2 flex flex-row justify-between shadow-md">
        <Select onValueChange={(value) => setZoom(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select zoom level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Zoom level</SelectLabel>
              <SelectItem value="1">Fit</SelectItem>
              <SelectItem value="0.50">50%</SelectItem>
              <SelectItem value="0.75">75%</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ThemeSwitcher />
      </div>
      <div className="h-vh-minus-80 w-screen grid grid-cols-7 space-x-4 px-4 ">
        <div className="col-span-5 bg-accent rounded border-slate-400 border-2 overflow-auto">
          <div className="size-full max-w-[800px] mx-auto overflow-x-auto py-4">
            <BoundingBoxOnImage
              coordinates={coordinates}
              hoveredCoordinates={hoveredCoordinates}
              zoom={zoom}
            />
          </div>
        </div>
        <div className="col-span-2 bg-accent rounded border-slate-400 border-2 overflow-auto">
          <RightBar
            onSectionSelect={handleSectionSelect}
            onSectionHover={handleSectionHover}
            enableConfirmButton={coordinates.length > 1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
