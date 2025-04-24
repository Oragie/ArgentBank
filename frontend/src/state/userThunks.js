import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfileData } from "../api/apiService.js";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await updateUserProfileData(updatedData);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk pour récupérer le profil utilisateur
export const getUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfile();
      return response.body; // Renvoie le profil utilisateur
    } catch (error) {
      return rejectWithValue(error.message); // Envoie un message d'erreur si l'API échoue
    }
  }
);
