import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PlacePage from "./pages/PlacePage";
import PlacesForm from "./pages/PlacesForm";
import PlacesPage from "./pages/PlacesPage";
import Success from "./pages/Success";
import axios from "axios";
import { UserContextProvider } from "./Usercontext";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/events" element={<PlacesPage />} />
            <Route path="/account/events/new" element={<PlacesForm />} />
            <Route path="/account/events/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/success" element={<Success />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
