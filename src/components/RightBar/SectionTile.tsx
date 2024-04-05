import { ThreeDotIcon } from "@/components/";
import { SectionChildren } from "@/types/section";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

type PropType = {
  section: SectionChildren;
  isChecked: boolean;
  disableHover?: boolean;
  onCheck: (id: number, isChecked: boolean) => void;
  onRemove: (id: number) => void;
  onMouseEnter: (id: number) => void;
  onMouseLeave: (id: number) => void;
};

const SectionTile = ({
  section,
  isChecked,
  onCheck,
  onRemove,
  onMouseEnter,
  onMouseLeave,
}: PropType) => {
  if (!section.id_auto_extract_label || !section.content?.value) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-card flex space-x-4 px-4 py-2 rounded hover:cursor-pointer hover:shadow-2xl hover:bg-[#2da394] transition ease-in-out hover:-translate-y-[0.5px] duration-300"
      )}
      onMouseEnter={() => onMouseEnter(section.id)}
      onMouseLeave={() => onMouseLeave(section.id)}
    >
      <div>
        <InitialsAvatar
          title={section.id_auto_extract_label}
          color={section.color ?? "#ffffff"}
        />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex flex-row align-baseline">
          <p className="font-bold flex-1 justify-start flex mt-1">
            {section.id_auto_extract_label ?? "N/A"}
          </p>
          <div className="flex space-x-2">
            {/**TODO: unable to change background color for unchecked checkbox */}
            <input
              type="checkbox"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
              onChange={(event) => onCheck(section.id, event.target.checked)}
              checked={isChecked}
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="p-0 bg-transparent -mt-1">
                <ThreeDotIcon height={"24px"} width={"24px"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded">
                <DropdownMenuItem
                  onClick={() => onRemove(section.id)}
                  className="cursor-pointer"
                >
                  Remove Section
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <p className="font-medium text-left text-sm">
            {section.content?.value ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionTile;

const InitialsAvatar = ({ title, color }: { title: string; color: string }) => {
  const initials = title.split(" ").reduce((prev, curr) => {
    const currentInitial = curr.charAt(0);
    return `${prev} ${currentInitial.toUpperCase()}`.trim();
  }, "");

  return (
    <div
      className="font-bold rounded py-2 px-3 border-l-8"
      style={{ background: `${color}60`, borderColor: color }}
    >
      {initials}
    </div>
  );
};
