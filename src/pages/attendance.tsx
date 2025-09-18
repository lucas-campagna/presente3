import { useParams } from "react-router";
import ListView from "../components/ListView";

export default function Attendance() {
  let { className } = useParams();

  return (
    <ListView
      title={className}
      menu={["add", "search"]}
      model={'attendance'}
      onMenuClick={(type) => console.log(type)}
    />
  );
}
