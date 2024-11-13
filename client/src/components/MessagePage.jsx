import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        console.log("message-user-details", data);
      });
    }
  }, [socketConnection, params.userId]);

  return (
    <div>
      <h1 className="text-red-600">Message Page</h1>
    </div>
  );
};

export default MessagePage;
