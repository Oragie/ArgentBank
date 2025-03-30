import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Error from "./pages/404";
import Dashboard from "./pages/Dashboard";
import SignOut from "./Components/signOut/SignOut";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "./redux/slices/authentificationSlice";

window.addEventListener("storage", (event) => {
  console.log(
    "Modification de localStorage détectée :",
    event.key,
    event.oldValue,
    event.newValue
  );
});

const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  originalSetItem.apply(this, [key, value]);
};

const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function (key) {
  originalRemoveItem.apply(this, [key]);
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifie si un token d'authentification est stocké dans le localStorage
    const token = localStorage.getItem("authentificationToken");
    if (token) {
      dispatch(userLogin({ token })); // Connecte automatiquement l'utilisateur si un token est trouvé
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {" "}
          {/* Layout principal */}
          <Route index element={<HomePage />} /> {/* Page d'accueil */}
          <Route path="/login" element={<SignIn />} /> {/* Page de connexion */}
          {/* <Route path="/signup" element={<SignUp />} /> Page d'inscription */}
          <Route path="/signOut" element={<SignOut />} /> {/* Déconnexion */}
          {/* Routes protégées accessibles uniquement aux utilisateurs authentifiés */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Error />} /> {/* Page 404 */}
        </Route>
      </Routes>
    </Router>
  );
}
