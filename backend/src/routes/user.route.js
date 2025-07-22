import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	acceptFriendRequest,
	cancelFriendRequest,
	declineFriendRequest,
	getFriendRequests,
	getMyFriends,
	getOutgoingFriendReqs,
	getRecommendedUsers,
	sendFriendRequest,
	unfriend,
} from "../controllers/user.controller.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.put("/friend-request/:id/decline", declineFriendRequest);
router.delete("/friend-request/:id/cancel", cancelFriendRequest);

router.delete("/friends/:friendId", unfriend);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
