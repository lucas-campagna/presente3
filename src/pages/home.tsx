import { useNavigate } from "react-router";
import ListView from "../components/ListView";

export default function Home() {
  const navigate = useNavigate();
  return (
    <ListView
      title={"Olá, estas são as suas turmas"}
      menu={["add", "filter", "search", "archive", "report", "settings"]}
      model={"classRoom"}
      onMenuClick={(type) => console.log(type)}
      onItemClick={(item) => navigate(`/attendance/${item.id.id}`)}
      onItemOptionsClick={console.log}
    />
  );
}
