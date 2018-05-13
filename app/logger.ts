import * as winston from "winston";
import { format, TransformableInfo } from "logform";

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  // format.timestamp(),
  format.align(),
  format.printf(info => `${info.level}: ${info.message}`)
);

const fileFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf((info: TransformableInfo) => {
    return `${info.level}: ${info.message}`;
  })
);

const loggerConfig: any = {
  level: process.env.LOGLEVEL,
  transports: [
    new winston.transports.Console({
      format: alignedWithColorsAndTime
    }),
    new winston.transports.File({
      format: fileFormat,
      filename: "errors.log",
      level: "error"
    })
  ]
};

// const logger = new (winston.Logger)(loggerConfig);
const logger = (winston as any).createLogger(loggerConfig);
export default logger;
