import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState(null as Socket);

  useEffect(() => {
    const socketIo = io(url, { transports: ["websocket"] });

    socketIo.on("connected", (msg: any) => {
      console.log(msg);
    });

    setSocket(socketIo);
  }, []);

  return socket;
};
