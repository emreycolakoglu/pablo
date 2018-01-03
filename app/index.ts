process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import * as dotenv from "dotenv";
const result = dotenv.config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env.prod"
});

import * as http from "http";
import logger from "./logger";

import App from "./app";

// debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);

const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number | string): number | string | boolean {
  const port: number = (typeof val === "string") ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
  const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      logger.error(error.message);
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
}