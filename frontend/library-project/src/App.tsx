// App.tsx
import './App.css';
import Header from "./components/Header";
import BookCards from "./components/Cards";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterModal from './components/Header/RegisterModal';
import LoginModal from './components/Header/LoginModal';
import { UserProvider } from './globalData/UserContext';
import { useState } from 'react';
import Rentals from "./components/Rentals/Rentals";

function App() {
  const [query, setQuery] = useState(''); // Declare state for the search query

  const handleSearchChange = (query: string) => {
    setQuery(query); // Update the query state when the search bar changes
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header query={query} onSearchChange={handleSearchChange} />
          <BookCards query={query} /> {/* Pass query to BookCards */}
          <Routes>
          <Route path="/rentals" element={<Rentals />} />
            <Route
              path="/register" element={<RegisterModal open={true} onClose={() => window.history.back()} />}
            />
            <Route
              path="/login" element={<LoginModal open={true} onClose={() => window.history.back()} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
