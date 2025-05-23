import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../state/logThunks";
import { getUserProfile } from "./../state/userThunks"; // Import pour recharger le profil

export function useLoginAndGetUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    setError(""); // Reset des erreurs avant la tentative

    try {
      // Attendre la connexion
      await dispatch(loginUser({ email, password })).unwrap();

      // Mise à jour du profil utilisateur
      await dispatch(getUserProfile()).unwrap();

      // Redirection après avoir mis à jour les infos
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Connection API error try later(hooks)");
    }
  };

  return {
    handleLogin,
    error,
  };
}
