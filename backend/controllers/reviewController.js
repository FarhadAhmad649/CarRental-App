import Review from "../models/reviewModel.js"; // Fix: Added .js and changed to Review

// 1. Save a new review
export const createReview = async (req, res) => {
  try {
    const { rating, comment, carId } = req.body;
    const userId = req.user.id; // Assuming you have an auth middleware that sets req.user

    // Now 'Review' correctly references your Mongoose model
    const newReview = new Review({
      userId,
      carId, // Optional: if reviews are tied to specific cars
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully!",
      review: newReview,
    });
  } catch (error) {
    console.error("Create Review Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit review" });
  }
};

// 2. Fetch all reviews
export const getReviews = async (req, res) => {
  try {
    // Populate pulls the user's actual name and profile image from the User collection
    const reviews = await Review.find()
      .populate("userId", "name image location")
      .sort({ createdAt: -1 }); // Newest reviews first

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};
