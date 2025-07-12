import "reflect-metadata";
import { Server } from "./presentation/server";

const server = new Server(3000);
server.start();
