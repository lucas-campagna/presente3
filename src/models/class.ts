export type Class = {
  id: string;
  name: string;
};

export function getLabel(item: Class) {
  return item.name;
}

export function onSort(a: Class, b: Class) {
  return a.name.localeCompare(b.name);
}

