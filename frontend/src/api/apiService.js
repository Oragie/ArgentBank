import { getUserProfile, updateUserProfile } from "./user";

const API_BASE_URL = import.meta.env.VITE_DATABASE_URL;

// Fonction pour se connecter et stocker le token
export const login = async (email, password) => {
  try {
    // Effacer les anciennes données
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to login: " + response.statusText);
    }

    const data = await response.json();
    const { token } = data.body;

    if (token) {
      localStorage.setItem("token", token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Fonction pour s'inscrire
export const signup = async (email, password, firstName, lastName) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to signup: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Fonction pour récupérer le profil utilisateur
export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found, please log in");
    }

    return await getUserProfile(token); // Appelle la fonction de `api.js`
  } catch (error) {
    console.error("Fetch user profile error:", error);
    throw error;
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfileData = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found, please log in");
    }

    return await updateUserProfile(token, profileData); // Appelle la fonction de `api.js`
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};
