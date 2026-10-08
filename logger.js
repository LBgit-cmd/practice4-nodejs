import { EventEmitter } from "events";
import chalk from "chalk";

const logger = new EventEmitter();

logger.on("log", ({ level, message }) => {
    const time = new Date().toLocaleString();

    const text = `[${time}] ${level.toUpperCase()}: ${message}`;

    if (level === "info") {
        console.log(chalk.greenBright(text));
    } else if (level === "warning") {
        console.log(chalk.yellowBright(text));
    } else if (level === "error") {
        console.log(chalk.redBright(text));
    } else {
        console.log(text);
    }
});

export default logger;