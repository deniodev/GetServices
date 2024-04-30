import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateService from "./pages/CreateService";
import UpdateService from "./pages/UpdateService";
import Service from "./pages/Service";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import FaqList from "./pages/FaqList";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    
    <BrowserRouter>
    
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/faq" element={<FaqList/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/service/:serviceId" element={<Service/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create-service" element={<CreateService/>} />
        <Route path="/update-service/:serviceId" element={<UpdateService/>} /> 
        </Route>
      </Routes>
    </ThemeProvider>

    </BrowserRouter>
  );
};

export default App;
