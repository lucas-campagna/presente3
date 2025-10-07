import type { RecordId } from "surrealdb";

export type Subscription = {
  id: RecordId<"subscription">;
  in: RecordId<"student">;
  out: RecordId<"class">;
};
