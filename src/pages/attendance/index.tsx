import { useParams } from "react-router";
import ListView from "../../components/ListView";
import useClassRoom from "./hooks/useClassRoom";


export default function Attendance() {
  const { id } = useParams();
  const { name } = useClassRoom(id);

  return (
    <ListView
      title={`${name}, lista de presença`}
      menu={["add", "search"]}
      model={"student"}
      // onMenuClick={(type) => console.log(type)}
    />
  );
}