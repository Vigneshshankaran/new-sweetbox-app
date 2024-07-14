import { useState, useEffect } from 'react';
import axios from 'axios';

const useCustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(0); // Add this line if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet');
        setCustomerData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCustomer = async (customerId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this record?");
    
    if (userConfirmed) {
      try {
        await axios.delete(`https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet/${customerId}`);
        setCustomerData(customerData.filter(customer => customer.id !== customerId));
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    } else {
      setFormSubmitted((prev) => prev + 1); // Add this line if needed
    }
  };

  return { customerData, loading, error, deleteCustomer, formSubmitted }; // Return formSubmitted if needed
};

export default useCustomerData;
