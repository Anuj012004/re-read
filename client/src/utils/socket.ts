import { io, Socket } from "socket.io-client";

const URL = "https://re-read.onrender.com"; 
export const socket: Socket = io(URL, {
  withCredentials: true,
});
