import { useSurrealClient } from "@/contexts/SurrealProvider";
import { useEffect, useState } from "react";
import { RecordId } from "surrealdb";

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

  const getAll = async (): Promise<T[]> => {
    if (!client) return [];
    const items = await client.select<T>(model);
    setItems(items);
    return items;
  };
  const getById = (id: string) => client?.select<T>(new RecordId(model, id));
  const insert = async (...data: Omit<T, "id">[]): Promise<T[]> => {
    if (!client) return [];
    const newItems = (await client.insert(model, data)) as T[];
    setItems([...items, ...newItems]);
    return newItems;
  };
  const update = async (id: string, data: Partial<Omit<T, "id">>) => {
    if (!client) return items.find((item) => item.id === id);
    const updatedItem = (await client.update(
      new RecordId(model, id),
      data
    )) as T;
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    return updatedItem;
  };
  const remove = async (id: string) => {
    if (!client) return null;
    const removedItem = (await client.delete(new RecordId(model, id))) as T;
    setItems(items.filter((item) => item.id !== removedItem.id));
    return removedItem;
  };

  return {
    items,
    getAll,
    getById,
    insert,
    update,
    remove,
  };
}
