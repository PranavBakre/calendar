import "configs/dotenv"
import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import correlator from "express-correlation-id";
import logger from "configs/winston";
const app = express();

app.use(correlator())

app.use(expressWinston.logger({
    winstonInstance: logger
}))
app.use(express.json());
app.use("/", (req,res) => {
    logger.info("Hi")
    res.status(200).json({
        msg: "Hello"
    })
})
app.use(expressWinston.errorLogger({
    winstonInstance: logger
}))
app.listen(process.env.PORT)