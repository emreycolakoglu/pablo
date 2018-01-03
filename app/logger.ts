import * as winston from "winston";

const loggerConfig: any = {
  level: process.env.LOGLEVEL,
  transports: [
    new winston.transports.Console({ colorize: true })
  ]
};

const logger = new (winston.Logger)(loggerConfig);
export default logger;