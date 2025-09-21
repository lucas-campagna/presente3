import useModel from "@/hooks/useModel";
import { useEffect, useState } from "react";
import type { ClassRoom } from "@/models/classRoom";

export default function useClassRoom(id: string | undefined): ClassRoom {
  if (!id) return {} as ClassRoom;
  const { getById } = useModel<ClassRoom>("classRoom");
  const [classRoom, setClassRoom] = useState<ClassRoom>({});
  useEffect(() => {
    id && getById(id)?.then(setClassRoom);
  }, [id]);
  return classRoom;
}
