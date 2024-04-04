import { SectionChildren } from "@/types/section";
import { useState } from "react";
import Sections from "../assets/json/sections.json";
import SectionTile from "./SectionTile";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
} from "./ui/alert-dialog";

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
    <div>
      <p>Fields</p>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Regular Fields</TabsTrigger>
          <TabsTrigger value="password">Columns Fields</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="px-4">
            <ul className="space-y-2">
              {sections.map((section) => {
                return (
                  <li key={section.id}>
                    <SectionTile
                      section={section}
                      isChecked={section.isChecked ?? false}
                      onCheck={handleCheck}
                      onRemove={handleRemove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  </li>
                );
              })}
            </ul>
            <hr className="h-px mt-1 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex flex-row justify-between">
              <Button onClick={handleSelectAll}>Select all</Button>
              {/**First Alert Dialog */}
              <AlertDialog
                key={"outer-dialog"}
                open={isOpen}
                onOpenChange={setIsOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button disabled={!enableConfirmButton}>Confirm</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className=" bg-slate-700 border-0">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to confirm the selected fields?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white text-black">
                      Cancel
                    </AlertDialogCancel>
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
              <AlertDialog
                key={"outer-dialog"}
                open={isInnerOpen}
                onOpenChange={setIsInnerOpen}
              >
                <AlertDialogContent className=" bg-slate-700 border-0">
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
          </div>
        </TabsContent>
        <TabsContent value="password">
          Change your password here. After saving, you'll be logged out.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightBar;
