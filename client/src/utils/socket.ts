// import { io, Socket } from "socket.io-client";

// const URL = process.env.NODE_ENV === 'production' 
//   ? 'https://re-read.onrender.com' 
//   : 'http://localhost:2121';

// export const socket: Socket = io(URL, {
//   withCredentials: true,
// });

import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL;

export const socket: Socket = io(URL, {
  withCredentials: true,
});