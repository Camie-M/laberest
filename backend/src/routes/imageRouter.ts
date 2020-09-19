import express from "express";
import { ImageController } from "../controller/ImageController";

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/create", imageController.createImage);
imageRouter.get("/feed", imageController.getAllImages);
imageRouter.get("/date", imageController.getAllImagesByDate);
// imageRouter.get("/:author", imageController.getAllImagesByAuthor);
imageRouter.get("/:id", imageController.getImageById);
