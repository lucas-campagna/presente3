import type { Route } from "./+types/home";
import ListView from "~/components/ListView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Presente!" },
    {
      name: "description",
      content: "Aplicativo para marcar presença de alunos na sala de aula",
    },
  ];
}

export default function Home() {
  return (
    <ListView
      title={"Olá, estas são as suas turmas"}
      menu={["add", "filter", "search", "archive", "report"]}
      items={[]}
      onMenuClick={(type) => console.log(type)}
    />
  );
}
