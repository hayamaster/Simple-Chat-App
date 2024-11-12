import { PiUserCircle } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, w, h }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  const [randomColor, setRandomColor] = useState("");
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  useEffect(() => {
    const bgColor = [
      "bg-slate-200",
      "bg-teal-200",
      "bg-red-200",
      "bg-yellow-200",
      "bg-green-200",
      "bg-cyan-200",
      "bg-blue-200",
      "bg-indigo-200",
      "bg-purple-200",
      "bg-pink-200",
    ];

    setRandomColor(bgColor[Math.floor(Math.random() * bgColor.length)]);
  }, []);

  const isOnline = onlineUser?.includes(userId);

  return (
    <div className="rounded-full relative">
      <div
        className={`text-slate-800 overflow-hidden rounded-full font-bold`}
        style={{ width: w + "px", height: h + "px" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            width={w}
            height={h}
            alt={name}
            className="overflow-hidden rounded-full"
          />
        ) : name ? (
          <div
            style={{ width: w + "px", height: h + "px" }}
            className={`overflow-hidden rounded-full text-lg flex justify-center items-center ${randomColor}`}
          >
            {avatarName}
          </div>
        ) : (
          <PiUserCircle
            style={{
              width: w,
              height: h,
            }}
          />
        )}
      </div>
      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
