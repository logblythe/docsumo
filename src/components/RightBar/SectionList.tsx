import { SectionChildren } from "@/types/section";
import SectionTile from "./SectionTile";
import { useState } from "react";

type PropType = {
  sections: SectionChildren[];
  onCheck: (id: number, isChecked: boolean) => void;
  onRemove: (id: number) => void;
  onMouseEnter: (id: number) => void;
  onMouseLeave: (id: number) => void;
};

export const SectionList = ({ sections, ...rest }: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, sections.length - 1)
      );
    }
  };

  return (
    <ul className="space-y-2 px-6" onKeyDown={handleKeyDown}>
      {sections.map((section, index) => {
        return (
          <li key={section.id}>
            <SectionTile
              section={section}
              isChecked={section.isChecked ?? false}
              isSelected={selectedIndex === index}
              disableHover={true}
              {...rest}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SectionList;
