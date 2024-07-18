import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet');
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

  const deleteCustomer = async (customerId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this record?");
    if (userConfirmed) {
      try {
        await axios.delete(`https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet/${customerId}`);
        setCustomerData(customerData.filter(customer => customer.id !== customerId));
        toast.success("Successfully deleted");
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error("Unable to Delete");
      }
    }
  };

  return { customerData, loading, error, deleteCustomer };
};

export default useCustomerData;
