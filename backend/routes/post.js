import express from "express";
import {
  createPost,
  getPosts,
  toggleLikePost,
  addComment,
  editPost,
  deletePost,
  deleteComment,
   getPostsByUser 
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);
router.get("/", protect, getPosts);
router.post("/:id/like", protect, toggleLikePost);
router.post("/:id/comment", protect, addComment);
router.put("/:id", protect, upload.single("image"), editPost);
router.delete("/:id", protect, deletePost);
router.delete("/:postId/comment/:commentId", protect, deleteComment);
router.get("/user/:userId", protect, getPostsByUser);

export default router;
