import type { ClassRoom } from "./classRoom";

export type AvailableModels = {
    class: Class;
}

export const getLabel = {
    class: getLabelClass,
}

export const onSort = {
    class: onSortClass,
}