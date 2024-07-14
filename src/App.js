import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddForm from './components/AddForm/AddForm';
import CustomerDetailsTable from './components/CustomerDetailsTable/CustomerDetailsTable';
import Login from './components/Login/Login';
import ManufactureDetailsTable from './components/ManufactureDetailsTable/ManufactureDetailsTable';
import NavBar from './components/Navbar/Navbar';
import NotFound from './pages/NotFound/NotFound'; // Corrected path to NotFound component
import ProductionPage from './components/ProductionPage';
import EditPost from './components/EditPost';
// import Footer from './components/Footer/Footer';

function App() {
  const [totalKgByCustomer, setTotalKgByCustomer] = useState({});

  const handleTotalKgCalculated = (totals) => {
    setTotalKgByCustomer(totals);
  };

  return (
    <div className="App">
      <Router>
        <NavBar /> {/* Navbar will be displayed on all pages */}
        <div className="content">
          <Routes> {/* Wrapped Routes around Route components */}
            <Route path="/" element={<AddForm />} /> {/* Ensure element prop is provided */}
            <Route
              path="/customerdetails"
              element={<CustomerDetailsTable totalKgByCustomer={totalKgByCustomer}  />}
            /> {/* Ensure element prop is provided */}
            <Route
              path="/manufacturedetails"
              element={<ManufactureDetailsTable onTotalKgCalculated={handleTotalKgCalculated} />}
            /> {/* Ensure element prop is provided */}
            <Route path="/production" element={<ProductionPage />} /> {/* Corrected element prop */}
            <Route path="/editpost/:id" element={<EditPost />} />

            <Route path="/login" element={<Login />} /> {/* Ensure element prop is provided */}
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 Not Found page */}
          </Routes>
        </div>
        {/* <Footer /> Footer will be displayed on all pages */}
      </Router>
    </div>
  );
}

export default App;
