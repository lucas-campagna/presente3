import type { Class } from "./class";
import { getLabel as getLabelClass, onSort as onSortClass } from "./class";

export type AvailableModels = {
    class: Class;
}

export const getLabel = {
    class: getLabelClass,
}

export const onSort = {
    class: onSortClass,
}