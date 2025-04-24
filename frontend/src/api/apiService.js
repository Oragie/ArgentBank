const API_BASE_URL = import.meta.env.VITE_DATABASE_URL;

// Fonction pour se connecter (login)
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login: " + response.statusText);
    }

    const data = await response.json();
    return data; // Retourne les données de connexion (ex. token)
  } catch (error) {
    console.error("Fetch error (loginUser):", error);
    return null; // Retourne null en cas d'erreur
  }
}

// Fonction pour s'inscrire (signup)
export async function signupUser(email, password, firstName, lastName) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (!response.ok) {
      throw new Error("Failed to signup: " + response.statusText);
    }

    const data = await response.json();
    return data; // Retourne les données d'inscription
  } catch (error) {
    console.error("Fetch error (signupUser):", error);
    return null; // Retourne null en cas d'erreur
  }
}

// Fonction pour récupérer le profil utilisateur (GET)
export async function getUserProfile(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile: " + response.statusText);
    }

    const data = await response.json();
    return data; // Retourne les données du profil utilisateur
  } catch (error) {
    console.error("Fetch error (getUserProfile):", error);
    return null; // Retourne null en cas d'erreur
  }
}

// Fonction pour mettre à jour le profil utilisateur (PUT)
export async function updateUserProfile(token, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile: " + response.statusText);
    }

    const data = await response.json();
    return data; // Retourne les données mises à jour
  } catch (error) {
    console.error("Fetch error (updateUserProfile):", error);
    return null; // Retourne null en cas d'erreur
  }
}

// Fonction pour récupérer les comptes depuis le fichier JSON
export async function getAccountData() {
  try {
    const response = await fetch("/account-data.json");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    return null;
  }
}

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
