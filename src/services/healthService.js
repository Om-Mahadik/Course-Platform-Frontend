import axios from "axios";

// Use your VITE env variable or full backend URL
const API_URL = import.meta.env.VITE_API_URL + "/api/health";

/**
 * Ping the backend health endpoint
 * Throws error if server is offline / unreachable
 */
export const pingServer = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Optional: you can check response.data.success if you want
    return response.data;
  } catch (err) {
    // Axios error object can have response or network error
    throw new Error(
      err.response?.data?.message || "Server is offline or unreachable"
    );
  }
};
