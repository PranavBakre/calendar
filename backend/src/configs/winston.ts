import winston from "winston";
import correlator from "express-correlation-id";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        })
    ],
    format: winston.format.combine(
        winston.format((info) => {
            info.correlationId = correlator.getId() ;
            return info;
        })(),
        winston.format.json({})
    )
});

export default logger;