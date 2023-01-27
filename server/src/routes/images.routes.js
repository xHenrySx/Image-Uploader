const { Router } = require("express");
const { getImageById, uploadImage } = require("../controllers/images.controller.js");


const imagesRouter = Router();

imagesRouter
.get("/" , (req, res) => {
    res.send("Hello from the API");
})
.post("/", uploadImage)
.get("/:id", getImageById);
// Export router

module.exports = imagesRouter;

