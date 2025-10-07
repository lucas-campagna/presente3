import type { RecordId } from "surrealdb";

export type ClassRoom = {
  id: RecordId<'class'>;
  name: string;
  active: boolean;
};