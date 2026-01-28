import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/modules";

// ==================================
// Fetch all modules by course ID
// ==================================
export const fetchModulesByCourse = async (courseId, idToken) => {
  if (!courseId) throw new Error("Course ID is required");

  const response = await axios.get(
    `${API_URL}/course/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
