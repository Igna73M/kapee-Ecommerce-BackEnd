import express from "express";
import { requireSignin } from "../middlewares/authentication";
import { getMyWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController";

const router = express.Router();

// Get logged-in user's wishlist
router.get("/me", requireSignin, getMyWishlist);

// Add product to wishlist
router.post("/add", requireSignin, addToWishlist);

// Remove product from wishlist
router.delete("/remove/:productId", requireSignin, removeFromWishlist);

export default router;