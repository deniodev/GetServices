import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Headroom from 'react-headroom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateService from './pages/CreateService';
import UpdateService from './pages/UpdateService';
import Service from './pages/Service';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import Contact from './pages/Contact';
import './i18n/index';
import Footer from './components/Footer';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <BrowserRouter>
      <Headroom>
        <Header />
      </Headroom>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service/:serviceId" element={<Service />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route
            path="/update-service/:serviceId"
            element={<UpdateService />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
