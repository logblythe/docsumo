import { SectionChildren } from "@/types/section";
import { useState } from "react";
import Sections from "../../assets/json/sections.json";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { COLORS } from "@/consts/colors";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import SectionList from "./SectionList";

type PropType = {
  onSectionSelect: (sections: SectionChildren[]) => void;
  onSectionHover: (section: SectionChildren, shouldRemove?: boolean) => void;
  enableConfirmButton?: boolean;
};

const RightBar = ({
  onSectionSelect,
  onSectionHover,
  enableConfirmButton,
}: PropType) => {
  const { data } = Sections;

  const [isOpen, setIsOpen] = useState(false);
  const [isInnerOpen, setIsInnerOpen] = useState(false);

  const [sections, setSections] = useState<SectionChildren[]>(
    (data.sections[0].children as SectionChildren[])
      .filter(
        (section) =>
          section.content?.position && section.content?.position.length > 0
      )
      .map((section, index) => {
        section.color = COLORS[index % 10];
        return section;
      })
  );

  const handleSelectAll = () => {
    const sectionsCopy = [...sections];
    sectionsCopy.forEach((section) => {
      section.isChecked = true;
    });
    onSectionSelect(sectionsCopy.filter((section) => section.isChecked));
    setSections(sectionsCopy);
  };

  const handleCheck = (id: number, isChecked: boolean) => {
    const sectionsCopy = [...sections];
    const sec = sectionsCopy.find((section) => section.id === id);
    if (!sec) {
      return sectionsCopy;
    }
    sec.isChecked = isChecked;
    const index = sectionsCopy.findIndex((section) => section.id === id);
    sectionsCopy[index] = sec;
    onSectionSelect(sectionsCopy.filter((section) => section.isChecked));
    setSections(sectionsCopy);
  };

  const handleRemove = (id: number) => {
    const sectionsCopy = [...sections];
    const sec = sectionsCopy.find((section) => section.id === id);
    if (!sec) {
      return sectionsCopy;
    }
    sec.isChecked = false;
    const index = sectionsCopy.findIndex((section) => section.id === id);
    sectionsCopy[index] = sec;
    onSectionSelect(sectionsCopy.filter((section) => section.isChecked));
    setSections(sectionsCopy);
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleMouseEnter = (id: number) => {
    const hoveredSection = sections.find((section) => section.id === id);
    if (hoveredSection) {
      onSectionHover(hoveredSection);
    }
  };

  const handleMouseLeave = (id: number) => {
    const hoveredSection = sections.find((section) => section.id === id);
    if (hoveredSection) {
      onSectionHover(hoveredSection, true);
    }
  };

  return (
    <div className="px-4">
      <p className="font-bold text-left text-xl my-4">Fields</p>
      <Tabs defaultValue="regular-fields">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="regular-fields">Regular Fields</TabsTrigger>
          <TabsTrigger value="columns-fields">Columns Fields</TabsTrigger>
        </TabsList>
        <TabsContent value="regular-fields">
          <div className="max-h-[760px] overflow-y-auto">
            <SectionList
              sections={sections}
              onCheck={handleCheck}
              onRemove={handleRemove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <hr className="h-px mt-1 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex flex-row justify-between">
            <Button onClick={handleSelectAll}>Select all</Button>
            {/**First Alert Dialog */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button disabled={!enableConfirmButton}>Confirm</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to confirm the selected fields?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setIsInnerOpen(true);
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/**Second Alert Dialog */}
            <AlertDialog open={isInnerOpen} onOpenChange={setIsInnerOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Fields confirmed and processed successfully!
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Ok</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightBar;
