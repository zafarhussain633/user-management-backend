import { Router } from "express";
import { getAllUsers, createUser } from "./../controller/users.js";
import { upload } from "../middleware/fileUpload.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(
    upload.fields([
      { name: "documents", maxCount: 10 },
      { name: "profile_image", maxCount: 1 },
    ]),
    createUser
  ); 

export default usersRouter;
