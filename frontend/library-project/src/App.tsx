import './App.css';
import Header from "./components/Header";
import BookCards from "./components/Cards";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterModal from './components/Header/RegisterModal';
import LoginModal from './components/Header/LoginModal';
import { UserProvider } from './globalData/UserContext';
import { useState } from 'react';
import Rentals from "./components/Rentals/Rentals";
import Home from "./components/Home/home";

function App() {
  const [query, setQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Render the header */}
          <Header query={query} onSearchChange={handleSearchChange} />

          {/* Define application routes */}
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />

            {/* Catalog route */}
            <Route path="/catalog" element={<BookCards query={query} />} />

            {/* Rentals route */}
            <Route path="/rentals" element={<Rentals />} />

            {/* Login route */}
            <Route
              path="/login"
              element={<LoginModal open={true} onClose={() => setIsLoginModalOpen(false)} />}
            />
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
