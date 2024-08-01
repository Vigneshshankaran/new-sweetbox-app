import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const useCustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function LoadingIndicator() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    );
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sweets-admin-server-hh64.vercel.app/api/mainsweet/getmainsweet');
        const dataWithSubForms = response.data.map(customer => ({
          ...customer,
          subForms: customer.subForms || [],
          sweet: customer.sweet || [],
        }));
        setCustomerData(dataWithSubForms);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  const deleteCustomer = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this record?");
    if (userConfirmed) {
      try {
        await axios.delete(`https://sweets-admin-server-hh64.vercel.app/api/mainsweet/${id}`);
        setCustomerData(customerData.filter(customer => customer._id !== id));
        toast.success("Successfully deleted");
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error("Unable to Delete");
      }
    }
  };
  const updateCustomerStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://sweets-admin-server-hh64.vercel.app/api/mainsweet/${id}`, { status });
      setCustomerData(customerData.map(customer => 
        customer._id === id ? response.data : customer
      ));
    } catch (err) {
      setError(err);
    }
  };


  return { customerData, loading, error, deleteCustomer, updateCustomerStatus, LoadingIndicator  };
};



export default useCustomerData;
