import { Router } from "express";
import usersRouter from "./users.js";
const rootRouter = Router();

rootRouter.use("/api/v1/users", usersRouter);


export default rootRouter