import ListView from "../components/ListView";

export default function Home() {
  return (
    <ListView
      title={"Olá, estas são as suas turmas"}
      menu={["add", "filter", "search", "archive", "report", "settings"]}
      model={"classRoom"}
      onMenuClick={(type) => console.log(type)}
    />
  );
}
