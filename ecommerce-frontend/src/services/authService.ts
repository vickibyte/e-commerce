import axios from "axios";

const API_URL =
    "http://localhost:5000/api/auth"; // backend URL for authentication

    export const registerUser = (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
) => {
  return axios.post("/api/users/register", {
    firstName,
    lastName,
    username,
    email,
    password,
  });
};

    export const loginUser = async (email: string, password: string) => {
        return await axios.post(`${API_URL}/login`, {
            email,
            password
        });
    };

    export const getMe = async (token: string) => {
        return await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
// Check if username exists before registration
export async function checkUsernameExists(username: string) {
  const res = await fetch(`/api/users/check-username?username=${username}`);
  const data = await res.json();
  return data.exists; // { exists: true/false }
}

