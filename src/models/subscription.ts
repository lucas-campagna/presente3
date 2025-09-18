import type { RecordId } from "surrealdb";

export type Subscriptions = {
  id: RecordId<"presences">;
  in: RecordId<"student">;
  out: RecordId<"class">;
  presences: Date[];
};
