
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import LoginDetail from "./pages/LoginDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";

const App = () => {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/login" element={<LoginDetail />} />
         <Route path="/aboutus" element={<LoginDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
         <Route path="*" element={<ErrorPage />} />

           <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default App;
