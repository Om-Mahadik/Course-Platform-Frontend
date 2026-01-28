import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/courses";

// Fetch all courses
export const fetchAllCourses = async (idToken) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Fetch single course by slug
export const fetchCourseBySlug = async (slug, idToken) => {
  const response = await axios.get(
    `${API_URL}/slug/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

// Fetch single course by id
export const fetchCourseById = async (courseId, idToken) => {
  if (!courseId) throw new Error("Course ID is required");

  const response = await axios.get(`${API_URL}/${courseId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
};