import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFoundHandler from "./middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use(cookieParser());

// application routes
// app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Planora event management system!");
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFoundHandler);

export default app;
