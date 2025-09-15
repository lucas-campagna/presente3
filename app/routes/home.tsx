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
      title={"Titulo"}
      menu={[
        {
          type: "search",
          text: "Buscar",
          icon: 'Search',
        },
        {
          type: "order",
          text: "Ordenar",
          icon: 'SearchCheck',
        },
        {
          type: "delete",
          text: "Deletar",
          icon: 'Trash',
        }
      ]}
      items={[]}
    />
  );
}
