import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChefSortingPage from "./components/routes/ChefSortingPage";
import LoginPage from "./components/routes/LoginPage";
import Home from "./components/routes/home";
import ChefProfilePage from "./components/routes/ChefProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chefs" element={<ChefSortingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chefs/:id" element={<ChefProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
