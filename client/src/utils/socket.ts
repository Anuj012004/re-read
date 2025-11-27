import { io, Socket } from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' 
  ? 'https://re-read.onrender.com' 
  : 'http://localhost:2121';

export const socket: Socket = io(URL, {
  withCredentials: true,
});