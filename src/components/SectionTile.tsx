import { getRandomColor } from "@/lib/generateRandomColor";
import { SectionChildren } from "@/types/section";

const SectionTile = ({ section }: { section: SectionChildren }) => {
  const color = getRandomColor();

  if (!section.id_auto_extract_label || !section.content?.value) {
    return null;
  }

  return (
    <div className="bg-[#273139] flex space-x-4 p-4 rounded">
      <div>
        <InitialsAvatar title={section.id_auto_extract_label} color={color} />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex flex-row align-baseline">
          <p className="font-bold flex-1 justify-start flex mt-1">
            {section.id_auto_extract_label ?? "N/A"}
          </p>
          <input
            type="checkbox"
            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="font-medium"> {section.content?.value ?? "N/A"}</p>
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
      className="font-bold rounded  py-2 px-3 border-l-8"
      style={{ background: `${color}60`, borderColor: color }}
    >
      {initials}
    </div>
  );
};