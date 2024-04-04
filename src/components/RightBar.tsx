import { SectionChildren } from "@/types/section";
import { useState } from "react";
import Sections from "../assets/json/sections.json";
import SectionTile from "./SectionTile";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { COLORS } from "@/consts/colors";

const RightBar = () => {
  const { data } = Sections;

  const [sections, setSections] = useState<SectionChildren[]>(
    (data.sections[0].children as SectionChildren[]).map((section, index) => {
      section.color = COLORS[index % 10];
      return section;
    })
  );

  const handleSelectAll = () => {
    const sectionsCopy = [...sections];
    sectionsCopy.forEach((section) => {
      section.isChecked = true;
    });
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
    setSections(sectionsCopy);
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
                    />
                  </li>
                );
              })}
            </ul>
            <hr className="h-px mt-1 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex flex-row justify-between">
              <Button onClick={handleSelectAll}>Select all</Button>
              <Button>Confirm</Button>
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
