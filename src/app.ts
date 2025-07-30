import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import { borrowBookRoutes } from "./app/modules/library/borrow/borrow.route";
import { bookRoutes } from "./app/modules/library/book/book.route";
import { borrowBookRoutes } from "./app/modules/library/borrow/borrow.route";

const app: Application = express();

// Configure CORS properly
app.use(cors({ origin: "*" }));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowBookRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome, HP-Tour-Management-Server is running!");
});

// unHandle error.
//unCaught error handler
//single termination sigterm

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API not found",
  });
  next();
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.message,
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
  next();
});

export default app;
