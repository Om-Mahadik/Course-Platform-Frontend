import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Toggle a video as complete/incomplete for the logged-in user
 * Body: { courseId, videoId }
 */
export const toggleVideoCompletion = async (courseId, videoId, token) => {
  if (!courseId || !videoId) {
    throw new Error("Course ID and Video ID are required");
  }

  if (!token) {
    throw new Error("Auth token is required");
  }

  try {
    const res = await axios.post(
      `${API_URL}/api/progress/toggle-completion`,
      { courseId, videoId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data; // updated progress
  } catch (error) {
    console.error("Failed to toggle completion:", error);
    throw error;
  }
};



/**
 * Get progress of logged-in user for a specific course
 */
export const getUserProgress = async (courseId, token) => {
  if (!courseId) {
    throw new Error("Course ID is required");
  }

  if (!token) {
    throw new Error("Auth token is required");
  }

  try {
    const res = await axios.get(
      `${API_URL}/api/progress/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }
    );

    console.log("User progress fetched ✅", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user progress ❌", error);
    throw error;
  }
};




/**
 * Get progress of all users for a specific course (Admin use)
 */
export const getCourseProgress = async (courseId) => {
  if (!courseId) {
    throw new Error("Course ID is required");
  }

  try {
    const res = await axios.get(`${API_URL}/api/progress/course/${courseId}/all`, {
      withCredentials: true,
    });

    return res.data; // Array of user progress objects
  } catch (error) {
    console.error("Failed to fetch course progress:", error);
    throw error;
  }
};




/**
 * Get progress of logged-in user across all courses
 */
export const getAllUserProgress = async (token) => {
  if (!token) {
    throw new Error("Auth token is required");
  }

  try {
    const res = await axios.get(`${API_URL}/api/progress/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🔥 Fetched all user progress:", res.data);
    return res.data.userProgress; // array of progress objects
  } catch (error) {
    console.error("❌ Failed to fetch all user progress:", error);
    throw error;
  }
};