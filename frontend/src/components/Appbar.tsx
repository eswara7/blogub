import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { AddButton } from "./AddButton";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-3">
      <Link to={"/blogs"}>
        <div className="text-lg">blogub</div>
      </Link>
      <div className="flex items-center gap-1">
        <Link to={"/publish"}><AddButton /></Link>
        <Avatar name={"eswar"} size="lg" />
      </div>
    </div>
  );
};
