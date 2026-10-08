import express from "express";
import { EventEmitter } from "events";
import chalk from "chalk";
import logger from "./logger.js";

const app = express();
const emitter = new EventEmitter();

const PORT = 3000;


// Подія нового HTTP-запиту
emitter.on("newRequest", (url) => {
    console.log(
        chalk.blue(`[Event] New request received: ${url}`)
    );
});


// Головна сторінка
app.get("/", (req, res) => {
    emitter.emit("newRequest", req.url);

    logger.emit("log", {
        level: "info",
        message: "GET / accessed"
    });

    res.send(`
        <h1>Практична робота №4</h1>
        <p>Express + EventEmitter + Chalk</p>
        <p>Лобас Богдан, КН 3/1</p>
    `);
});


// Інформаційна сторінка
app.get("/info", (req, res) => {
    emitter.emit("newRequest", req.url);

    logger.emit("log", {
        level: "info",
        message: "GET /info accessed"
    });

    console.log(
        chalk.green("Info endpoint accessed!")
    );

    res.send(`
        <h1>Information page</h1>
        <p>Node.js server is working correctly.</p>
    `);
});


// Демонстрація помилки
app.get("/error", (req, res) => {
    emitter.emit("newRequest", req.url);

    logger.emit("log", {
        level: "error",
        message: "Internal server error"
    });

    res.status(500).send("Internal server error");
});


// Обробка невідомих маршрутів
app.use((req, res) => {
    logger.emit("log", {
        level: "warning",
        message: `Unknown route requested: ${req.url}`
    });

    res.status(404).send("Page not found");
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(
        chalk.yellowBright(
            `🚀 Server running at http://localhost:${PORT}`
        )
    );

    logger.emit("log", {
        level: "info",
        message: "Server started successfully"
    });
});