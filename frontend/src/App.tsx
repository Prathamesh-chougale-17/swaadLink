import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChefSortingPage from "./components/routes/ChefSortingPage";
import LoginPage from "./components/routes/LoginPage";
import Home from "./components/routes/home";
import ChefProfilePage from "./components/routes/ChefProfilePage";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import NearbyChefs from "./components/map/NearbyMap";
import AboutUsPage from "./components/routes/AboutUs";
import ContactPage from "./components/routes/ContactPage";
import FindChefByCuisine from "./components/routes/FindChefByCuisine";
import ChefRegistrationForm from "./components/routes/ChefRegistrationForm";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";

const App = () => {
  const { isSignedIn } = useUser();
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
            <Route path="/chef/nearme" element={<NearbyChefs />} />
            <Route path="/chef/bycrusine" element={<FindChefByCuisine />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/register-as-chef"
              element={
                isSignedIn ? <ChefRegistrationForm /> : <RedirectToSignIn />
              }
            />
          </Routes>
        </Router>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
