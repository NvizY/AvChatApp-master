import express from "express";
import { allUsers, login, logout, signup } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router()
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/allUsers",secureRoute,allUsers);


export default router;

//We are exporting router we will use it in our other file