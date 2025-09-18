import { useSurrealClient } from "@/contexts/SurrealProvider";
import { useEffect, useState } from "react";

export type BaseType = { [x: string]: unknown };

export default function useModel<T extends BaseType>(model: string) {
  const client = useSurrealClient();

  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    async function fetchData() {
      if (!client) return;
      const data = await client.select<T>(model);
      setItems(data);
    }
    fetchData();
  }, [model, client]);

  const getAll = () => client?.select<T>(model);
  const getById = (id: string) => client?.select<T>(`${model}:${id}`);
  const create = (data: Omit<T, "id">) => client?.create(model, data);
  const update = (id: string, data: Partial<Omit<T, "id">>) =>
    client?.update(`${model}:${id}`, data);
  const remove = (id: string) => client?.delete(`${model}:${id}`);

  return {
    items,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}
