import { useState, useEffect } from 'react';
import axios from 'axios';

const useCustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet');
      setCustomerData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await axios.delete(`https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet/${customerId}`);
      setCustomerData(customerData.filter(customer => customer.id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return { customerData, loading, error, deleteCustomer };
};

export default useCustomerData;
