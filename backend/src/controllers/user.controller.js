import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
	try {
		const currentUserId = req.user.id;
		const currentUser = await User.findById(req.user.id).select("friends");

		if (!currentUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Find users with pending incoming friend requests
		const incomingRequests = await FriendRequest.find({ recipient: currentUserId, status: "pending" }).select("sender");
		const incomingRequestSenders = incomingRequests.map((req) => req.sender);

		// Find users with pending outgoing friend requests
		const outgoingRequests = await FriendRequest.find({ sender: currentUserId, status: "pending" }).select("recipient");
		const outgoingRequestRecipients = outgoingRequests.map((req) => req.recipient);

		const excludedIds = [
			...currentUser.friends,
			...incomingRequestSenders,
			...outgoingRequestRecipients,
		];

		const recommendedUsers = await User.find({
			$and: [
				{ _id: { $ne: currentUserId } }, // Exclude current user
				{ _id: { $nin: excludedIds } }, // Exclude all connections
				{ isOnboarded: true },
			],
		}).select("fullName profilePic nativeLanguage learningLanguage location bio");

		res.status(200).json(recommendedUsers);
	} catch (error) {
		console.error("Error in getRecommendedUsers controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      if (existingRequest.status === "declined") {
        // If the previous request was declined, remove it to allow a new one
        await FriendRequest.findByIdAndDelete(existingRequest._id);
      } else {
        // If request is pending or accepted, prevent sending a new one
        return res
          .status(400)
          .json({ message: "A friend request is already pending or has been accepted." });
      }
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    const declinedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "declined",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs, declinedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function cancelFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const currentUserId = req.user.id;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // verify the current user is the sender
    if (friendRequest.sender.toString() !== currentUserId) {
      return res.status(403).json({ message: "You are not authorized to cancel this request" });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: "Friend request cancelled" });
  } catch (error) {
    console.log("Error in cancelFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function declineFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to decline this request" });
    }

    friendRequest.status = "declined";
    await friendRequest.save();

    res.status(200).json({ message: "Friend request declined" });
  } catch (error) {
    console.log("Error in declineFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function unfriend(req, res) {
	try {
		const currentUserId = req.user.id;
		const { friendId } = req.params;

		// 1. Remove friend from current user's friend list
		await User.findByIdAndUpdate(currentUserId, { $pull: { friends: friendId } });

		// 2. Remove current user from friend's friend list
		await User.findByIdAndUpdate(friendId, { $pull: { friends: currentUserId } });

		// 3. Delete the friend request between them to allow for future requests
		await FriendRequest.findOneAndDelete({
			$or: [
				{ sender: currentUserId, recipient: friendId },
				{ sender: friendId, recipient: currentUserId },
			],
		});

		res.status(200).json({ message: "User unfriended successfully" });
	} catch (error) {
		console.error("Error in unfriend controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
