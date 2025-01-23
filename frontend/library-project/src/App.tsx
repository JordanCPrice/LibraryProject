import './App.css';
import Header from "./components/Header";
import BookCards from "./components/Cards/card";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterModal from './components/Header/RegisterModal';
import LoginModal from './components/Header/LoginModal';
import { UserProvider } from './globalData/UserContext';
import { useState } from 'react';
import Rentals from "./components/Rentals/Rentals";
import Home from "./components/Home/home";
import Donation from "./components/Donation/Donation";
import Profile from './components/Profile/Profile';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalog" element={<BookCards />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/donate" element={<Donation />} />
          </Routes>
        </div>

        {/* Modals controlled by state */}
        {isLoginModalOpen && (
          <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        )}
        {isRegisterModalOpen && (
          <RegisterModal open={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
        )}
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
