const { Router } = require("express");
const { getImageById, uploadImage } = require("../controllers/images.controller.js");


const imagesRouter = Router();

imagesRouter
.post("/", uploadImage)
.get("/:id", getImageById);
// Export router

module.exports = imagesRouter;

