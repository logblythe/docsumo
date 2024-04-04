import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Sections from "../assets/json/sections.json";
import SectionTile from "./SectionTile";

const RightBar = () => {
  const { data } = Sections;

  return (
    <div>
      <p>Fields</p>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Regular Fields</TabsTrigger>
          <TabsTrigger value="password">Columns Fields</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ul>
            {data.sections[0].children.map((section) => {
              return (
                <li className="mb-4">
                  <SectionTile section={section} />
                </li>
              );
            })}
          </ul>
        </TabsContent>
        <TabsContent value="password">
          Change your password here. After saving, you'll be logged out.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightBar;
