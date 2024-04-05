import { SectionChildren } from "@/types/section";
import SectionTile from "./SectionTile";
import { useRef } from "react";
import { EventKey } from "@/enums/event-key";

type PropType = {
  sections: SectionChildren[];
  onCheck: (id: number, isChecked: boolean) => void;
  onRemove: (id: number) => void;
  onMouseEnter: (id: number) => void;
  onMouseLeave: (id: number) => void;
};

export const SectionList = ({ sections, ...rest }: PropType) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    id: number,
    isChecked: boolean,
    index: number
  ) => {
    switch (event.key) {
      case EventKey.ENTER: {
        rest.onCheck(id, !isChecked);
        break;
      }
      case EventKey.ARROW_DOWN: {
        event.preventDefault();
        const nextIndex = index + 1;
        if (nextIndex < sections.length) {
          itemRefs.current[nextIndex]?.focus();
        }
        break;
      }
      case EventKey.ARROW_UP: {
        event.preventDefault();
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          itemRefs.current[prevIndex]?.focus();
        }
        break;
      }
    }
  };

  return (
    <ul className="space-y-2 p-2">
      {sections.map((section, index) => {
        return (
          <li
            key={section.id}
            onKeyDown={(event) =>
              handleKeyDown(
                event,
                section.id,
                section.isChecked ?? false,
                index
              )
            }
            tabIndex={0}
            ref={(element) => (itemRefs.current[index] = element)} // Save a reference to the list item
          >
            <SectionTile
              section={section}
              isChecked={section.isChecked ?? false}
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
