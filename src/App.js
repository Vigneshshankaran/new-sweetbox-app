import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddForm from './components/AddForm/AddForm';
import CustomerDetailsTable from './components/CustomerDetailsTable/CustomerDetailsTable';
import Login from './components/Login/Login';
import ManufactureDetailsTable from './components/ManufactureDetailsTable/ManufactureDetailsTable';
import NavBar from './components/Navbar/Navbar';
import NotFound from './pages/NotFound/NotFound';
import ProductionPage from './components/ProductionPage';
import EditPost from './components/Edit/EditPost';
import SweetBoxs from './SweetBoxs';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthContext } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './App.css'

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {user && <NavBar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<PrivateRoute element={<AddForm />} />} />
          <Route path="/customerdetails" element={<PrivateRoute element={<CustomerDetailsTable />} />} />
          <Route path="/manufacturedetails" element={<PrivateRoute element={<ManufactureDetailsTable />} />} />
          <Route path="/production" element={<PrivateRoute element={<ProductionPage />} />} />
          <Route path="/editpost/:id" element={<PrivateRoute element={<EditPost />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/sweetbox" element={<PrivateRoute element={<SweetBoxs />} />} />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
