import PreviewIcon from "@mui/icons-material/Preview";
import { Link } from "react-router-dom";

export default function ViewBtn({ id, type }) {
  return (
    <Link to={`/dashboard/${type}/` + id}>
      <div>
        <PreviewIcon />
      </div>
    </Link>
  );
}
