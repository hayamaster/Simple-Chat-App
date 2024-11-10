import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserSearchCard = ({ user }) => {
  return (
    <Link
      to={"/" + user?._id}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border-secondary rounded cursor-pointer"
    >
      <div>
        <Avatar w={50} h={50} name={user?.name} imageUrl={user?.profile_pic} />
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
