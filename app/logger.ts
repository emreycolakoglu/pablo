import * as winston from "winston";
import { format } from "logform";

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  // format.timestamp(),
  format.align(),
  format.printf(info => `${info.level}: ${info.message}`)
);

const loggerConfig: any = {
  level: process.env.LOGLEVEL,
  transports: [
    new winston.transports.Console({
      format: alignedWithColorsAndTime
    })
  ]
};

// const logger = new (winston.Logger)(loggerConfig);
const logger = (winston as any).createLogger(loggerConfig);
export default logger;