import { Router, Request, Response } from "express";

export const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});
