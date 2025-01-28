"use client";

import { createContext, useState } from "react";

type TabType = "rec" | "fol";
interface TabContextType {
  tab: TabType;
  setTab: (value: TabType) => void;
}

export const TabContext = createContext<TabContextType>({
  tab: "rec",
  setTab: () => {},
});

export default function TabProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<TabType>("rec");

  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
}
