import express, { Router } from 'express';
import { login, signup, googleLogin } from '../controllers/user.controller.js';

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/google").post(googleLogin);

export default router;