import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChefSortingPage from "./components/routes/ChefSortingPage";
import LoginPage from "./components/routes/LoginPage";
import Home from "./components/routes/home";
import ChefProfilePage from "./components/routes/ChefProfilePage";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";

const App = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex={1}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chefs" element={<ChefSortingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chefs/:id" element={<ChefProfilePage />} />
          </Routes>
        </Router>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
