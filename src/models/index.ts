import type { ClassRoom } from "./classRoom";
import type { Attendance } from "./attendance";
import type { Student } from "./student";
export * as classRoom from "./classRoom";
export * as attendance from "./attendance";
export * as student from "./student";

export type AvailableModels = {
  classRoom: ClassRoom;
  attendance: Attendance;
  student: Student;
};