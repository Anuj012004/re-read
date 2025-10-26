// src/utils/socket.ts
import { io, Socket } from "socket.io-client";

const URL = "http://localhost:2121"; // your backend URL
export const socket: Socket = io(URL, {
  withCredentials: true, // to send cookies if needed
});
