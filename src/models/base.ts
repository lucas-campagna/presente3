import type { RecordId } from "surrealdb";

type BaseModel = {
    id: RecordId<string>;
}

export function getLabel(_item: BaseModel) {
  return "";
}

export function onSort(_a: BaseModel, _b: BaseModel) {
  return 0;
}