const express = require("express");
const multer = require("multer");
const uploadConfigs = require("./config/upload");
const postController = require("./controllers/PostControllers");
const likerController = require("./controllers/LikerControllers");
const routes = new express.Router();
const upload = multer(uploadConfigs);

routes.post("/posts", upload.single("image"), postController.store);
routes.post("/posts/:id/liker", likerController.liker);
routes.get("/posts", postController.index);

module.exports = routes;
