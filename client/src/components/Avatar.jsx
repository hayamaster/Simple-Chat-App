import { PiUserCircle } from "react-icons/pi";
import { useEffect, useState } from "react";

const Avatar = ({ name, imageUrl, w, h }) => {
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

  return (
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
        <PiUserCircle size={80} />
      )}
    </div>
  );
};

export default Avatar;
