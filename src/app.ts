import express, { Application, Request, Response } from "express";
import cors from "cors";
// import { borrowBookRoutes } from "./app/modules/library/borrow/borrow.route";
import { bookRoutes } from "./app/modules/library/book/book.route";
import { borrowBookRoutes } from "./app/modules/library/borrow/borrow.route";
// import { UserRoutes } from "./app/modules/ph-tour/user/user.routes";
import { router } from "./app/routes";
// import { envVars } from "./config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// Configure CORS properly
app.use(cors({ origin: "*" }));

// Parse JSON and URL-encoded bodies

//.json body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowBookRoutes);
app.use("/api/v1", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome, HP-Tour-Management-Server is running!");
});

// unHandle error.
//unCaught error handler
//single termination sigterm

// Error-handling middleware
app.use(globalErrorHandler);
// 404 Handler
app.use(notFound);
export default app;
