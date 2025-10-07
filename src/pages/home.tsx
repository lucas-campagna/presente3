import { useNavigate } from "react-router";
import ListView from "../components/ListView";
import useModel from "@/hooks/useModel";
import type { ClassRoom } from "@/models/classRoom";

export default function Home() {
  const navigate = useNavigate();
  const { items } = useModel<ClassRoom>("classRoom");
  return (
    <ListView
      title={"Olá, estas são as suas turmas"}
      menu={["add", "filter", "search", "archive", "report", "settings"]}
      items={items.map((item) => ({
        label: item.name,
        ...item,
      }))}
      onMenuClick={(type) => console.log(type)}
      onItemClick={(item) => navigate(`/attendance/${item.id.id}`)}
      onItemOptionsClick={console.log}
    />
  );
}
