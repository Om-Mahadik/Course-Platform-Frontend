import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch all videos for a specific module
 */
export const fetchVideosByModule = async (moduleId, token) => {
  if (!moduleId) {
    throw new Error("Module ID is required to fetch videos");
  }

  try {
    const res = await axios.get(
      `${API_URL}/api/videos/module/${moduleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching videos by module:", error);
    throw error;
  }
};

/**
 * Fetch single video details
 */
export const fetchVideoById = async (videoId, token) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }

  try {
    const res = await axios.get(
      `${API_URL}/api/videos/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};


export const getCourseIdFromVideo = async (videoId, token) => {
  if (!videoId) throw new Error("Video ID is required");

  try {
    // ✅ Directly call the new backend route
    const res = await axios.get(`${API_URL}/api/videos/course/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { courseId } = res.data;
    if (!courseId) throw new Error("Course not found for this video");

    return courseId;
  } catch (err) {
    console.error("Failed to fetch courseId:", err);
    throw err;
  }
};